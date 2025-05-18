using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        var response = context.Response;

        var errorResponse = new
        {
            error = exception.Message,
            stackTrace = exception.StackTrace
        };

        switch (exception)
        {
            case ArgumentException _:
                response.StatusCode = (int)HttpStatusCode.BadRequest;
                break;
            case UnauthorizedAccessException _:
                response.StatusCode = (int)HttpStatusCode.Unauthorized;
                break;
            case KeyNotFoundException _:
                response.StatusCode = (int)HttpStatusCode.NotFound;
                break;
            default:
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                errorResponse = new { error = "Internal server error", stackTrace = (string?)null };
                break;
        }

        await context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
    }
}
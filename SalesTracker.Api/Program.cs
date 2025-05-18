using Microsoft.EntityFrameworkCore; // Ensure this is included
using SalesTracker.Core.Interfaces;
using SalesTracker.Core.Mapper;
using SalesTracker.Infrastructure.Data;
using SalesTracker.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Ensure the Microsoft.EntityFrameworkCore.SqlServer package is installed in your project  
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddCors(options => options.AddPolicy(
    "AllowAll",
    p => p.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()));
builder.Services.AddOpenApi();
builder.Services.AddLogging(logging =>
{
    logging.AddConsole();
    logging.AddDebug();
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<SalesDbContext>(options =>
        options.UseInMemoryDatabase("SalesTrackerTestDB"));
builder.Services.AddAutoMapper(typeof(MappingProfileConfiguration));
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<ISaleRepository, SaleRepository>();
builder.Services.AddScoped<IDiscountRepository, DiscountRepository>();
builder.Services.AddScoped<ISalespersonRepository, SalespersonRepository>();
builder.Services.AddControllers();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SalesDbContext>();
    context.Database.EnsureCreated();
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowAll");
app.UseCors(cors => cors.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.MapControllers();

app.Run();

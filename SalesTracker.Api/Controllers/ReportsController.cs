using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesTracker.Infrastructure.Data;

namespace SalesTracker.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly SalesDbContext _context;

        public ReportsController(SalesDbContext context) => _context = context;

        [HttpGet("quarterly-commission/{year}/{quarter}")]
        public async Task<ActionResult> GetQuarterlyCommissionReport(int year, int quarter, CancellationToken cancellationToken)
        {
            var startDate = new DateTime(year, (quarter - 1) * 3 + 1, 1);
            var endDate = startDate.AddMonths(3).AddDays(-1);

            var report = await _context.Sales
                .Where(s => s.SalesDate >= startDate && s.SalesDate <= endDate)
                .GroupBy(s => s.Salesperson)
                .Select(g => new
                {
                    SalespersonId = g.Key.Id,
                    SalespersonName = g.Key.FirstName + " " + g.Key.LastName,
                    TotalSales = g.Sum(s => s.Product.SalePrice),
                    TotalCommission = g.Sum(s => s.Product.SalePrice * s.Product.CommissionPercentage / 100)
                })
                .ToListAsync();

            return Ok(report);
        }
    }
}

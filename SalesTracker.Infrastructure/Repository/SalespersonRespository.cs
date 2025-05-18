using Microsoft.EntityFrameworkCore;
using SalesTracker.Core.Entities;
using SalesTracker.Core.Interfaces;
using SalesTracker.Infrastructure.Data;

namespace SalesTracker.Infrastructure.Repositories
{
    public class SalespersonRepository : Repository<Salesperson>, ISalespersonRepository
    {
        public SalespersonRepository(SalesDbContext context) : base(context)
        {
        }
        public async Task<IEnumerable<Salesperson>> GetActiveSalespersonsAsync()
        {
            return await _context.Salespeople
                .Where(s => s.TerminationDate == null || s.TerminationDate > DateTime.Now)
                .OrderBy(s => s.LastName)
                .ThenBy(s => s.FirstName)
                .ToListAsync();
        }

        public async Task<IEnumerable<Salesperson>> GetTerminatedSalespersonsAsync()
        {
            return await _context.Salespeople
                .Where(s => s.TerminationDate != null && s.TerminationDate <= DateTime.Now)
                .OrderBy(s => s.LastName)
                .ThenBy(s => s.FirstName)
                .ToListAsync();
        }

        public async Task<decimal> GetTotalCommissionAsync(int salespersonId, DateTime? startDate = null, DateTime? endDate = null)
        {
            var query = _context.Sales
                .Where(s => s.SalespersonId == salespersonId);

            if (startDate.HasValue)
                query = query.Where(s => s.SalesDate >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(s => s.SalesDate <= endDate.Value);

            return await query
                .SumAsync(s => s.Product.SalePrice * s.Product.CommissionPercentage / 100);
        }

        public async Task<int> GetSalesCountAsync(int salespersonId, DateTime? startDate = null, DateTime? endDate = null)
        {
            var query = _context.Sales
                .Where(s => s.SalespersonId == salespersonId);

            if (startDate.HasValue)
                query = query.Where(s => s.SalesDate >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(s => s.SalesDate <= endDate.Value);

            return await query.CountAsync();
        }

        public async Task<IEnumerable<Salesperson>> GetSalespersonsByManagerAsync(string managerName)
        {
            return await _context.Salespeople
                .Where(s => s.Manager != null && s.Manager.ToLower().Contains(managerName.ToLower()))
                .OrderBy(s => s.LastName)
                .ThenBy(s => s.FirstName)
                .ToListAsync();
        }
    }
}
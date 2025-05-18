using Microsoft.EntityFrameworkCore;
using SalesTracker.Core.Entities;
using SalesTracker.Core.Interfaces;
using SalesTracker.Infrastructure.Data;

namespace SalesTracker.Infrastructure.Repositories
{
    public class SaleRepository : Repository<Sale>, ISaleRepository
    {
        public SaleRepository(SalesDbContext context) : base(context)
        {
        }
        public async Task<IEnumerable<Sale>> GetSalesAsync()
        {
            return await _context.Sales
                .Include(s => s.Product)
                .Include(s => s.Salesperson)
                .Include(s => s.Customer)
                .ToListAsync();
        }

        public async Task<IEnumerable<Sale>> GetBySalespersonAsync(int salespersonId)
        {
            return await _context.Sales
                .Include(s => s.Product)
                .Include(s => s.Customer)
                .Where(s => s.SalespersonId == salespersonId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Sale>> GetByProductAsync(int productId)
        {
            return await _context.Sales
                .Include(s => s.Salesperson)
                .Include(s => s.Customer)
                .Where(s => s.ProductId == productId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Sale>> GetByCustomerAsync(int customerId)
        {
            return await _context.Sales
                .Include(s => s.Product)
                .Include(s => s.Salesperson)
                .Where(s => s.CustomerId == customerId)
                .ToListAsync();
        }
    }
}
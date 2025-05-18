using Microsoft.EntityFrameworkCore;
using SalesTracker.Core.Entities;
using SalesTracker.Core.Interfaces;
using SalesTracker.Infrastructure.Data;

namespace SalesTracker.Infrastructure.Repositories
{
    public class DiscountRepository : Repository<Discount>, IDiscountRepository
    {
        public DiscountRepository(SalesDbContext context) : base(context)
        {
        }
        public async Task<IEnumerable<Discount>> GetActiveDiscountsAsync()
        {
            var now = DateTime.Now;
            return await _context.Discounts
                .Include(d => d.Product)
                .Where(d => d.BeginDate <= now && d.EndDate >= now)
                .ToListAsync();
        }

        public async Task<IEnumerable<Discount>> GetDiscountsByProductAsync(int productId)
        {
            return await _context.Discounts
                .Where(d => d.ProductId == productId)
                .OrderBy(d => d.BeginDate)
                .ToListAsync();
        }
    }
}
using Microsoft.EntityFrameworkCore;
using SalesTracker.Core.Entities;
using SalesTracker.Core.Interfaces;
using SalesTracker.Infrastructure.Data;

namespace SalesTracker.Infrastructure.Repositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(SalesDbContext context) : base(context)
        {
        }

        public async Task<decimal> GetCommissionPercentageAsync(int productId)
        {
            var product = await GetByIdAsync(productId);
            return product?.CommissionPercentage ?? 0m;
        }
    }
}
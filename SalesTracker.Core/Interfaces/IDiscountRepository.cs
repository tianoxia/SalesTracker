using SalesTracker.Core.Entities;

namespace SalesTracker.Core.Interfaces
{
    public interface IDiscountRepository : IRepository<Discount>
    {        
        Task<IEnumerable<Discount>> GetActiveDiscountsAsync();
        Task<IEnumerable<Discount>> GetDiscountsByProductAsync(int productId);
    }
}
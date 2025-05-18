using SalesTracker.Core.Entities;

namespace SalesTracker.Core.Interfaces
{
    public interface ISaleRepository : IRepository<Sale>
    {
        Task<IEnumerable<Sale>> GetSalesAsync();
        Task<IEnumerable<Sale>> GetBySalespersonAsync(int salespersonId);
        Task<IEnumerable<Sale>> GetByProductAsync(int productId);
        Task<IEnumerable<Sale>> GetByCustomerAsync(int customerId);
    }
}
using SalesTracker.Core.Entities;

namespace SalesTracker.Core.Interfaces
{
    public interface ISaleRepository : IRepository<Sale>
    {
        Task<IEnumerable<Sale>> GetSalesAsync(CancellationToken cancellationToken);
        Task<IEnumerable<Sale>> GetBySalespersonAsync(int salespersonId, CancellationToken cancellationToken);
        Task<IEnumerable<Sale>> GetByProductAsync(int productId, CancellationToken cancellationToken);
        Task<IEnumerable<Sale>> GetByCustomerAsync(int customerId, CancellationToken cancellationToken);
    }
}
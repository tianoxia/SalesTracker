using SalesTracker.Core.Entities;

namespace SalesTracker.Core.Interfaces
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        Task<IEnumerable<Customer>> GetActiveCustomersAsync(CancellationToken cancellationToken);
    }
}
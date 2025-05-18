using SalesTracker.Core.Entities;

namespace SalesTracker.Core.Interfaces
{
    public interface ISalespersonRepository : IRepository<Salesperson>
    {
        Task<IEnumerable<Salesperson>> GetActiveSalespersonsAsync();
        Task<IEnumerable<Salesperson>> GetTerminatedSalespersonsAsync();
        Task<decimal> GetTotalCommissionAsync(int salespersonId, DateTime? startDate = null, DateTime? endDate = null);
        Task<int> GetSalesCountAsync(int salespersonId, DateTime? startDate = null, DateTime? endDate = null);
        Task<IEnumerable<Salesperson>> GetSalespersonsByManagerAsync(string managerName);
    }
}
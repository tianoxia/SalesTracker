using SalesTracker.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SalesTracker.Core.Interfaces
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<decimal> GetCommissionPercentageAsync(int productId, CancellationToken cancellationToken);
    }
}

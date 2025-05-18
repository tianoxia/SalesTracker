using Microsoft.EntityFrameworkCore;
using SalesTracker.Core.Entities;
using SalesTracker.Core.Interfaces;
using SalesTracker.Infrastructure.Data;

namespace SalesTracker.Infrastructure.Repositories
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        public CustomerRepository(SalesDbContext context) : base(context) { }

        public async Task<IEnumerable<Customer>> GetActiveCustomersAsync()
        {
            // Active customers are those who have made at least one purchase
            return await _context.Customers
                .Where(c => _context.Sales.Any(s => s.CustomerId == c.Id))
                .OrderBy(c => c.LastName)
                .ThenBy(c => c.FirstName)
                .ToListAsync();
        }
    }
}
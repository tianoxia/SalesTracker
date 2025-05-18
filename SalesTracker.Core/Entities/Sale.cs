using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesTracker.Core.Entities
{
    public class Sale
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
        public int SalespersonId { get; set; }
        public Salesperson Salesperson { get; set; } = null!;
        public int CustomerId { get; set; }
        public Customer Customer { get; set; } = null!;
        public DateTime SalesDate { get; set; }
    }
}

using Microsoft.EntityFrameworkCore;

namespace SalesTracker.Core.Entities
{
    [Index(nameof(Name), IsUnique = true)]
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Manufacturer { get; set; } = string.Empty;
        public string Style { get; set; } = string.Empty;
        public decimal PurchasePrice { get; set; }
        public decimal SalePrice { get; set; }
        public int QtyOnHand { get; set; }
        public decimal CommissionPercentage { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace SalesTracker.Core.DTOs
{
    public class ProductDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Manufacturer { get; set; } = string.Empty;
        [Required]
        public string Style { get; set; } = string.Empty;
        [Required]
        public decimal PurchasePrice { get; set; }
        [Required]
        public decimal SalePrice { get; set; }
        [Required]
        public int QtyOnHand { get; set; }
        [Required]
        public decimal CommissionPercentage { get; set; }
    }
}

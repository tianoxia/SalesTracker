using System.ComponentModel.DataAnnotations;

namespace SalesTracker.Core.DTOs
{
    public class CreateSaleDto
    {
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int SalespersonId { get; set; }
        [Required]
        public string? SaleDate { get; set; }
    }
}

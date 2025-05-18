using System.ComponentModel.DataAnnotations;

namespace SalesTracker.Core.DTOs
{
    public class SalespersonUpdateDto
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public string Address { get; set; } = string.Empty;
        [Required]
        public string Phone { get; set; } = string.Empty;
        [Required]
        public DateTime StartDate { get; set; }
        public string? TerminationDate { get; set; } // Nullable for active salespersons
        [Required]
        public string Manager { get; set; } = string.Empty;
    }
}

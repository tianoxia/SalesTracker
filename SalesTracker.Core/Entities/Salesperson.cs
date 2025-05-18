﻿using Microsoft.EntityFrameworkCore;

namespace SalesTracker.Core.Entities
{
    [Index(nameof(Phone), IsUnique = true)]
    public class Salesperson
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime? TerminationDate { get; set; }
        public string? Manager { get; set; }
    }
}

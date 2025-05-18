using Microsoft.EntityFrameworkCore;
using SalesTracker.Core.Entities;

namespace SalesTracker.Infrastructure.Data
{
    public class SalesDbContext : DbContext
    {
        public SalesDbContext(DbContextOptions<SalesDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Salesperson> Salespeople { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<Discount> Discounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasIndex(s => s.Name)
                .IsUnique();
            modelBuilder.Entity<Salesperson>()
                .HasIndex(s => s.Phone)
                .IsUnique();

            modelBuilder.Entity<Sale>()
                .HasOne(s => s.Product)
                .WithMany()
                .HasForeignKey(s => s.ProductId);

            modelBuilder.Entity<Sale>()
                .HasOne(s => s.Customer)
                .WithMany()
                .HasForeignKey(s => s.CustomerId);

            modelBuilder.Entity<Sale>()
                .HasOne(s => s.Salesperson)
                .WithMany()
                .HasForeignKey(s => s.SalespersonId);
            // Seed Products data
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Name = "Veloce Road Bike",
                    Manufacturer = "BeSpoked",
                    Style = "Road",
                    PurchasePrice = 1200.00m,
                    SalePrice = 1999.99m,
                    QtyOnHand = 8,
                    CommissionPercentage = 7.5m
                },
                new Product
                {
                    Id = 2,
                    Name = "Trailblazer Mountain Bike",
                    Manufacturer = "BeSpoked",
                    Style = "Mountain",
                    PurchasePrice = 950.00m,
                    SalePrice = 1599.99m,
                    QtyOnHand = 5,
                    CommissionPercentage = 7.0m
                },
                new Product
                {
                    Id = 3,
                    Name = "Urban Commuter",
                    Manufacturer = "BeSpoked",
                    Style = "Hybrid",
                    PurchasePrice = 600.00m,
                    SalePrice = 899.99m,
                    QtyOnHand = 12,
                    CommissionPercentage = 6.5m
                },
                new Product
                {
                    Id = 4,
                    Name = "Aero Carbon Wheelset",
                    Manufacturer = "BeSpoked",
                    Style = "Accessory",
                    PurchasePrice = 400.00m,
                    SalePrice = 699.99m,
                    QtyOnHand = 20,
                    CommissionPercentage = 5.5m
                }
            );
            // Seed Salesperson data
            modelBuilder.Entity<Salesperson>().HasData(
                new Salesperson
                {
                    Id = 1,
                    FirstName = "John",
                    LastName = "Smith",
                    Address = "123 Main St, Anytown",
                    Phone = "555-0101",
                    StartDate = new DateTime(2025, 1, 15),
                    TerminationDate = new DateTime(2026, 1, 15),
                    Manager = "Sarah Johnson"
                },
                new Salesperson
                {
                    Id = 2,
                    FirstName = "Emily",
                    LastName = "Davis",
                    Address = "456 Oak Ave, Somewhere",
                    Phone = "555-0202",
                    StartDate = new DateTime(2025, 3, 10),
                    TerminationDate = new DateTime(2026, 1, 15),
                    Manager = "Sarah Johnson"
                },
                new Salesperson
                {
                    Id = 3,
                    FirstName = "Michael",
                    LastName = "Brown",
                    Address = "789 Pine Rd, Nowhere",
                    Phone = "555-0303",
                    StartDate = new DateTime(2024, 5, 20),
                    TerminationDate = new DateTime(2027, 1, 5),
                    Manager = "Sarah Johnson"
                }
            );
            // Seed Customers
            modelBuilder.Entity<Customer>().HasData(
                new Customer
                {
                    Id = 1,
                    FirstName = "Robert",
                    LastName = "Johnson",
                    Address = "101 Customer Lane, Clientville",
                    Phone = "555-1001",
                    StartDate = new DateTime(2025, 2, 15)
                },
                new Customer
                {
                    Id = 2,
                    FirstName = "Jennifer",
                    LastName = "Williams",
                    Address = "202 Buyer Blvd, Purchasetown",
                    Phone = "555-1002",
                    StartDate = new DateTime(2025, 5, 10)
                },
                new Customer
                {
                    Id = 3,
                    FirstName = "David",
                    LastName = "Miller",
                    Address = "303 Shopper Street, Dealcity",
                    Phone = "555-1003",
                    StartDate = new DateTime(2025, 1, 5)
                }
            );

            // Seed Discounts data
            modelBuilder.Entity<Discount>().HasData(
                new Discount
                {
                    Id = 1,
                    ProductId = 1,
                    BeginDate = new DateTime(2025, 5, 1),
                    EndDate = new DateTime(2025, 5, 30),
                    DiscountPercentage = 10.0m
                },
                new Discount
                {
                    Id = 2,
                    ProductId = 2,
                    BeginDate = new DateTime(2025, 4, 1),
                    EndDate = new DateTime(2025, 5, 15),
                    DiscountPercentage = 15.0m
                }
            );
            // Seed Sales data
            modelBuilder.Entity<Sale>().HasData(
                new Sale
                {
                    Id = 1,
                    ProductId = 1,
                    SalespersonId = 1,
                    CustomerId = 1,
                    SalesDate = new DateTime(2025, 5, 15)
                },
                new Sale
                {
                    Id = 2,
                    ProductId = 2,
                    SalespersonId = 2,
                    CustomerId = 2,
                    SalesDate = new DateTime(2025, 5, 18)
                },
                new Sale
                {
                    Id = 3,
                    ProductId = 3,
                    SalespersonId = 1,
                    CustomerId = 3,
                    SalesDate = new DateTime(2025, 5, 2)
                },
                new Sale
                {
                    Id = 4,
                    ProductId = 2,
                    SalespersonId = 1,
                    CustomerId = 3,
                    SalesDate = new DateTime(2025, 1, 2)
                }
            );
        }
    }
}

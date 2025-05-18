using AutoMapper;
using SalesTracker.Core.DTOs;
using SalesTracker.Core.Entities;

namespace SalesTracker.Core.Mapper
{
    public class MappingProfileConfiguration : Profile
    {
        public MappingProfileConfiguration()
        {
            CreateMap<SalespersonUpdateDto, Salesperson>()
                .ForMember(dest => dest.TerminationDate, opt => opt.MapFrom(src =>
                    !string.IsNullOrWhiteSpace(src.TerminationDate)
                        ? DateTime.Parse(src.TerminationDate!)
                        : (DateTime?)null));

            CreateMap<CreateSaleDto, Sale>()
                .ForMember(dest => dest.SalesDate, opt => opt.MapFrom(src =>
                    ParseSaleDate(src.SaleDate)));
            CreateMap<ProductDto, Product>();
        }

        private static DateTime ParseSaleDate(string? saleDate)
        {
            return !string.IsNullOrEmpty(saleDate) && DateTime.TryParse(saleDate, out DateTime dt)
                ? dt
                : DateTime.UtcNow;
        }
    }
}

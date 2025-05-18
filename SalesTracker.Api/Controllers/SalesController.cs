using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SalesTracker.Core.DTOs;
using SalesTracker.Core.Entities;
using SalesTracker.Core.Interfaces;

namespace SalesTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ISaleRepository _salesRepository;
        private readonly IProductRepository _productRepository;

        public SalesController(
            IMapper mapper,
            ISaleRepository salesRepository,
            IProductRepository productRepository)
        {
            _mapper = mapper;
            _salesRepository = salesRepository;
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sale>>> GetAllSales()
        {
            return Ok(await _salesRepository.GetAllAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetSale(int id)
        {
            var sale = await _salesRepository.GetByIdAsync(id);
            if (sale == null)
            {
                return NotFound();
            }
            return Ok(sale);
        }
        [HttpGet("by-daterange")]
        public async Task<ActionResult<IEnumerable<Sale>>> GetSalesByDateRange([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var query = await _salesRepository.GetSalesAsync();
            
            if (startDate.HasValue)
            {
                query = query.Where(s => s.SalesDate >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(s => s.SalesDate <= endDate.Value);
            }

            return query.ToList();
        }

        [HttpPost]
        public async Task<ActionResult<Sale>> PostSale(CreateSaleDto saleDto)
        {
            // Check if product exists
            var product = await _productRepository.GetByIdAsync(saleDto.ProductId);
            if (product == null)
            {
                return BadRequest("Product not found");
            }
            // Check if salesperson exists
            var salesperson = await _salesRepository.GetBySalespersonAsync(saleDto.SalespersonId);
            if (salesperson == null)
            {
                return BadRequest("Salesperson not found");
            }
            // Check if customer exists
            var customer = await _salesRepository.GetByCustomerAsync(saleDto.CustomerId);
            if (customer == null)
            {
                return BadRequest("Customer not found");
            }
            var sale = _mapper.Map<Sale>(saleDto);
            await _salesRepository.AddAsync(sale);
            return CreatedAtAction("GetSale", new { id = sale.Id }, sale);
        }
    }
}
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SalesTracker.Core.DTOs;
using SalesTracker.Core.Entities;
using SalesTracker.Core.Interfaces;

namespace SalesTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IProductRepository _productRepository;

        public ProductsController(IMapper mapper, IProductRepository productRepository)
        {
            _mapper = mapper;
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return Ok(await _productRepository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            // Check if product with the same name and manufacturer already exists
            var existingProduct = await _productRepository.GetAllAsync();
            if (existingProduct.Any(s => s.Name == product.Name && s.Manufacturer == s.Manufacturer))
            {
                return BadRequest("A product with this name already exists");
            }
            await _productRepository.AddAsync(product);
            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, ProductDto product)
        {
            var existingProduct = await _productRepository.GetByIdAsync(id);
            if (existingProduct == null)
            {
                return NotFound();
            }
            _mapper.Map(product, existingProduct);

            await _productRepository.UpdateAsync(existingProduct);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (!await _productRepository.ExistsAsync(id))
            {
                return NotFound();
            }

            await _productRepository.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("commission-percentage/{id}")]
        public async Task<ActionResult<decimal>> GetProductCommissionPercentage(int id)
        {
            if (!await _productRepository.ExistsAsync(id))
            {
                return NotFound();
            }
            return Ok(await _productRepository.GetCommissionPercentageAsync(id));
        }
    }
}
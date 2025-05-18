using Microsoft.AspNetCore.Mvc;
using SalesTracker.Core.Entities;
using SalesTracker.Core.Interfaces;
namespace SalesTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountsController : ControllerBase
    {
        private readonly IDiscountRepository _discountRepository;

        public DiscountsController(IDiscountRepository discountRepository)
        {
            _discountRepository = discountRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Discount>>> GetDiscounts()
        {
            return Ok(await _discountRepository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Discount>> GetDiscount(int id)
        {
            var discount = await _discountRepository.GetByIdAsync(id);
            if (discount == null)
            {
                return NotFound();
            }
            return discount;
        }

        [HttpPost]
        public async Task<ActionResult<Discount>> PostDiscount(Discount discount)
        {
            try
            {
                await _discountRepository.AddAsync(discount);
                return CreatedAtAction("GetDiscount", new { id = discount.Id }, discount);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDiscount(int id, Discount discount)
        {
            if (id != discount.Id)
            {
                return BadRequest();
            }

            try
            {
                await _discountRepository.UpdateAsync(discount);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiscount(int id)
        {
            if (!await _discountRepository.ExistsAsync(id))
            {
                return NotFound();
            }

            await _discountRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
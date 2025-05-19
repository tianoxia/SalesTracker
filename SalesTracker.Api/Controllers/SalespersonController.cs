using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SalesTracker.Core.DTOs;
using SalesTracker.Core.Entities;
using SalesTracker.Core.Interfaces;
using SalesTracker.Infrastructure.Repositories;

namespace SalesTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalespersonsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ISalespersonRepository _salespersonRepository;

        public SalespersonsController(IMapper mapper, ISalespersonRepository salespersonRepository)
        {
            _mapper = mapper;
            _salespersonRepository = salespersonRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Salesperson>>> GetSalespersons(CancellationToken cancellationToken)
        {
            return Ok(await _salespersonRepository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Salesperson>> GetSalesperson(int id)
        {
            var salesperson = await _salespersonRepository.GetByIdAsync(id);
            if (salesperson == null)
            {
                return NotFound();
            }
            return salesperson;
        }

        [HttpPost]
        public async Task<ActionResult<Salesperson>> PostSalesperson(Salesperson salesperson, CancellationToken cancellationToken)
        {
            var existingSalespersons = await _salespersonRepository.GetAllAsync();
            if (existingSalespersons.Any(s => s.Phone == salesperson.Phone && s.FirstName == salesperson.FirstName && s.LastName == salesperson.LastName))
            {
                return BadRequest("A salesperson already exists");
            }
            await _salespersonRepository.AddAsync(salesperson);
            return CreatedAtAction("GetSalesperson", new { id = salesperson.Id }, salesperson);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalesperson(int id, SalespersonUpdateDto salesperson, CancellationToken cancellationToken)
        {
            var existingSalesperson = await _salespersonRepository.GetByIdAsync(id);
            if (existingSalesperson == null)
            {
                return NotFound();
            }
            _mapper.Map(salesperson, existingSalesperson);

            await _salespersonRepository.UpdateAsync(existingSalesperson);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSalesperson(int id)
        {
            if (!await _salespersonRepository.ExistsAsync(id))
            {
                return NotFound();
            }

            await _salespersonRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
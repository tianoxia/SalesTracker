using Microsoft.AspNetCore.Mvc;
using SalesTracker.Core.Entities;
using SalesTracker.Core.Interfaces;

namespace SalesTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomersController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return Ok(await _customerRepository.GetAllAsync());
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using Weather_React_DotNet_Project.Models;
using Weather_React_DotNet_Project.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Weather_React_DotNet_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherDataController : ControllerBase
    {
        private readonly WeatherDataService _weatherDataService;

        public WeatherDataController(WeatherDataService weatherDataService)
        {
            _weatherDataService = weatherDataService;
        }

        // GET: api/WeatherData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WeatherData>>> GetWeatherData()
        {
            var weatherData = await _weatherDataService.GetAllWeatherDataAsync();
            return Ok(weatherData);
        }

        // GET: api/WeatherData/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WeatherData>> GetWeatherData(int id)
        {
            var weatherData = await _weatherDataService.GetWeatherDataByIdAsync(id);

            if (weatherData == null)
            {
                return NotFound();
            }

            return Ok(weatherData);
        }

        // POST: api/WeatherData
        [HttpPost]
        public async Task<ActionResult<WeatherData>> PostWeatherData(WeatherData weatherData)
        {
            await _weatherDataService.AddWeatherDataAsync(weatherData);
            return CreatedAtAction(nameof(GetWeatherData), new { id = weatherData.DataID }, weatherData);
        }

        // PUT: api/WeatherData/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWeatherData(int id, WeatherData weatherData)
        {
            if (id != weatherData.DataID)
            {
                return BadRequest();
            }

            await _weatherDataService.UpdateWeatherDataAsync(weatherData);
            return NoContent();
        }

        // DELETE: api/WeatherData/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWeatherData(int id)
        {
            var weatherData = await _weatherDataService.GetWeatherDataByIdAsync(id);
            if (weatherData == null)
            {
                return NotFound();
            }

            await _weatherDataService.DeleteWeatherDataAsync(id);
            return NoContent();
        }
    }
}

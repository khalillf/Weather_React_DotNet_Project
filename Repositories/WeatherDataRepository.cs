using Microsoft.EntityFrameworkCore;
using MVC.data;
using Weather_React_DotNet_Project.Models;
using Weather_React_DotNet_Project.Repositories.Interfaces;

namespace Weather_React_DotNet_Project.Repositories
{
    public class WeatherDataRepository : Repository<WeatherData>, IWeatherDataRepository
    {
        private readonly AppDbContext _context;
        public WeatherDataRepository(AppDbContext context) : base(context)
        {
            _context = context; // Initialize the context field
        }

        public async Task<IEnumerable<WeatherData>> GetByLocationIDAsync(int locationID)
        {
            return await _context.WeatherData.Where(w => w.LocationID == locationID).ToListAsync();
        }


        // Implement additional methods specific to WeatherData
    }

}

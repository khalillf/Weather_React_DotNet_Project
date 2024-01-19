using Weather_React_DotNet_Project.Models;

namespace Weather_React_DotNet_Project.Repositories.Interfaces
{
    public interface IWeatherDataRepository : IRepository<WeatherData>
    {
          Task<IEnumerable<WeatherData>> GetByLocationIDAsync(int locationID);
        // Add any additional methods specific to the WeatherData entity
    }

}

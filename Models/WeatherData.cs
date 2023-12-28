using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Weather_React_DotNet_Project.Models
{
    public class WeatherData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DataID { get; set; }

        [ForeignKey("Location")]
        public int LocationID { get; set; }

        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public decimal Temperature { get; set; }
        public decimal Humidity { get; set; }
        public decimal Pressure { get; set; }
        public decimal WindSpeed { get; set; }
        public string? WindDirection { get; set; }
        public decimal Precipitation { get; set; }

        // Navigation property
        public virtual Location? Location { get; set; }
    }


}

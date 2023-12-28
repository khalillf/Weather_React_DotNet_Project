﻿// <auto-generated />
using System;
using MVC.data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Weather_React_DotNet_Project.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Weather_React_DotNet_Project.Models.Location", b =>
                {
                    b.Property<int>("LocationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LocationID"));

                    b.Property<string>("City")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Country")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal>("Latitude")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Longitude")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("StateProvince")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("LocationID");

                    b.ToTable("Location");
                });

            modelBuilder.Entity("Weather_React_DotNet_Project.Models.User", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserID"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("UserID");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Weather_React_DotNet_Project.Models.UserPreference", b =>
                {
                    b.Property<int>("PreferenceID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PreferenceID"));

                    b.Property<string>("AlertType")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("LocationID")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("PreferenceID");

                    b.HasIndex("LocationID");

                    b.HasIndex("UserID");

                    b.ToTable("UserPreference");
                });

            modelBuilder.Entity("Weather_React_DotNet_Project.Models.WeatherData", b =>
                {
                    b.Property<int>("DataID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DataID"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("Humidity")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("LocationID")
                        .HasColumnType("int");

                    b.Property<decimal>("Precipitation")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Pressure")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Temperature")
                        .HasColumnType("decimal(18,2)");

                    b.Property<TimeSpan>("Time")
                        .HasColumnType("time");

                    b.Property<string>("WindDirection")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("WindSpeed")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("DataID");

                    b.HasIndex("LocationID");

                    b.ToTable("WeatherData");
                });

            modelBuilder.Entity("Weather_React_DotNet_Project.Models.WeatherForecast", b =>
                {
                    b.Property<int>("ForecastID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ForecastID"));

                    b.Property<decimal>("ChanceOfPrecipitation")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("LocationID")
                        .HasColumnType("int");

                    b.Property<decimal>("MaxTemperature")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("MinTemperature")
                        .HasColumnType("decimal(18,2)");

                    b.Property<TimeSpan>("Time")
                        .HasColumnType("time");

                    b.Property<int>("TypeID")
                        .HasColumnType("int");

                    b.HasKey("ForecastID");

                    b.HasIndex("LocationID");

                    b.HasIndex("TypeID");

                    b.ToTable("WeatherForecast");
                });

            modelBuilder.Entity("Weather_React_DotNet_Project.Models.WeatherType", b =>
                {
                    b.Property<int>("TypeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TypeID"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("TypeID");

                    b.ToTable("WeatherType");
                });

            modelBuilder.Entity("Weather_React_DotNet_Project.Models.UserPreference", b =>
                {
                    b.HasOne("Weather_React_DotNet_Project.Models.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Weather_React_DotNet_Project.Models.User", "User")
                        .WithMany("UserPreferences")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Location");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Weather_React_DotNet_Project.Models.WeatherData", b =>
                {
                    b.HasOne("Weather_React_DotNet_Project.Models.Location", "Location")
                        .WithMany("WeatherData")
                        .HasForeignKey("LocationID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Location");
                });

            modelBuilder.Entity("Weather_React_DotNet_Project.Models.WeatherForecast", b =>
                {
                    b.HasOne("Weather_React_DotNet_Project.Models.Location", "Location")
                        .WithMany("WeatherForecasts")
                        .HasForeignKey("LocationID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Weather_React_DotNet_Project.Models.WeatherType", "WeatherType")
                        .WithMany("WeatherForecasts")
                        .HasForeignKey("TypeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Location");

                    b.Navigation("WeatherType");
                });

            modelBuilder.Entity("Weather_React_DotNet_Project.Models.Location", b =>
                {
                    b.Navigation("WeatherData");

                    b.Navigation("WeatherForecasts");
                });

            modelBuilder.Entity("Weather_React_DotNet_Project.Models.User", b =>
                {
                    b.Navigation("UserPreferences");
                });

            modelBuilder.Entity("Weather_React_DotNet_Project.Models.WeatherType", b =>
                {
                    b.Navigation("WeatherForecasts");
                });
#pragma warning restore 612, 618
        }
    }
}

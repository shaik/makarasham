#!/usr/bin/env python3
"""
Feasibility Test for Meteostat Historical Weather Data Access

This script tests whether historical weather data can be successfully
retrieved for a sample location (Koh Phangan) and date range using the Meteostat library.

Requirements:
- Python 3.x
- Install meteostat package: pip install meteostat

Note:
- If required, set the environment variable METEOSTAT_API_KEY with your free API key.
"""

import datetime
import logging
import sys

try:
    from meteostat import Point, Daily
except ImportError:
    print("Error: meteostat module not found. Please install it using 'pip install meteostat'")
    sys.exit(1)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')

def fetch_weather_data(location_name, lat, lon, start_date, end_date):
    """Fetch weather data for a specific location and date range."""
    location = Point(lat, lon)
    
    # Log request parameters
    logging.info(f"\nRequest parameters for {location_name}:")
    logging.info(f"  Location: {location_name}")
    logging.info(f"  Coordinates: {lat}°, {lon}°")
    logging.info(f"  Start Date: {start_date.date()}")
    logging.info(f"  End Date: {end_date.date()}")
    logging.info(f"  Days Requested: {(end_date - start_date).days}")
    
    try:
        data = Daily(location, start_date, end_date)
        data = data.fetch()
        if data.empty:
            logging.error(f"No data received for {location_name}")
            return None
        return data
    except Exception as e:
        logging.error(f"Error while fetching data for {location_name}: {e}")
        return None

def run_feasibility_test():
    # Test locations
    locations = [
        {
            'name': 'Koh Phangan',
            'lat': 9.7387,
            'lon': 100.0603,
            'start': datetime.datetime(2022, 3, 10),
            'end': datetime.datetime(2022, 3, 20)
        },
        {
            'name': 'Novosibirsk',
            'lat': 55.05,  # 55°03′N
            'lon': 82.95,  # 82°57′E
            'start': datetime.datetime(2020, 2, 1),
            'end': datetime.datetime(2020, 2, 10)
        },
        {
            'name': 'Baghdad',
            'lat': 33.31528,  # 33°18′55″N
            'lon': 44.36611,  # 44°21′58″E
            'start': datetime.datetime(2020, 8, 1),
            'end': datetime.datetime(2020, 8, 10)
        }
    ]

    success = True
    results = {}

    for loc in locations:
        data = fetch_weather_data(
            loc['name'],
            loc['lat'],
            loc['lon'],
            loc['start'],
            loc['end']
        )
        
        if data is None:
            success = False
        else:
            results[loc['name']] = {
                'coordinates': f"{loc['lat']}°, {loc['lon']}°",
                'date_range': f"{loc['start'].date()} to {loc['end'].date()}",
                'data': data
            }
            logging.info(f"\nResults for {loc['name']}:")
            logging.info(f"  Temperature range: {data['tavg'].min():.1f}°C to {data['tavg'].max():.1f}°C")
            logging.info(f"  Average temperature: {data['tavg'].mean():.1f}°C")
            logging.info(f"  Min/Max recorded: {data['tmin'].min():.1f}°C to {data['tmax'].max():.1f}°C")
            logging.info(f"  Total precipitation: {data['prcp'].sum():.1f}mm")
            logging.info(f"  Days with precipitation: {(data['prcp'] > 0).sum()}")

    if not success:
        logging.error("Feasibility test failed for one or more locations")
        sys.exit(1)
    
    logging.info("Feasibility test completed successfully for all locations")

if __name__ == '__main__':
    run_feasibility_test()

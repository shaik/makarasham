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

def run_feasibility_test():
    # Define the location: Koh Phangan (approximate coordinates)
    lat = 9.7387
    lon = 100.0603
    location = Point(lat, lon)

    # Define a test date range (e.g., March 10, 2022 to March 20, 2022)
    start = datetime.datetime(2022, 3, 10)
    end = datetime.datetime(2022, 3, 20)

    logging.info("Fetching historical weather data for Koh Phangan from %s to %s", start.date(), end.date())
    
    try:
        # Fetch daily historical data
        data = Daily(location, start, end)
        data = data.fetch()
    except Exception as e:
        logging.error("Error while fetching data: %s", e)
        sys.exit(1)

    # Validate that data was returned
    if data.empty:
        logging.error("No data received. Feasibility test failed.")
        sys.exit(1)
    else:
        logging.info("Feasibility test succeeded. Data received:")
        print(data)

if __name__ == '__main__':
    run_feasibility_test()

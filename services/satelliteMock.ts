
import { SatelliteData } from '../types';

/**
 * Mocks the automated ingestion from NOAA OISST and MODIS Chlorophyll feeds.
 * In production, this calls a FastAPI endpoint that scrapes NetCDF files.
 */
export const fetchSatelliteData = async (lat: number, lng: number): Promise<SatelliteData> => {
  // Simulate network latency for satellite data extraction
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Logic: Closer to equator or near urban coasts (simulated) = higher risk variables
  const isNearCoast = Math.abs(lat) < 20; 
  
  return {
    sst: isNearCoast ? 29.5 : 24.2,
    chlorophyll: isNearCoast ? 14.1 : 3.5,
    sst_3day_avg: 28.1,
    sst_7day_avg: 27.5,
    chlorophyll_3day_avg: 11.2,
    chlorophyll_7day_avg: 10.1,
    timestamp: new Date().toISOString()
  };
};

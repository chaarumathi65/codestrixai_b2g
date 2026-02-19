
export enum RiskLevel {
  SAFE = 'SAFE',
  WARNING = 'WARNING',
  SEVERE = 'SEVERE'
}

export type Language = 'en' | 'ta' | 'hi';

export interface User {
  name: string;
  phone: string;
}

export interface CoastalZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface SatelliteData {
  sst: number;
  chlorophyll: number;
  sst_3day_avg: number;
  sst_7day_avg: number;
  chlorophyll_3day_avg: number;
  chlorophyll_7day_avg: number;
  timestamp: string;
}

export interface PredictionFeatures {
  sst: number;
  chlorophyll: number;
  sst_3day_avg: number;
  sst_7day_avg: number;
  chlorophyll_3day_avg: number;
  chlorophyll_7day_avg: number;
}

export interface PredictionResult {
  risk: RiskLevel;
  probability: number;
  advisory?: string;
  analysis?: string;
}

export type AppView = 'splash' | 'login' | 'otp' | 'detecting' | 'result' | 'admin' | 'architecture';

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  is_day: boolean[];
}

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: HourlyWeather;
}

export interface HourlyWeatherUV {
  time: string[];
  pm10: number[];
  pm2_5: number[];
  uv_index: number[];
}

export interface HourlyUnitsUV {
  time: string;
  pm10: string;
  pm2_5: string;
  uv_index: string;
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  weather_code: string;
  wind_speed_10m: string;
}

export interface WeatherUVApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnitsUV;
  hourly: HourlyWeatherUV;
}

export interface DailyWeatherApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: DailyHourlyUnits;
  hourly: DailyHourlyData;
  daily: DailyData;
}

export interface DailyData {
  time: string[];
  relative_humidity_2m: (number | null)[];
  wind_speed_10m: (number | null)[];
  weather_code: (number | null)[];
  temperature_2m_max: (number | null)[];
  uv_index_max: (number | null)[];
}
export interface DailyHourlyData {
  time: string[];
  relative_humidity_2m: (number | null)[];
  wind_speed_10m: (number | null)[];
}

export interface DailyHourlyUnits {
  time: string;
  relative_humidity_2m: string;
  wind_speed_10m: string;
}

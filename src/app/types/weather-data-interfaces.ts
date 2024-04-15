export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  weather_code: number[];
  wind_speed_10m: number[];
}

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    weather_code: string;
    wind_speed_10m: string;
  };
  hourly: HourlyWeather;
}

export interface HourlyWeatherUV {
  time: string[];
  pm10: number[];
  pm2_5: number[];
  uv_index: number[];
}

export interface HourlyUnits {
  time: string;
  pm10: string;
  pm2_5: string;
  uv_index: string;
}

export interface WeatherUVApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: HourlyWeatherUV;
}

import { useEffect, useRef, useState } from 'react';
import { fetchWeatherByCity, fetchWeatherByCoordinates } from '../services/api';
import { createFallbackWeatherData } from '../utils/sampleWeather';
import { transformWeatherData } from '../utils/weather';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT_CITY = 'New York';
const DEFAULT_FAVORITES = ['Tokyo', 'Reykjavik', 'Cape Town'];

export function useWeather() {
  const [unit, setUnit] = useLocalStorage('whether-unit', 'celsius');
  const [lastSearchedCity, setLastSearchedCity] = useLocalStorage(
    'whether-last-city',
    null,
  );
  const [favorites, setFavorites] = useLocalStorage(
    'whether-favorites',
    DEFAULT_FAVORITES,
  );
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [activeLocation, setActiveLocation] = useState(null);
  const [bootstrapped, setBootstrapped] = useState(false);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (bootstrapped) {
      return;
    }

    if (lastSearchedCity) {
      setActiveLocation({
        type: 'city',
        label: lastSearchedCity,
        query: lastSearchedCity,
      });
      setBootstrapped(true);
      return;
    }

    if (!navigator.geolocation) {
      setActiveLocation({
        type: 'city',
        label: DEFAULT_CITY,
        query: DEFAULT_CITY,
      });
      setBootstrapped(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setActiveLocation({
          type: 'coords',
          label: 'Your location',
          latitude: coords.latitude,
          longitude: coords.longitude,
          notice: null,
        });
        setBootstrapped(true);
      },
      () => {
        setActiveLocation({
          type: 'city',
          label: DEFAULT_CITY,
          query: DEFAULT_CITY,
          notice: `Location access is off, so ${DEFAULT_CITY} is loaded instead.`,
        });
        setBootstrapped(true);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 600000,
        timeout: 10000,
      },
    );
  }, [bootstrapped, lastSearchedCity]);

  useEffect(() => {
    if (!activeLocation) {
      return;
    }

    const currentRequestId = requestIdRef.current + 1;
    requestIdRef.current = currentRequestId;

    async function loadWeather() {
      setLoading(true);

      try {
        const response =
          activeLocation.type === 'coords'
            ? await fetchWeatherByCoordinates({
                latitude: activeLocation.latitude,
                longitude: activeLocation.longitude,
                label: activeLocation.label,
                unit,
              })
            : await fetchWeatherByCity(activeLocation.query, unit);

        if (requestIdRef.current !== currentRequestId) {
          return;
        }

        const nextWeather = transformWeatherData({
          forecast: response.forecast,
          location: response.location,
          unit,
        });

        setWeather(nextWeather);

        if (activeLocation.type === 'city') {
          setLastSearchedCity(activeLocation.query);
        }

        setStatus(
          activeLocation.notice
            ? {
                type: 'info',
                message: activeLocation.notice,
              }
            : null,
        );
      } catch (error) {
        if (requestIdRef.current !== currentRequestId) {
          return;
        }

        if (error.code === 'CITY_NOT_FOUND') {
          setStatus({
            type: 'error',
            message: `No weather match found for "${activeLocation.label}". Try a nearby major city.`,
          });
          return;
        }

        const fallbackWeather = createFallbackWeatherData(
          activeLocation.label || DEFAULT_CITY,
          unit,
        );
        setWeather(fallbackWeather);
        setStatus({
          type: 'warning',
          message: 'Live weather is temporarily unavailable, so a realistic demo forecast is shown instead.',
        });
      } finally {
        if (requestIdRef.current === currentRequestId) {
          setLoading(false);
        }
      }
    }

    loadWeather();
  }, [activeLocation, unit]);

  function searchByCity(cityName) {
    const trimmedCity = cityName.trim();

    if (!trimmedCity) {
      setStatus({
        type: 'error',
        message: 'Enter a city name to search the live forecast.',
      });
      return;
    }

    setActiveLocation({
      type: 'city',
      label: trimmedCity,
      query: trimmedCity,
      notice: null,
    });
  }

  function detectLocation() {
    if (!navigator.geolocation) {
      setStatus({
        type: 'error',
        message: 'This browser does not support geolocation.',
      });
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setActiveLocation({
          type: 'coords',
          label: 'Your location',
          latitude: coords.latitude,
          longitude: coords.longitude,
          notice: 'Current location forecast refreshed.',
        });
      },
      () => {
        setLoading(false);
        setStatus({
          type: 'error',
          message: 'Location access was denied. Search for a city instead.',
        });
      },
      {
        enableHighAccuracy: false,
        maximumAge: 600000,
        timeout: 10000,
      },
    );
  }

  function toggleFavorite(cityName) {
    if (!cityName || cityName === 'Your location') {
      return;
    }

    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some(
        (item) => item.toLowerCase() === cityName.toLowerCase(),
      );

      if (exists) {
        return currentFavorites.filter(
          (item) => item.toLowerCase() !== cityName.toLowerCase(),
        );
      }

      return [cityName, ...currentFavorites].slice(0, 6);
    });
  }

  function clearStatus() {
    setStatus(null);
  }

  return {
    weather,
    loading,
    status,
    unit,
    setUnit,
    favorites,
    toggleFavorite,
    lastSearchedCity,
    searchByCity,
    detectLocation,
    clearStatus,
  };
}

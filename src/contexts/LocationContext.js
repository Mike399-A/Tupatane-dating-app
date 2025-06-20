import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { KENYAN_COUNTIES, REGIONS } from '../constants/kenyanData';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
      
      if (status === 'granted') {
        getCurrentLocation();
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setLocationPermission(false);
    }
  };

  const getCurrentLocation = async () => {
    if (!locationPermission) return;

    try {
      setLoading(true);
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setCurrentLocation(location);
      
      // Reverse geocoding to get county information
      const addressComponents = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (addressComponents.length > 0) {
        const address = addressComponents[0];
        const detectedCounty = findCountyFromAddress(address);
        if (detectedCounty) {
          setSelectedCounty(detectedCounty);
          const region = REGIONS.find(r => r.counties.includes(detectedCounty.name));
          if (region) {
            setSelectedRegion(region);
          }
        }
      }
    } catch (error) {
      console.error('Error getting current location:', error);
    } finally {
      setLoading(false);
    }
  };

  const findCountyFromAddress = (address) => {
    // Try to match county from address components
    const addressString = `${address.city} ${address.region} ${address.country}`.toLowerCase();
    
    return KENYAN_COUNTIES.find(county => 
      addressString.includes(county.name.toLowerCase())
    ) || null;
  };

  const updateLocationPreferences = (county, region) => {
    setSelectedCounty(county);
    setSelectedRegion(region);
  };

  const getDistanceToUser = (userLocation) => {
    if (!currentLocation) return null;

    const R = 6371; // Earth's radius in kilometers
    const dLat = deg2rad(userLocation.latitude - currentLocation.coords.latitude);
    const dLon = deg2rad(userLocation.longitude - currentLocation.coords.longitude);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(currentLocation.coords.latitude)) * Math.cos(deg2rad(userLocation.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  const findNearbyUsers = async (radius = 50) => {
    if (!currentLocation) return [];

    try {
      setLoading(true);
      // Simulate API call to find nearby users
      const mockNearbyUsers = await mockLocationAPI('findNearbyUsers', {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        radius,
        county: selectedCounty?.name,
      });

      setNearbyUsers(mockNearbyUsers);
      return mockNearbyUsers;
    } catch (error) {
      console.error('Error finding nearby users:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getUsersByCounty = async (countyName) => {
    try {
      setLoading(true);
      const users = await mockLocationAPI('getUsersByCounty', { county: countyName });
      return users;
    } catch (error) {
      console.error('Error getting users by county:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getUsersByRegion = async (regionName) => {
    try {
      setLoading(true);
      const users = await mockLocationAPI('getUsersByRegion', { region: regionName });
      return users;
    } catch (error) {
      console.error('Error getting users by region:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentLocation,
    locationPermission,
    selectedCounty,
    selectedRegion,
    nearbyUsers,
    loading,
    requestLocationPermission,
    getCurrentLocation,
    updateLocationPreferences,
    getDistanceToUser,
    findNearbyUsers,
    getUsersByCounty,
    getUsersByRegion,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

// Mock API for development
const mockLocationAPI = async (action, data) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  switch (action) {
    case 'findNearbyUsers':
      return generateMockUsers(10, data.county);
    
    case 'getUsersByCounty':
      return generateMockUsers(20, data.county);
    
    case 'getUsersByRegion':
      return generateMockUsers(50, null, data.region);
    
    default:
      return [];
  }
};

const generateMockUsers = (count, county, region) => {
  const mockUsers = [];
  const names = ['Amina', 'Brian', 'Cynthia', 'David', 'Esther', 'Francis', 'Grace', 'Hassan', 'Ivy', 'John'];
  const interests = ['Travel', 'Music', 'Food', 'Sports', 'Art', 'Technology', 'Photography', 'Dancing'];

  for (let i = 0; i < count; i++) {
    mockUsers.push({
      id: Math.random().toString(36).substr(2, 9),
      name: names[Math.floor(Math.random() * names.length)],
      age: 22 + Math.floor(Math.random() * 13), // 22-35 years
      location: {
        county: county || KENYAN_COUNTIES[Math.floor(Math.random() * KENYAN_COUNTIES.length)].name,
        distance: Math.floor(Math.random() * 50) + 1, // 1-50 km
      },
      interests: interests.slice(0, Math.floor(Math.random() * 4) + 2),
      profilePicture: `https://picsum.photos/200/200?random=${i}`,
      verified: Math.random() > 0.3,
      lastSeen: new Date(Date.now() - Math.random() * 86400000 * 7), // Within last week
    });
  }

  return mockUsers;
}; 
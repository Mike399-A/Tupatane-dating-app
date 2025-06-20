import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userData = await AsyncStorage.getItem('userData');
      
      if (userToken && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Simulate API call
      const response = await mockAuthAPI('login', { email, password });
      
      if (response.success) {
        const { user: userData, token } = response.data;
        
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const signup = async (userData) => {
    try {
      // Simulate API call
      const response = await mockAuthAPI('signup', userData);
      
      if (response.success) {
        const { user: newUser, token } = response.data;
        
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(newUser));
        
        setUser(newUser);
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Signup failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      // Simulate API call
      const response = await mockAuthAPI('updateProfile', {
        userId: user.id,
        ...updatedData
      });
      
      if (response.success) {
        const updatedUser = { ...user, ...updatedData };
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Profile update failed. Please try again.' };
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock API function for development
const mockAuthAPI = async (action, data) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  switch (action) {
    case 'login':
      if (data.email === 'test@example.com' && data.password === 'password') {
        return {
          success: true,
          data: {
            user: {
              id: '1',
              name: 'John Doe',
              email: 'test@example.com',
              age: 28,
              location: { county: 'Nairobi', city: 'Nairobi' },
              interests: ['Travel', 'Music', 'Food'],
              profilePicture: null,
              verified: true,
            },
            token: 'mock-jwt-token-12345'
          }
        };
      } else {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

    case 'signup':
      return {
        success: true,
        data: {
          user: {
            id: Math.random().toString(36).substr(2, 9),
            name: data.name,
            email: data.email,
            age: data.age,
            location: data.location,
            interests: data.interests || [],
            profilePicture: null,
            verified: false,
          },
          token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9)
        }
      };

    case 'updateProfile':
      return {
        success: true,
        data: { message: 'Profile updated successfully' }
      };

    default:
      return {
        success: false,
        error: 'Unknown action'
      };
  }
}; 
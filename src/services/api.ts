// Frontend API service for TactNova booking system

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  selectedDate: string;
  selectedTime: string;
}

export interface BookingResponse {
  success: boolean;
  data: {
    id: string;
    status: string;
    created_at: string;
  };
  message: string;
}

export const bookingAPI = {
  // Create a new booking
  create: async (bookingData: BookingData): Promise<BookingResponse> => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Failed to create booking');
    }

    return response.json();
  },

  // Get all bookings (admin functionality)
  getAll: async (): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }

    return response.json();
  },

  // Get booking by ID
  getById: async (id: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch booking');
    }

    return response.json();
  }
};

// Health check function
export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
};

// Network status hook
export const checkBackendStatus = async (): Promise<{
  isHealthy: boolean;
  message: string;
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (response.ok) {
      const data = await response.json();
      return {
        isHealthy: true,
        message: data.message || 'Backend is healthy'
      };
    } else {
      return {
        isHealthy: false,
        message: 'Backend is not responding properly'
      };
    }
  } catch (error) {
    return {
      isHealthy: false,
      message: 'Cannot connect to backend server'
    };
  }
};

# Frontend Integration Guide

## 🔗 Connecting Frontend to Backend

### Update Frontend Environment

Create or update your frontend `.env` file:

```env
# Frontend .env file
VITE_API_URL=http://localhost:5000/api
# For production: VITE_API_URL=https://your-backend-domain.com/api
```

### Update ScheduleCallButton Component

Replace the mock booking submission in your `ScheduleCallButton.tsx`:

```typescript
// src/components/ui/ScheduleCallButton.tsx

const handleSubmit = async (data: BookingFormData) => {
  setIsSubmitting(true);
  
  try {
    // Replace this section with actual API call
    const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        selectedDate: format(selectedDate, 'yyyy-MM-dd'),
        selectedTime: selectedTime,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to schedule appointment');
    }

    const result = await response.json();
    
    // Success handling
    toast.success('Appointment scheduled successfully! Check your email for confirmation.');
    setShowModal(false);
    reset();
    setSelectedDate(new Date());
    setSelectedTime('');
    
  } catch (error) {
    console.error('Booking error:', error);
    toast.error('Failed to schedule appointment. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

### Create API Service (Recommended)

Create a dedicated API service file:

```typescript
// src/services/api.ts

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
  create: async (bookingData: BookingData): Promise<BookingResponse> => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create booking');
    }

    return response.json();
  },

  getAll: async (): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }

    return response.json();
  },

  getById: async (id: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch booking');
    }

    return response.json();
  }
};

export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
};
```

### Update ScheduleCallButton to Use API Service

```typescript
// In ScheduleCallButton.tsx, import and use the API service

import { bookingAPI, type BookingData } from '../../services/api';

const handleSubmit = async (data: BookingFormData) => {
  setIsSubmitting(true);
  
  try {
    const bookingData: BookingData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service: data.service,
      selectedDate: format(selectedDate, 'yyyy-MM-dd'),
      selectedTime: selectedTime,
    };

    const result = await bookingAPI.create(bookingData);
    
    toast.success('Appointment scheduled successfully! Check your email for confirmation.');
    setShowModal(false);
    reset();
    setSelectedDate(new Date());
    setSelectedTime('');
    
  } catch (error) {
    console.error('Booking error:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to schedule appointment. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

### Add Error Boundary (Optional but Recommended)

```typescript
// src/components/ErrorBoundary.tsx

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Add Network Status Check

```typescript
// src/hooks/useNetworkStatus.ts

import { useState, useEffect } from 'react';
import { healthCheck } from '../services/api';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isBackendReachable, setIsBackendReachable] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const checkBackend = async () => {
      if (isOnline) {
        const reachable = await healthCheck();
        setIsBackendReachable(reachable);
      } else {
        setIsBackendReachable(false);
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [isOnline]);

  return { isOnline, isBackendReachable };
};
```

### Update Main App Component

```typescript
// src/App.tsx - Add error boundary and network status

import { ErrorBoundary } from './components/ErrorBoundary';
import { useNetworkStatus } from './hooks/useNetworkStatus';

function App() {
  const { isOnline, isBackendReachable } = useNetworkStatus();

  return (
    <ErrorBoundary>
      <Router>
        {!isOnline && (
          <div className="bg-red-500 text-white text-center py-2">
            You're offline. Some features may not work.
          </div>
        )}
        {isOnline && !isBackendReachable && (
          <div className="bg-yellow-500 text-white text-center py-2">
            Backend service is temporarily unavailable.
          </div>
        )}
        
        <Routes>
          {/* Your existing routes */}
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
```

## 🧪 Testing Frontend Integration

### 1. Start Both Services
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd ..
npm run dev
```

### 2. Test the Integration
1. Open frontend at http://localhost:5173
2. Click "Schedule a Call" button
3. Fill out the booking form
4. Submit and check:
   - Success toast appears
   - Email confirmation received
   - Backend logs show the booking
   - Database entry created

### 3. Check Network Tab
- Open browser dev tools → Network tab
- Submit a booking
- Verify API call is made to your backend
- Check response status and data

## 🔧 Troubleshooting

### CORS Issues
If you see CORS errors:
1. Check backend `ALLOWED_ORIGINS` in `.env`
2. Restart backend server
3. Make sure frontend URL is included

### API Connection Issues
1. Verify backend is running on correct port
2. Check `VITE_API_URL` in frontend `.env`
3. Test backend health: `curl http://localhost:5000/api/health`

### Build Issues
If build fails:
1. Make sure all imports are correct
2. Check TypeScript types match
3. Verify all dependencies are installed

## 📚 Additional Resources

- [Backend API Documentation](http://localhost:5000/api/docs)
- [Setup Guide](./SETUP.md)
- [Deployment Guide](./DEPLOYMENT.md)

Your frontend is now fully integrated with the backend booking system! 🎉

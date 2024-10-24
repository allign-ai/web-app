import { useEffect } from 'react';
import { useAuth, useSession } from '@clerk/clerk-react';

const useClerkSessionStorage = () => {
  const { getToken } = useAuth();
  const { session } = useSession();

  useEffect(() => {
    const storeSessionToken = async () => {
      try {
        // Get the session token
        const token = await getToken();

        if (token) {
          // Store token in sessionStorage
          sessionStorage.setItem('token', token);
        } else {
          // Remove token if not available
          sessionStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Error storing session token:', error);
        sessionStorage.removeItem('token');
      }
    };

    // Update token when session changes
    if (session) {
      void storeSessionToken();
    } else {
      sessionStorage.removeItem('token');
    }

    // Cleanup on unmount
    return () => {
      // Optionally clear token on unmount if needed
      // sessionStorage.removeItem('clerkToken');
    };
  }, [session, getToken]);

  // Helper function to get stored token
  const getStoredToken = () => {
    return sessionStorage.getItem('token');
  };

  return {
    getStoredToken
  };
};

export default useClerkSessionStorage;
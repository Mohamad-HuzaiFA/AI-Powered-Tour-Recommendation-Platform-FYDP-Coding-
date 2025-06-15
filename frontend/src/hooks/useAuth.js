// // src/hooks/useAuth.js
// "use client";
// import { useState, useEffect, createContext, useContext } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios'; // Import axios

// // Create an Auth Context
// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const API_URL = process.env.NEXT_PUBLIC_API_URL; // Get the base API URL

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       const accessToken = localStorage.getItem('accessToken');

//       if (accessToken && API_URL) {
//         try {
//           const response = await axios.get(`${API_URL}/api/protected-endpoint/`, {
//             headers: {
//               'Authorization': `Bearer ${accessToken}`,
//             },
//           });

//           if (response.status === 200) {
//             setUser({ username: response.data.message.split(' ')[1].slice(0, -1) }); // Extract username from the message
//           } else {
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('refreshToken');
//             setUser(null);
//           }
//         } catch (error) {
//           console.error('Error checking auth status:', error);
//           localStorage.removeItem('accessToken');
//           localStorage.removeItem('refreshToken');
//           setUser(null);
//         }
//       } else {
//         setUser(null); // No token, so not logged in
//       }
//       setLoading(false);
//     };

//     checkAuthStatus();
//   }, [API_URL]);


//   // Login function
//   const login = async (email, password) => {
//     setLoading(true);
//     if (!API_URL) {
//       console.error("NEXT_PUBLIC_API_URL is not defined in your environment variables.");
//       setLoading(false);
//       return;
//     }
//     try {
//       const response = await axios.post(`${API_URL}/api/login/`, { email, password });
//       const { access, refresh, user: userData } = response.data; // Assuming your login response might include user data
//       localStorage.setItem('accessToken', access);
//       localStorage.setItem('refreshToken', refresh);
//       setUser(userData || { loggedIn: true }); // Set actual user data or a loggedIn flag
//       router.push('/recommendations/preferences');
//     } catch (error) {
//       console.error('Login error:', error);
//       setUser(null);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     setUser(null);
//     router.push('/');
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     isLoggedIn: !!user,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook to use the auth context
// export const useAuth = () => {
//   return useContext(AuthContext);
// };







// // src/hooks/useAuth.js
// "use client";
// import { useState, useEffect, createContext, useContext } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios'; // Import axios

// // Create an Auth Context
// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const API_URL = process.env.NEXT_PUBLIC_API_URL; // Get the base API URL

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       const accessToken = localStorage.getItem('accessToken');

//       if (accessToken && API_URL) {
//         try {
//           const response = await axios.get(`${API_URL}/api/protected-endpoint/`, {
//             headers: {
//               'Authorization': `Bearer ${accessToken}`,
//             },
//           });

//           if (response.status === 200) {
//             const messageParts = response.data.message.split(' ');
//             const username = messageParts[1]?.slice(0, -1); // Extract username
//             setUser({ username }); // Store username in the user state
//           } else {
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('refreshToken');
//             setUser(null);
//           }
//         } catch (error) {
//           console.error('Error checking auth status:', error);
//           localStorage.removeItem('accessToken');
//           localStorage.removeItem('refreshToken');
//           setUser(null);
//         }
//       } else {
//         setUser(null); // No token, so not logged in
//       }
//       setLoading(false);
//     };

//     checkAuthStatus();
//   }, [API_URL]); // Include API_URL in the dependency array

//   // Login function (keep this as is, or update if your login response also includes user info)
//   const login = async (email, password) => {
//     setLoading(true);
//     if (!API_URL) {
//       console.error("NEXT_PUBLIC_API_URL is not defined in your environment variables.");
//       setLoading(false);
//       return;
//     }
//     try {
//       const response = await axios.post(`${API_URL}/api/login/`, { email, password });
//       const { access, refresh } = response.data;
//       localStorage.setItem('accessToken', access);
//       localStorage.setItem('refreshToken', refresh);
//       // You might want to fetch user data here or rely on the initial checkAuthStatus
//       setUser({ loggedIn: true });
//       router.push('/recommendations/preferences');
//     } catch (error) {
//       console.error('Login error:', error);
//       setUser(null);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout function (no changes needed here)
//   const logout = () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     setUser(null);
//     router.push('/');
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     isLoggedIn: !!user,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook to use the auth context (no changes needed)
// export const useAuth = () => {
//   return useContext(AuthContext);
// };






// src/hooks/useAuth.js
"use client";
import { useState, useEffect, createContext, useContext, useCallback } from 'react'; // Added useCallback
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Create an Auth Context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null); // <--- NEW: State to hold the access token
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.log("No refresh token found.");
      setAccessToken(null);
      setUser(null);
      setIsLoggedIn(false); // Make sure this is also reset
      return false;
    }

    try {
      const response = await axios.post(`${API_URL}/api/token/refresh/`, { refresh: refreshToken });
      const newAccessToken = response.data.access;
      localStorage.setItem('accessToken', newAccessToken);
      setAccessToken(newAccessToken);
      console.log("Access token refreshed successfully.");
      return true;
    } catch (error) {
      console.error('Error refreshing token:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setAccessToken(null);
      setUser(null);
      setIsLoggedIn(false); // Make sure this is also reset
      return false;
    }
  }, [API_URL]);


  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedAccessToken = localStorage.getItem('accessToken');
      const storedRefreshToken = localStorage.getItem('refreshToken'); // Also get refresh token

      if (storedAccessToken && API_URL) {
        setAccessToken(storedAccessToken); // Set immediately for faster availability
        // Try to validate current token
        try {
          const response = await axios.get(`${API_URL}/api/protected-endpoint/`, {
            headers: {
              'Authorization': `Bearer ${storedAccessToken}`, // Use storedAccessToken
            },
          });

          if (response.status === 200) {
            const messageParts = response.data.message.split(' ');
            const username = messageParts[1]?.slice(0, -1);
            setUser({ username });
          } else {
            // Token might be invalid but not expired, try refresh
            console.log("Access token invalid, attempting to refresh...");
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                // If refreshed, re-check auth status with new token (optional, or rely on next render)
                // For now, just set user if refreshed successfully (assuming refresh implies user)
                setUser({ username: "Authenticated User" }); // Placeholder or re-fetch user details
            } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setAccessToken(null);
                setUser(null);
            }
          }
        } catch (error) {
          console.error('Error checking auth status or token expired:', error);
          // If error is 401/403, try refreshing
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.log("Attempting to refresh token due to API error...");
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                // If refreshed, the new access token is already set in state
                // You might need to make another call to protected endpoint
                // or assume successful refresh means user is logged in.
                setUser({ username: "Authenticated User" }); // Placeholder
            } else {
                // Refresh failed, clear tokens
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setAccessToken(null);
                setUser(null);
            }
          } else {
            // Other errors, clear tokens
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setAccessToken(null);
            setUser(null);
          }
        }
      } else {
        setAccessToken(null); // No token, so not logged in
        setUser(null);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, [API_URL, refreshAccessToken]); // Add refreshAccessToken to dependencies

  const login = useCallback(async (email, password) => { // Added useCallback
    setLoading(true);
    if (!API_URL) {
      console.error("NEXT_PUBLIC_API_URL is not defined in your environment variables.");
      setLoading(false);
      return false; // Indicate failure
    }
    try {
      const response = await axios.post(`${API_URL}/api/login/`, { email, password });
      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      setAccessToken(access); // <--- Set the new access token
      setUser({ loggedIn: true }); // You might get actual user info here too
      router.push('/recommendations/preferences');
      return true; // Indicate success
    } catch (error) {
      console.error('Login error:', error);
      setUser(null);
      setAccessToken(null); // Clear access token on login failure
      throw error; // Re-throw to allow component to handle
    } finally {
      setLoading(false);
    }
  }, [API_URL, router]);

  const logout = useCallback(() => { // Added useCallback
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null); // Clear access token on logout
    setUser(null);
    router.push('/');
  }, [router]);

  // The value provided by the context
  const value = {
    user,
    loading, // Renamed from 'isLoadingAuth' to 'loading' to match your useAuth
    login,
    logout,
    isLoggedIn: !!user && !!accessToken, // User is logged in if user object AND accessToken exists
    accessToken, // <--- EXPOSE the accessToken here
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children when loading is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
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







// src/hooks/useAuth.js
"use client";
import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios'; // Import axios

// Create an Auth Context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL; // Get the base API URL

  useEffect(() => {
    const checkAuthStatus = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken && API_URL) {
        try {
          const response = await axios.get(`${API_URL}/api/protected-endpoint/`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          if (response.status === 200) {
            const messageParts = response.data.message.split(' ');
            const username = messageParts[1]?.slice(0, -1); // Extract username
            setUser({ username }); // Store username in the user state
          } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setUser(null);
          }
        } catch (error) {
          console.error('Error checking auth status:', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setUser(null);
        }
      } else {
        setUser(null); // No token, so not logged in
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, [API_URL]); // Include API_URL in the dependency array

  // Login function (keep this as is, or update if your login response also includes user info)
  const login = async (email, password) => {
    setLoading(true);
    if (!API_URL) {
      console.error("NEXT_PUBLIC_API_URL is not defined in your environment variables.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/api/login/`, { email, password });
      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      // You might want to fetch user data here or rely on the initial checkAuthStatus
      setUser({ loggedIn: true });
      router.push('/recommendations/preferences');
    } catch (error) {
      console.error('Login error:', error);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function (no changes needed here)
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    router.push('/');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isLoggedIn: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context (no changes needed)
export const useAuth = () => {
  return useContext(AuthContext);
};
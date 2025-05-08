// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ['127.0.0.1', 'static-maps.yandex.ru'],
//     },
//   };
  
//   export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http', // Or 'https'
          hostname: '127.0.0.1',
          port: '8000', // If your backend runs on a specific port
          pathname: '/media/**', // Adjust the pathname pattern as needed
        },
        {
          protocol: 'https',
          hostname: 'static-maps.yandex.ru',
          pathname: '/1.x/**',
        },
        // Add other external image sources here
      ],
    },
  };
  
  export default nextConfig;
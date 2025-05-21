// // /** @type {import('next').NextConfig} */
// // const nextConfig = {};

// // export default nextConfig;


// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //     images: {
// //       domains: ['127.0.0.1', 'static-maps.yandex.ru'],
// //     },
// //   };
  
// //   export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'http', // Or 'https'
//           hostname: '127.0.0.1',
//           port: '8000', // If your backend runs on a specific port
//           pathname: '/media/**', // Adjust the pathname pattern as needed
//         },
//         {
//           protocol: 'https',
//           hostname: 'static-maps.yandex.ru',
//           pathname: '/1.x/**',
//         },
//         // Add other external image sources here
//       ],
//     },

//     api: {
//         bodyParser: {
//           sizeLimit: '4mb', // You can set this to whatever you need, e.g., '10mb', '500kb'
//         },
//       },
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

    // THIS IS THE CORRECT SECTION FOR BODY SIZE LIMIT IN MODERN NEXT.JS
    experimental: {
      serverActions: {
        bodySizeLimit: '4mb', // Set your desired limit here (e.g., '10mb' for larger files)
      },
    },

    // IMPORTANT: Make sure there is NO 'api' block here or anywhere else in nextConfig.
    // The previous 'api' block should be completely removed.
  };

export default nextConfig;
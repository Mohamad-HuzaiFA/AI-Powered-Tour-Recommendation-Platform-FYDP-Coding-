// // src/app/layout.js
// import { Geist, Geist_Mono } from "next/font/google";
// import "../app/globals.css";
// import Providers from "./Providers";
// import { AuthProvider } from "../hooks/useAuth"; // Import AuthProvider
// import { ComparisonProvider } from '@/hooks/comparisonContext';


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Explore the World",
//   description: "Join our travel community to discover amazing destinations!",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
//       >
//         <ComparisonProvider>
//         <AuthProvider> {/* Wrap children with AuthProvider */}
//           <Providers>{children}</Providers>
//         </AuthProvider>
//         </ComparisonProvider>
//       </body>
//     </html>
//   );
// }






// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "../app/globals.css";
import Providers from "./Providers";
import { AuthProvider } from "../hooks/useAuth"; // Import AuthProvider
import { ComparisonProvider } from '@/hooks/comparisonContext';
import CompareTray from '@/app/components/CompareTray'; // Import the CompareTray component
import QueryProvider from '@/app/components/QueryProvider'; // Import the QueryProvider


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Explore the World",
  description: "Join our travel community to discover amazing destinations!",
};

// Create a QueryClient instance



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        
        <ComparisonProvider>
          <AuthProvider> {/* Wrap children with AuthProvider */}
          <QueryProvider> {/* Wrap your content with QueryProvider */}
            <Providers>{children}</Providers>
            <CompareTray /> {/* Add the CompareTray component here */}
            </QueryProvider>
          </AuthProvider>
        </ComparisonProvider>
        
      </body>
    </html>
  );
}
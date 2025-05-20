
'use client';
import Link from "next/link";
import React from "react";
import "@/app/Home.css";
import Services from "@/app/components/Services";
import Trip from "@/app/components/Trip";
import Bookings from "@/app/components/Bookings";
import Tours from "@/app/components/Tours";
import Recomendations from "@/app/components/Recomendations";
import TourPackages from "@/app/components/TourPackages";
import Reviews from "@/app/components/Reviews";
import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";

function Home() {

  return (
    <>
      <Navbar />
      <section className="myContent">
        {/* Background Image Carousel */}
        <div className="carousel-background">
          <Image
            src="/assets/images/float1.jpg"
            alt="Slide 1"
            fill
            className="carousel-image fade-in"
            priority
          />
          <Image
            src="/assets/images/float2.jpg"
            alt="Slide 2"
            fill
            className="carousel-image fade-in"
          />
          <Image
            src="/assets/images/float3.jpg"
            alt="Slide 3"
            fill
            className="carousel-image fade-in"
          />
          <Image
            src="/assets/images/float4.jpg"
            alt="Slide 3"
            fill
            className="carousel-image fade-in"
          />
          <Image
            src="/assets/images/float5.jpg"
            alt="Slide 3"
            fill
            className="carousel-image fade-in"
          />
        </div>

        <div className="overlay"></div>

        <div className="hero-content">
          <h1>No matter where you’re going to, we’ll take you there</h1>
        </div>
      </section>

      <Services />
      <Trip />
      <Bookings />

      <div style={{ width: "100%", position: "relative" }}>
        <Image
          src="/assets/images/holiday.png"
          alt="Holiday"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <Tours />
      <Recomendations />
      <TourPackages />
      <Reviews tourId="b4b96813-253a-4e44-9c29-26e076c2551b" />
      <FooterSection />
    </>
  );
}

export default Home;










// 'use client';
// import Link from "next/link";
// import React from "react";
// import "@/app/Home.css";
// import Services from "@/app/components/Services";
// import Trip from "@/app/components/Trip";
// import Bookings from "@/app/components/Bookings";
// import Tours from "@/app/components/Tours";
// import Recomendations from "@/app/components/Recomendations";
// import TourPackages from "@/app/components/TourPackages";
// import Reviews from "@/app/components/Reviews";
// import FooterSection from "@/app/components/FooterSection";
// import Navbar from "@/app/components/Navbar";
// import Image from "next/image";
// import { useAuth } from "@/hooks/useAuth"; // Import the useAuth hook

// function Home() {
//   const { user, loading, isLoggedIn } = useAuth();

//   const heroTitle = isLoggedIn && user?.username
//     ? `Welcome, ${user.username}! Let's plan your next adventure.`
//     : `No matter where you’re going to, we’ll take you there`;

//   return (
//     <>
//       <Navbar />
//       <section className="myContent">
//         {/* Background Image Carousel */}
//         <div className="carousel-background">
//           {Array.from({ length: 5 }, (_, index) => (
//             <Image
//               key={index}
//               src={`/assets/images/float${index + 1}.jpg`}
//               alt={`Slide ${index + 1}`}
//               fill
//               className="carousel-image fade-in"
//               priority={index === 0}
//             />
//           ))}
//         </div>

//         <div className="overlay"></div>

//         <div className="hero-content">
//           <h1>{heroTitle}</h1>
//           {isLoggedIn && user?.username && (
//             <p className="text-lg text-gray-700 mt-2">Glad to have you back, {user.username}!</p>
//           )}
//         </div>
//       </section>

//       <Services />
//       <Trip />
//       <Bookings />

//       <div style={{ width: "100%", position: "relative" }}>
//         <Image
//           src="/assets/images/holiday.png"
//           alt="Holiday"
//           width={0}
//           height={0}
//           sizes="100vw"
//           style={{ width: "100%", height: "auto" }}
//         />
//       </div>

//       <Tours />
//       <Recomendations />
//       <TourPackages />
//       <Reviews tourId="b4b96813-253a-4e44-9c29-26e076c2551b" />
//       <FooterSection />
//     </>
//   );
// }

// export default Home;
// "use client";

// import React, { useEffect, useState } from "react";
// import dynamic from 'next/dynamic';
// import { useParams, useRouter} from "next/navigation";
// import Image from 'next/image'; // Import next/image
// import { FaMapMarkerAlt, FaImage, FaListAlt, FaInfoCircle } from 'react-icons/fa'; // Example icons
// import FooterSection from "@/app/components/FooterSection";
// import Navbar from "@/app/components/Navbar";
// import PlanTour from "@/app/components/plan_tour";
// import "@/app/tour_info/tour_info.css";
// import GalleryContent from "@/app/components/GalleryContent";
// import TourPlanContent from "@/app/components/TourPlanContent";

// const MapContent = dynamic(() => import("@/app/components/MapContent"), {
//     ssr: false,
// });

// const tabConfig = [
//     { id: "information", label: "Information", icon: <FaInfoCircle /> },
//     { id: "tourplan", label: "Tour Plan", icon: <FaListAlt /> },
//     { id: "location", label: "Location", icon: <FaMapMarkerAlt /> },
//     { id: "gallery", label: "Gallery", icon: <FaImage /> },
// ];

// export default function TourInfo() {
//     const { id } = useParams();
//     const router = useRouter(); // Use useRouter for programmatic navigation
//     const [activeTab, setActiveTab] = useState("information");
//     const [tour, setTour] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchTour = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const res = await fetch(`http://127.0.0.1:8000/api/tours/${id}`);
//                 if (!res.ok) {
//                     throw new Error(`HTTP error! status: ${res.status}`);
//                 }
//                 const data = await res.json();
//                 setTour(data);
//             } catch (err) {
//                 console.error("Failed to fetch tour:", err);
//                 setError("Failed to load tour details.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTour();
//     }, [id]);

//     if (loading) return <div className="text-center py-10">Loading tour details...</div>;
//     if (error) return <div className="text-center py-10 text-red-500">{error} <button onClick={() => router.reload()} className="underline">Try again</button></div>;
//     if (!tour) return null;

//     const renderTabContent = () => {
//         switch (activeTab) {
//             case "information":
//                 return (
//                     <>
//                         <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{tour.title}</h1>
//                         <p className="text-2xl text-red-500 font-semibold mb-6">${tour.price} / per couple</p>
//                         <div className="relative rounded-2xl shadow-2xl border border-gray-200 overflow-hidden aspect-video">
//                             <Image
//                                 src={tour.main_image}
//                                 alt={tour.title}
//                                 fill
//                                 style={{ objectFit: 'cover' }}
//                                 priority // Consider using priority for the main image
//                             />
//                         </div>
//                         <div className="mt-8 space-y-4">
//                             <h2 className="text-xl font-semibold text-gray-700">Overview</h2>
//                             <p className="text-gray-600">{tour.description || "No description available."}</p>
//                             {/* Add more information sections here based on your tour data */}
//                         </div>
//                     </>
//                 );

//             case "location":
//                 return (
//                     <div>
//                         <h2 className="text-xl font-semibold text-gray-700 mb-4">Location</h2>
//                         <MapContent locationName={tour.location_name} />
//                     </div>
//                 );

//             case "gallery":
//                 return (
//                     <div>
//                         <h2 className="text-xl font-semibold text-gray-700 mb-4">Gallery</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                             <GalleryContent tourId={id} /> {/* Pass tourId if GalleryContent needs it */}
//                         </div>
//                     </div>
//                 );

//             case "tourplan":
//                 return (
//                     <div>
//                         <h2 className="text-xl font-semibold text-gray-700 mb-4">Tour Plan</h2>
//                         <TourPlanContent tourId={id} /> {/* Pass tourId if TourPlanContent needs it */}
//                     </div>
//                 );

//             default:
//                 return <p>Content not available.</p>;
//         }
//     };

//     return (
//         <>
//             <div>
//                 <Navbar />

//                 {/* Hero section with background image */}
//                 <section
//                     className="relative w-full h-[60vh] flex flex-col justify-center items-center text-center text-white firstContent"
//                     style={{
//                         backgroundImage: `url(${tour.main_image})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                     }}
//                 >
//                     <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//                     <div className="relative z-10">
//                         <p className="text-sm uppercase tracking-widest mb-2">Explore This Tour</p>
//                         <h1 className="text-5xl md:text-6xl font-semibold font-[Great Vibes] drop-shadow-lg">{tour.title}</h1>
//                     </div>
//                 </section>

//                 {/* Four-Column Tab Buttons with Hover Effect */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center mt-8 px-4">
//                     {tabConfig.map((tab) => (
//                         <button
//                             key={tab.id}
//                             onClick={() => setActiveTab(tab.id)}
//                             className={`inline-flex flex-col items-center justify-center gap-2 px-4 py-3 text-lg font-semibold rounded transition duration-300 cursor-pointer
//                                 ${activeTab === tab.id
//                                     ? "text-red-600 underline"
//                                     : "text-gray-700 hover:text-red-500 hover:bg-gray-100"
//                                 }
//                             `}
//                         >
//                             {tab.icon}
//                             <span>{tab.label}</span>
//                         </button>
//                     ))}
//                 </div>

//                 {/* Main Content Area */}
//                 <div className="flex flex-col lg:flex-row gap-10 px-6 max-w-7xl mx-auto my-16">
//                     {/* Left Content (Tab Content) */}
//                     <div className="w-full lg:w-2/3 space-y-6">
//                         {renderTabContent()}
//                     </div>

//                     {/* Booking Form */}
//                     <aside className="w-full lg:w-1/3">
//                         <div className="bg-white p-6 shadow-lg rounded-lg sticky top-20">
//                             <h2 className="text-xl font-semibold text-gray-700 mb-4">Book Your Tour</h2>
//                             <PlanTour tour={tour} /> {/* Pass tour data to PlanTour if needed */}
//                         </div>
//                     </aside>
//                 </div>

//                 <FooterSection />
//             </div>
//         </>
//     );
// }


"use client";

import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { useParams, useRouter} from "next/navigation";
import Image from 'next/image'; // Import next/image
import { FaMapMarkerAlt, FaImage, FaListAlt, FaInfoCircle, FaClock, FaUsers, FaTag } from 'react-icons/fa'; // More icons
import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";
import PlanTour from "@/app/components/plan_tour";
import "@/app/tour_info/tour_info.css";
import GalleryContent from "@/app/components/GalleryContent";
import TourPlanContent from "@/app/components/TourPlanContent";

const MapContent = dynamic(() => import("@/app/components/MapContent"), {
    ssr: false,
});

const tabConfig = [
    { id: "information", label: "Information", icon: <FaInfoCircle /> },
    { id: "tourplan", label: "Tour Plan", icon: <FaListAlt /> },
    { id: "location", label: "Location", icon: <FaMapMarkerAlt /> },
    { id: "gallery", label: "Gallery", icon: <FaImage /> },
];

export default function TourInfo() {
    const { id } = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("information");
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTourDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/tours/${id}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setTour(data);
            } catch (err) {
                console.error("Failed to fetch tour details:", err);
                setError("Failed to load tour details.");
            } finally {
                setLoading(false);
            }
        };

        fetchTourDetails();
    }, [id]);

    if (loading) return <div className="text-center py-10">Loading tour details...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error} <button onClick={() => router.reload()} className="underline">Try again</button></div>;
    if (!tour) return null;

    const renderTabContent = () => {
        switch (activeTab) {
            case "information":
                return (
                    <>
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{tour.title}</h1>
                        <p className="text-2xl text-red-500 font-semibold mb-6">
                            From ${tour.dynamic_price || tour.price_per_person} / per person
                            {tour.dynamic_price && tour.dynamic_price !== tour.price_per_person && (
                                <span className="text-sm text-gray-500 ml-2">(Base: ${tour.price_per_person})</span>
                            )}
                        </p>
                        <div className="relative rounded-2xl shadow-2xl border border-gray-200 overflow-hidden aspect-video">
                            <Image
                                src={tour.main_image}
                                alt={tour.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>
                        <div className="mt-8 space-y-4">
                            <h2 className="text-xl font-semibold text-gray-700">Overview</h2>
                            <p className="text-gray-600">{tour.description || "No description available."}</p>
                        </div>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-2 text-gray-600">
                                <FaClock /> Duration: {tour.duration}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <FaMapMarkerAlt /> Location: {tour.location}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <FaUsers /> Group Size: {tour.min_group_size}-{tour.max_group_size}
                            </div>
                            {tour.tour_type && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaTag /> Type: {tour.tour_type}
                                </div>
                            )}
                            {tour.season && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaTag /> Season: {tour.season}
                                </div>
                            )}
                            {tour.tags && tour.tags.length > 0 && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaTag /> Tags: {tour.tags.join(", ")}
                                </div>
                            )}
                            {/* Add more details as needed */}
                        </div>
                    </>
                );

                case "location":
                  return (
                      <div>
                          <h2 className="text-xl font-semibold text-gray-700 mb-4">Location</h2>
                          {tour.latitude && tour.longitude ? (
                              <MapContent
                                  latitude={tour.latitude}
                                  longitude={tour.longitude}
                                  locationName={tour.location}
                              />
                          ) : (
                              <p className="text-gray-500">Location data not available.</p>
                          )}
                          <p className="mt-2 text-gray-600">Location: {tour.location}</p>
                      </div>
                  );
                  
            case "gallery":
                return (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Gallery</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <GalleryContent tourId={id} />
                        </div>
                    </div>
                );

            case "tourplan":
                return (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Tour Plan</h2>
                        <TourPlanContent tourId={id} />
                    </div>
                );

            default:
                return <p>Content not available.</p>;
        }
    };

    return (
        <>
            <div>
                <Navbar />

                <section
                    className="relative w-full h-[60vh] flex flex-col justify-center items-center text-center text-white firstContent"
                    style={{
                        backgroundImage: `url(${tour.main_image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="relative z-10">
                        <p className="text-sm uppercase tracking-widest mb-2">Explore This Tour</p>
                        <h1 className="text-5xl md:text-6xl font-semibold font-[Great Vibes] drop-shadow-lg">{tour.title}</h1>
                    </div>
                </section>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center mt-8 px-4">
                    {tabConfig.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`inline-flex flex-col items-center justify-center gap-2 px-4 py-3 text-lg font-semibold rounded transition duration-300 cursor-pointer
                                ${activeTab === tab.id
                                    ? "text-red-600 underline"
                                    : "text-gray-700 hover:text-red-500 hover:bg-gray-100"
                                }
                            `}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-10 px-6 max-w-7xl mx-auto my-16">
                    <div className="w-full lg:w-2/3 space-y-6">
                        {renderTabContent()}
                    </div>
                    <aside className="w-full lg:w-1/3">
                        <div className="bg-white p-6 shadow-lg rounded-lg sticky top-20">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Book Your Tour</h2>
                            <PlanTour tour={tour} availability={tour.availability} startDate={tour.start_date} endDate={tour.end_date} minGroupSize={tour.min_group_size} maxGroupSize={tour.max_group_size} pricePerPerson={tour.dynamic_price || tour.price_per_person} />
                        </div>
                    </aside>
                </div>

                <FooterSection />
            </div>
        </>
    );
}
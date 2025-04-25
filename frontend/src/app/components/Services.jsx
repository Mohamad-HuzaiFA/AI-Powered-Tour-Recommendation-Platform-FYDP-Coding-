// import "../components/CSS/Services.css";

// function Services() {
//   return (
//     <div className="body">
//       <section className="services">
//         <h3 className="category">CATEGORY</h3>
//         <h2 className="section-title">
//           We Offer <span>Best Services</span>
//         </h2>

//         <div className="services-container">
//           {/* Service 1 */}
//           <div className="service-card">
//             <img src="/assets/images/pic1.png" alt="Guided Tours" />
//             <h4>Guided Tours</h4>
//             <p>sunt qui repellat saepe quo velit aperiam id aliquam placeat.</p>
//           </div>

//           {/* Center Highlighted Service */}
//           <div className="service-card highlight">
//             <img src="/assets/images/pic2.png" alt="Best Flights" />
//             <h4>Best Flights Options</h4>
//             <p>sunt qui repellat saepe quo velit aperiam id aliquam placeat.</p>
//           </div>

//           {/* Service 3 */}
//           <div className="service-card">
//             <img src="/assets/images/pic3.png" alt="Religious Tours" />
//             <h4>Religious Tours</h4>
//             <p>sunt qui repellat saepe quo velit aperiam id aliquam placeat.</p>
//           </div>

//           {/* Service 4 */}
//           <div className="service-card">
//             <img src="/assets/images/pic4.png" alt="Medical Insurance" />
//             <h4>Medical Insurance</h4>
//             <p>sunt qui repellat saepe quo velit aperiam id aliquam placeat.</p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
// export default Services;

"use client";
import Image from "next/image";

const services = [
  {
    title: "Guided Tours",
    description: "Explore scenic locations with our expert guides.",
    image: "/assets/images/pic1.png",
  },
  {
    title: "Best Flight Options",
    description: "Get the most affordable and convenient flights.",
    image: "/assets/images/pic2.png",
  },
  {
    title: "Religious Tours",
    description: "Spiritual journeys curated for inner peace.",
    image: "/assets/images/pic3.png",
  },
  {
    title: "Medical Insurance",
    description: "Travel worry-free with our coverage plans.",
    image: "/assets/images/pic4.png",
  },
];

const Services = () => {
  return (
    <div className="bg-white py-20 px-4 md:px-16">
      <div className="text-center mb-12">
        <p className="text-sm uppercase text-gray-500 tracking-wide">
          Category
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          We Offer <span className="text-blue-600">Best Services</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 p-6 text-center"
          >
            <div className="w-full h-40 relative mb-4">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-contain"
              />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h4>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;

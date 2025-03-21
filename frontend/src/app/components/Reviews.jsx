import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import "../components/CSS/Reviews.css";

const testimonials = [
  {
    id: 1,
    image: "/assets/images/avatar.png",
    quote:
      "An unforgettable experience with Roam Pakistan! The guides were knowledgeable, and the tours showcased the best of Pakistan’s beauty. Highly recommended for anyone seeking adventure and culture!",
    name: "Fiza Ahmad",
  },
];

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="Reviews">
      <div className="testimonial-section">
        <h3 className="promotion-text">Promotion</h3>
        <h2 className="section-title">See What Our Clients Say About Us</h2>

        <div className="testimonial-container">
          <button onClick={prevTestimonial} className="arrow left-arrow">
            <FaChevronLeft />
          </button>

          <div className="testimonial-card">
            <img
              src={testimonials[activeIndex].image}
              alt="Client"
              className="client-photo"
            />
            <div className="testimonial-content">
              <p className="quote">
                <FaQuoteLeft className="fas fa-quote-left" />
                {testimonials[activeIndex].quote}
              </p>
              <h4 className="client-name">{testimonials[activeIndex].name}</h4>
            </div>
          </div>

          <button onClick={nextTestimonial} className="arrow right-arrow">
            <FaChevronRight />
          </button>
        </div>

        <div className="dots">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className="dot active"
              style={
                {
                  /*${index === activeIndex ? "bg-red-500" : "bg-gray-400"} */
                }
              }
              onClick={() => setActiveIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

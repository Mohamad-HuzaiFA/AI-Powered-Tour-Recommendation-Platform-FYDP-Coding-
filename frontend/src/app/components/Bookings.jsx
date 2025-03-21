import React from "react";
import "../components/CSS/Bookings.css";

const Bookings = () => {
  return (
    <div className="body">
      <section className="booking-section">
        {/* Left Side: Text Content */}
        <div className="text-content">
          <p className="category">Fast & Easy</p>
          <h2 className="title">
            Get Your Favourite <br /> <span>Resort Bookings</span>
          </h2>

          <div className="steps">
            {["Choose Destination", "Check Availability", "Let's Go"].map(
              (step, index) => (
                <div className="step" key={index}>
                  <img src={`/assets/images/icon${index + 1}.png`} alt={step} />
                  <div>
                    <h4>{step}</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Urna, tortor tempus.
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right Side: Booking Cards */}
        <div className="booking-cards">
          <img src="/assets/images/hawaii.png" alt="Trip to Hawaii" />
        </div>
      </section>
    </div>
  );
};

export default Bookings;

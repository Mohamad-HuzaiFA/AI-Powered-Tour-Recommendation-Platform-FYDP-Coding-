import React from "react";
import "../components/CSS/Trip.css";

const Trip = () => {
  return (
    <div className="body">
      <section className="adventure-section">
        {/* Left Side: Text Content */}
        <div className="text-content">
          <p className="category">ADVENTURE TRIPS</p>
          <h2 className="title">
            Our Thrilling <br /> <span>Adventure Expeditions</span>
          </h2>
          <p className="description">
            Embark on an adrenaline-fueled journey to some of the most
            exhilarating destinations. From mountain treks to wild safaris, our
            adventure tours offer the perfect blend of thrill, nature, and
            exploration. Get ready to challenge yourself and create memories
            that will last a lifetime!
          </p>
          <button className="btn">View Packages</button>
        </div>

        {/* Right Side: Styled Image */}
        <div className="image-container">
          <div className="arch-image">
            <img src="/assets/images/trip.png" alt="Adventure" />
          </div>
          <p className="image-label">Adventure Expeditions</p>
        </div>
      </section>
    </div>
  );
};

export default Trip;

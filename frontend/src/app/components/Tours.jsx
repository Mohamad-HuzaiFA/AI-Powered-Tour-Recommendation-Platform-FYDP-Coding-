import React from "react";
import "../components/CSS/Tours.css";

const Tours = () => {
  return (
    <section className="sightseeing-section">
      {/* Left Side: Text Content */}
      <div className="text-content">
        <p className="category">Promotion</p>
        <h2 className="title">
          We Provide You Best <br /> <span>Pakistan Sightseeing Tours</span>
        </h2>
        <p className="description">
          Et labore harum non nobis ipsum eum molestias mollitia et corporis
          praesentium a laudantium internos. Non quis eius quo eligendi corrupti
          et fugiat nulla qui soluta recusandae in maxime quasi aut ducimus
          illum aut optio quibusdam!
        </p>
        <button className="btn">View Packages</button>
      </div>

      {/* Right Side: Styled Image */}
      <div className="image-container">
        <div className="rounded-image">
          <img src="/assets/images/pakistan.jpg" alt="Minar-e-Pakistan" />
        </div>
        <p className="image-label">Breath Taking Views</p>
      </div>
    </section>
  );
};

export default Tours;

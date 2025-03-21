import "../components/CSS/promotion.css";

const Promotion = () => {
  return (
    <div className="bodyContent">
      <section className="tour-section">
        <div className="tour-content">
          <p className="promotion-text">PROMOTION</p>
          <h1>We Provide You Best Pakistan Sightseeing Tours</h1>
          <p>
            <strong>
              Discover Pakistan’s Beauty with Our Expertly Crafted Tours
            </strong>
          </p>
          <p>
            We offer unforgettable sightseeing experiences across Pakistan,
            showcasing breathtaking landscapes, rich culture, and hidden gems.
            Whether you’re seeking adventure or relaxation, our tours ensure
            comfort and unforgettable memories. Let us guide you through the
            best destinations Pakistan has to offer!
          </p>
          <a href="#" className="btn">
            View Packages
          </a>
        </div>
        <div className="tour-image">
          <img src="/assets/images/boat.jpg" alt="Pakistan Sightseeing" />
          <div className="circle-decor"></div>
        </div>
      </section>
    </div>
  );
};

export default Promotion;

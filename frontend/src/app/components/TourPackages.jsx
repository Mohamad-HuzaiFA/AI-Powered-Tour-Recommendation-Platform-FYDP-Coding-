import "../components/CSS/TourPackages.css";

const TourPackages = () => {
  const packages = [
    {
      image: "/assets/images/swat.jpg",
      alt: "Swat Valley",
      flag: "/assets/images/swiss.png",
      days: "8 Days",
      people: "25 People Going",
      name: "Swat Valley",
      location: "Europe",
      discountedPrice: "1,000 $",
      originalPrice: "1,200 $",
      description:
        "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi...",
    },
    {
      image: "/assets/images/Amazon.jpg",
      alt: "Amazon",
      flag: "/assets/images/brazil.png",
      days: "8 Days",
      people: "30 People Going",
      name: "Amazon",
      location: "Brazil",
      discountedPrice: "1,223 $",
      originalPrice: "1,200 $",
      description:
        "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi...",
    },
    {
      image: "/assets/images/giza.jpg",
      alt: "Giza",
      flag: "/assets/images/egypt.png",
      days: "8 Days",
      people: "155 People Going",
      name: "Giza",
      location: "Egypt",
      discountedPrice: "1,200 $",
      originalPrice: "1,200 $",
      description:
        "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi...",
    },
  ];

  return (
    <div className="container">
      <section className="tour-packages">
        <h2 className="section-title">
          <span className="trendy">TRENDY</span>
          <br />
          Our Trending Tour Packages
        </h2>
        <div className="packages-container">
          {packages.map((pkg, index) => (
            <div key={index} className="package-card">
              <img src={pkg.image} alt={pkg.alt} />
              <div className="package-info">
                <div className="location-badge">
                  <img src={pkg.flag} alt="flag" />
                </div>
                <p className="details">
                  <i className="fa fa-calendar"></i> {pkg.days} &nbsp;{" "}
                  <i className="fa fa-user"></i> {pkg.people}
                </p>
                <h3>{pkg.name}</h3>
                <p className="location">
                  <i className="fa fa-map-marker-alt"></i> {pkg.location}
                </p>
                <p className="price">
                  <span className="discounted">{pkg.discountedPrice}</span>
                  <span className="original">{pkg.originalPrice}</span>
                </p>
                <p className="description">{pkg.description}</p>
                <button className="explore-btn">Explore Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TourPackages;

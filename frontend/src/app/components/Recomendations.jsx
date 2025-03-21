import "../components/CSS/Recomendations.css";

const Recomendations = () => {
  return (
    <div className="explore-section">
      {/* Nature Section */}
      <div className="explore-box nature">
        <div className="overlay"></div>
        <div className="content">
          <p className="category">Promotion</p>
          <h2>Explore Nature</h2>
          <button className="btn">View Packages</button>
        </div>
      </div>

      {/* Cities Section */}
      <div className="explore-box cities">
        <div className="overlay"></div>
        <div className="content">
          <p className="category">Promotion</p>
          <h2>Explore Cities</h2>
          <button className="btn">View Packages</button>
        </div>
      </div>
    </div>
  );
};

export default Recomendations;

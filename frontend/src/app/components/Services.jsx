import "../components/CSS/Services.css";

function Services() {
  return (
    <div className="body">
      <section className="services">
        <h3 className="category">CATEGORY</h3>
        <h2 className="section-title">
          We Offer <span>Best Services</span>
        </h2>

        <div className="services-container">
          {/* Service 1 */}
          <div className="service-card">
            <img src="/assets/images/pic1.png" alt="Guided Tours" />
            <h4>Guided Tours</h4>
            <p>sunt qui repellat saepe quo velit aperiam id aliquam placeat.</p>
          </div>

          {/* Center Highlighted Service */}
          <div className="service-card highlight">
            <img src="/assets/images/pic2.png" alt="Best Flights" />
            <h4>Best Flights Options</h4>
            <p>sunt qui repellat saepe quo velit aperiam id aliquam placeat.</p>
          </div>

          {/* Service 3 */}
          <div className="service-card">
            <img src="/assets/images/pic3.png" alt="Religious Tours" />
            <h4>Religious Tours</h4>
            <p>sunt qui repellat saepe quo velit aperiam id aliquam placeat.</p>
          </div>

          {/* Service 4 */}
          <div className="service-card">
            <img src="/assets/images/pic4.png" alt="Medical Insurance" />
            <h4>Medical Insurance</h4>
            <p>sunt qui repellat saepe quo velit aperiam id aliquam placeat.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Services;

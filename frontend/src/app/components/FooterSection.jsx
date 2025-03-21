import "../components/CSS/FooterSection.css";

const FooterSection = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section company-info">
          <h2 className="logo">Travel</h2>
          <p>Travel helps companies manage payments easily.</p>
          <div className="social-icons">
            <a href="#">
              <img src="/assets/images/linkedin.svg" alt="LinkedIn" />
            </a>
            <a href="#">
              <img src="/assets/images/messenger.svg" alt="Messenger" />
            </a>
            <a href="#">
              <img src="/assets/images/twitter.svg" alt="Twitter" />
            </a>
            <a href="#">
              <img src="/assets/images/infinity.svg" alt="Infinity" />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
          </ul>
        </div>

        {/* Destinations */}
        <div className="footer-section">
          <h3>Destinations</h3>
          <ul>
            <li>
              <a href="#">Maldives</a>
            </li>
            <li>
              <a href="#">Los Angeles</a>
            </li>
            <li>
              <a href="#">Las Vegas</a>
            </li>
            <li>
              <a href="#">Toronto</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section newsletter">
          <h3>Join Our Newsletter</h3>
          <div className="newsletter-box">
            <input type="email" placeholder="Your email address" />
            <button>Subscribe</button>
          </div>
          <p>* Will send you weekly updates for your better tour packages.</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; TourHunting 2024. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default FooterSection;

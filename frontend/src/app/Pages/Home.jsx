import React from "react";
import "../components/CSS/Home.css";
import Services from "../components/Services";
import Agencies from "../components/Agencies";
import Trip from "../components/Trip";
import Bookings from "../components/Bookings";
import Tours from "../components/Tours";
import Recomendations from "../components/Recomendations";
import TourPackages from "../components/TourPackages";
import Reviews from "../components/Reviews";
import FooterSection from "../components/FooterSection";

function Home() {
  return (
    <>
      <header className="navbar">
        <div className="logo">Travel</div>
        <nav>
          <ul>
            <li>
              <a href="/" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="/Aboutus">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Upcoming Packages</a>
            </li>
          </ul>
        </nav>
        <button className="btn-contact">Get in Touch</button>
      </header>

      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>No matter where you’re going to, we’ll take you there</h1>
          <form className="search-bar">
            <input type="text" placeholder="Where to?" />
            <select>
              <option>Travel Type</option>
              <option>Adventure</option>
              <option>Relaxation</option>
            </select>
            <select>
              <option>Duration</option>
              <option>1-3 Days</option>
              <option>4-7 Days</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>

      <Agencies />
      <Services />
      <Trip />
      <Bookings />
      <img src="src/assets/images/holiday.png" alt="Holiday" />
      <Tours />
      <Recomendations />
      <TourPackages />
      <Reviews />
      <FooterSection />
    </>
  );
}

export default Home;

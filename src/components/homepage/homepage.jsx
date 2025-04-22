import React from "react";
import "./homepage.css";

// HomePage component - serves as the landing page for the online book store
const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Header section with title and subtitle */}
      <header className="homepage-header">
        <h1>Welcome to Get Your Book</h1>
        <p>Your favorite books, just a click away.</p>
      </header>

      {/* Promotional image or hero section */}
      <section className="homepage-hero">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
          alt="Bookshelf"
          className="hero-image"
        />
      </section>

      {/* Features section - what users can do */}
      <section className="homepage-features">
        <h2>Explore, Read, and Buy</h2>
        <ul>
          <li>Browse thousands of books from all genres</li>
          <li>Read reviews from other readers</li>
          <li>Secure and fast checkout</li>
        </ul>
      </section>

      {/* Call-to-action button */}
      <section className="homepage-cta">
        <button className="shop-now-button">Shop Now</button>
      </section>
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroSlider.css';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Accredited ISO Certification Services",
      subtitle: "Your Partner in Quality Excellence",
      description: "Trusted certification body recognized by national and international accreditation organizations",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80",
      ctaText: "Get Free Quote",
      ctaLink: "/contact"
    },
    {
      id: 2,
      title: "EGAC Accredited Organization",
      subtitle: "Internationally Recognized Certifications",
      description: "Delivering excellence in quality management, environmental, and safety certifications",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80",
      ctaText: "View Our Services",
      ctaLink: "/services"
    },
    {
      id: 3,
      title: "Trusted by Leading Companies",
      subtitle: "500+ Certified Organizations",
      description: "Join hundreds of satisfied clients who have achieved international standards",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80",
      ctaText: "See Our Clients",
      ctaLink: "/clients"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slide-overlay"></div>
          <div className="slide-content">
            <div className="container">
              <h1 className="slide-title">{slide.title}</h1>
              <h2 className="slide-subtitle">{slide.subtitle}</h2>
              <p className="slide-description">{slide.description}</p>
              <Link to={slide.ctaLink} className="btn btn-primary slide-cta">
                {slide.ctaText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button className="slider-nav prev" onClick={prevSlide} aria-label="Previous slide">
        &#8249;
      </button>
      <button className="slider-nav next" onClick={nextSlide} aria-label="Next slide">
        &#8250;
      </button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;


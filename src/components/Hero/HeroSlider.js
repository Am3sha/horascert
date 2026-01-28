import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './HeroSlider.css';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  const slides = useMemo(
    () => [
      {
        id: 1,
        badge: "EGAC Accredited",
        title: "International ISO Certification",
        subtitle: "Excellence in Quality Systems",
        description:
          "HORAS Cert is your trusted partner for internationally recognized ISO certification services, accredited by the Egyptian Accreditation Council (EGAC) and recognized through IAF MLA.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&q=75&fm=webp",
        ctaPrimary: { text: "Get Started", link: "/application" },
        ctaSecondary: { text: "Our Services", link: "/services" }
      },
      {
        id: 2,
        badge: "Trusted Worldwide",
        title: "Quality Management Systems",
        subtitle: "ISO 9001 | ISO 14001 | ISO 45001",
        description:
          "Comprehensive certification services for quality, environmental, and occupational health & safety management systems to help your organization achieve global recognition.",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1280&q=75&fm=webp",
        ctaPrimary: { text: "Apply Now", link: "/application" },
        ctaSecondary: { text: "View Standards", link: "/services" }
      },
      {
        id: 3,
        badge: "500+ Organizations Certified",
        title: "Your Success Is Our Mission",
        subtitle: "Building Trust Through Certification",
        description:
          "Join hundreds of successful organizations across Egypt, Saudi Arabia, and UAE who have achieved international standards with HORAS Cert certification.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1280&q=75&fm=webp",
        ctaPrimary: { text: "Contact Us", link: "/contact" },
        ctaSecondary: { text: "Our Clients", link: "/clients" }
      }
    ],
    []
  );

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsHydrated(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const preloadNonCriticalSlides = () => {
      for (const slide of slides.slice(1)) {
        const img = new Image();
        img.decoding = 'async';
        img.src = slide.image;
      }
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(preloadNonCriticalSlides, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(preloadNonCriticalSlides, 2000);
    return () => clearTimeout(timeoutId);
  }, [slides]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

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

  const activeSlide = slides[currentSlide];

  return (
    <section className={`hero-slider ${isHydrated ? 'is-hydrated' : ''}`}>
      <div className="slide active">
        <img
          key={activeSlide.id}
          className="slide-image"
          src={activeSlide.image}
          alt=""
          aria-hidden="true"
          decoding="async"
          loading={currentSlide === 0 ? 'eager' : 'lazy'}
          fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
          width="1280"
          height="720"
          sizes="100vw"
          draggable="false"
        />
        <div className="slide-overlay"></div>
        <div className="slide-content">
          <div className="container">
            <div className="hero-content-wrapper">
              <span className="hero-badge">{activeSlide.badge}</span>
              <h1 className="slide-title">{activeSlide.title}</h1>
              <h2 className="slide-subtitle">{activeSlide.subtitle}</h2>
              <p className="slide-description">{activeSlide.description}</p>
              <div className="hero-cta-group">
                <Link to={activeSlide.ctaPrimary.link} className="btn btn-primary slide-cta">
                  {activeSlide.ctaPrimary.text}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link to={activeSlide.ctaSecondary.link} className="btn btn-white slide-cta-secondary">
                  {activeSlide.ctaSecondary.text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="slider-nav prev" onClick={prevSlide} aria-label="Previous slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button className="slider-nav next" onClick={nextSlide} aria-label="Next slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
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

      <div className="hero-stats">
        <div className="stat-item">
          <span className="stat-number">500+</span>
          <span className="stat-label">Certified Organizations</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">15+</span>
          <span className="stat-label">Years Experience</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">6</span>
          <span className="stat-label">ISO Standards</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">3</span>
          <span className="stat-label">Countries</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const dropdownMenus = {
    'to-apply': {
      title: 'To apply...',
      items: [
        { text: 'Application Form', link: '/application' },
        { text: 'Required Documents', link: '/application#documents' },
        { text: 'Certification Process', link: '/#certification-process' },
        { text: 'Get a Quote', link: '/contact' }
      ]
    },
    'mission': {
      title: 'MISSION',
      items: [
        { text: 'Our Vision', link: '/#vision' },
        { text: 'Our Mission', link: '/#mission' },
        { text: 'Quality Policy', link: '/about#quality-policy' },
        { text: 'Why Choose Us', link: '/about#why-choose-us' }
      ]
    },
    'standards': {
      title: 'Horas Accredited Standards and Scopes from EGAC',
      items: [
        { text: 'ISO 9001:2015 - Quality Management', link: '/services/iso-9001' },
        { text: 'ISO 14001:2015 - Environmental Management', link: '/services/iso-14001' },
        { text: 'ISO 45001:2018 - Occupational Health & Safety', link: '/services/iso-45001' },
        { text: 'ISO 22000:2018 - Food Safety Management', link: '/services/iso-22000' },
        { text: 'HACCP - Food Safety System', link: '/services/haccp' },
        { text: 'GMP - Good Manufacturing Practice', link: '/services/gmp' }
      ]
    },
    'geographical': {
      title: 'Geographical Areas in which the CB Operates',
      items: [
        { text: 'Egypt', link: '/#geographical-coverage' },
        { text: 'Saudi Arabia', link: '/#geographical-coverage' },
        { text: 'United Arab Emirates', link: '/#geographical-coverage' },
        { text: 'Expanding Countries', link: '/#geographical-coverage' }
      ]
    },
    'certification-process': {
      title: 'Certification Process',
      items: [
        { text: 'Step 1: Application', link: '/#certification-process' },
        { text: 'Step 2: Document Review', link: '/#certification-process' },
        { text: 'Step 3: On-site Audit', link: '/#certification-process' },
        { text: 'Step 4: Certification Decision', link: '/#certification-process' },
        { text: 'Step 5: Surveillance Audits', link: '/#certification-process' }
      ]
    }
  };

  return (
    <>
      <TopBar />
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="logo">
              <div className="logo-text">
                <h2>HORAS-Cert</h2>
                <p>Organization for Quality Systems and Certifications</p>
              </div>
            </Link>
            
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
              <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
              
              {Object.entries(dropdownMenus).map(([key, menu]) => (
                <li 
                  key={key}
                  className="dropdown-container"
                  onMouseEnter={() => !isMobileMenuOpen && setActiveDropdown(key)}
                  onMouseLeave={() => !isMobileMenuOpen && setActiveDropdown(null)}
                >
                  <button
                    className={`dropdown-trigger ${activeDropdown === key ? 'active' : ''}`}
                    onClick={() => handleDropdownToggle(key)}
                  >
                    {menu.title}
                    <span className="dropdown-arrow">▼</span>
                  </button>
                  <ul className={`dropdown-menu ${activeDropdown === key ? 'active' : ''}`}>
                    {menu.items.map((item, index) => (
                      <li key={index}>
                        <Link to={item.link} onClick={() => setIsMobileMenuOpen(false)}>
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              
              <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


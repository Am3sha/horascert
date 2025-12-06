import React from 'react';
import ContactForm from '../components/ContactForm/ContactForm';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with us for inquiries, quotes, or support</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>
                We're here to help! Whether you have questions about our certification services, 
                need a quote, or want to discuss your specific requirements, our team is ready to assist you.
              </p>

              <div className="contact-cards">
                <div className="contact-card">
                  <div className="contact-icon">📞</div>
                  <h3>Phone</h3>
                  <p>+20 123 456 7890</p>
                  <p>+20 123 456 7891</p>
                  <p>+20 123 456 7892</p>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">✉️</div>
                  <h3>Email</h3>
                  <p>info@yourcompany.com</p>
                  <p>support@yourcompany.com</p>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">📍</div>
                  <h3>Address</h3>
                  <p>[Your Address]</p>
                  <p>Cairo, Egypt</p>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">🕐</div>
                  <h3>Working Hours</h3>
                  <p>Saturday - Thursday</p>
                  <p>9:00 AM - 5:00 PM</p>
                </div>
              </div>

              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  <a href="#" aria-label="Facebook">Facebook</a>
                  <a href="#" aria-label="LinkedIn">LinkedIn</a>
                  <a href="#" aria-label="Twitter">Twitter</a>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;


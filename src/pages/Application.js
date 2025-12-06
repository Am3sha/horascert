import React, { useState } from 'react';
import './Application.css';

const Application = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    industry: '',
    companySize: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactPosition: '',
    standards: [],
    numberOfEmployees: '',
    numberOfLocations: '',
    currentCertifications: '',
    preferredAuditDate: '',
    additionalInfo: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const standardsList = [
    'ISO 9001:2015 - Quality Management',
    'ISO 14001:2015 - Environmental Management',
    'ISO 45001:2018 - Occupational Health & Safety',
    'ISO 22000:2018 - Food Safety Management',
    'HACCP - Food Safety System',
    'GMP - Good Manufacturing Practice'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const standards = [...formData.standards];
      if (checked) {
        standards.push(value);
      } else {
        const index = standards.indexOf(value);
        if (index > -1) {
          standards.splice(index, 1);
        }
      }
      setFormData(prev => ({ ...prev, standards }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.companyAddress.trim()) newErrors.companyAddress = 'Company address is required';
    if (!formData.industry.trim()) newErrors.industry = 'Industry is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email';
    }
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Phone is required';
    if (formData.standards.length === 0) newErrors.standards = 'Please select at least one standard';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        companyName: '',
        companyAddress: '',
        industry: '',
        companySize: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        contactPosition: '',
        standards: [],
        numberOfEmployees: '',
        numberOfLocations: '',
        currentCertifications: '',
        preferredAuditDate: '',
        additionalInfo: ''
      });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  return (
    <div className="application-page">
      <div className="page-header">
        <div className="container">
          <h1>Certification Application</h1>
          <p>Apply for ISO certification services. Fill out the form below and our team will contact you.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <form className="application-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Company Information</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="companyName">Company Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={errors.companyName ? 'error' : ''}
                    placeholder="Enter company name"
                  />
                  {errors.companyName && <span className="error-message">{errors.companyName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="industry">Industry <span className="required">*</span></label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className={errors.industry ? 'error' : ''}
                    placeholder="e.g., Manufacturing, Food & Beverage"
                  />
                  {errors.industry && <span className="error-message">{errors.industry}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="companyAddress">Company Address <span className="required">*</span></label>
                <textarea
                  id="companyAddress"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  className={errors.companyAddress ? 'error' : ''}
                  rows="3"
                  placeholder="Enter full company address"
                ></textarea>
                {errors.companyAddress && <span className="error-message">{errors.companyAddress}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="companySize">Company Size</label>
                  <select
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                  >
                    <option value="">Select size</option>
                    <option value="small">Small (1-50 employees)</option>
                    <option value="medium">Medium (51-250 employees)</option>
                    <option value="large">Large (251-1000 employees)</option>
                    <option value="enterprise">Enterprise (1000+ employees)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="numberOfEmployees">Number of Employees</label>
                  <input
                    type="number"
                    id="numberOfEmployees"
                    name="numberOfEmployees"
                    value={formData.numberOfEmployees}
                    onChange={handleChange}
                    placeholder="Enter number of employees"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="numberOfLocations">Number of Locations/Sites</label>
                <input
                  type="number"
                  id="numberOfLocations"
                  name="numberOfLocations"
                  value={formData.numberOfLocations}
                  onChange={handleChange}
                  placeholder="Enter number of locations"
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Contact Person</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactName">Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className={errors.contactName ? 'error' : ''}
                    placeholder="Full name"
                  />
                  {errors.contactName && <span className="error-message">{errors.contactName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contactPosition">Position</label>
                  <input
                    type="text"
                    id="contactPosition"
                    name="contactPosition"
                    value={formData.contactPosition}
                    onChange={handleChange}
                    placeholder="e.g., Quality Manager"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className={errors.contactEmail ? 'error' : ''}
                    placeholder="your.email@company.com"
                  />
                  {errors.contactEmail && <span className="error-message">{errors.contactEmail}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contactPhone">Phone <span className="required">*</span></label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className={errors.contactPhone ? 'error' : ''}
                    placeholder="+20 XXX XXX XXXX"
                  />
                  {errors.contactPhone && <span className="error-message">{errors.contactPhone}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Certification Details</h2>
              
              <div className="form-group">
                <label>Standard(s) Requested <span className="required">*</span></label>
                <div className="standards-checkboxes">
                  {standardsList.map((standard, index) => (
                    <label key={index} className="checkbox-label">
                      <input
                        type="checkbox"
                        name="standards"
                        value={standard}
                        checked={formData.standards.includes(standard)}
                        onChange={handleChange}
                      />
                      <span>{standard}</span>
                    </label>
                  ))}
                </div>
                {errors.standards && <span className="error-message">{errors.standards}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="currentCertifications">Current Certifications (if any)</label>
                  <input
                    type="text"
                    id="currentCertifications"
                    name="currentCertifications"
                    value={formData.currentCertifications}
                    onChange={handleChange}
                    placeholder="List any existing certifications"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preferredAuditDate">Preferred Audit Date</label>
                  <input
                    type="date"
                    id="preferredAuditDate"
                    name="preferredAuditDate"
                    value={formData.preferredAuditDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="additionalInfo">Additional Information</label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Any additional information or special requirements..."
                ></textarea>
              </div>
            </div>

            {submitStatus === 'success' && (
              <div className="success-message">
                ✓ Thank you! Your application has been submitted successfully. We'll contact you within 24 hours.
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Application;


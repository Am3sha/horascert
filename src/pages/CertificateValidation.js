import React, { useState } from 'react';
import './CertificateValidation.css';

const CertificateValidation = () => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!certificateNumber.trim()) {
      setValidationResult({
        valid: false,
        message: 'Please enter a certificate number'
      });
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    // Simulate API call
    setTimeout(() => {
      setIsValidating(false);
      // Mock validation - in real app, this would call your backend API
      const mockResult = {
        valid: certificateNumber.length >= 8,
        certificateNumber: certificateNumber,
        companyName: 'Sample Company Name',
        standard: 'ISO 9001:2015',
        issueDate: '2023-01-15',
        expiryDate: '2026-01-14',
        status: 'Active'
      };
      setValidationResult(mockResult);
    }, 1500);
  };

  return (
    <div className="certificate-validation-page">
      <div className="page-header">
        <div className="container">
          <h1>Certificate Validation</h1>
          <p>Verify the authenticity of an ISO certificate issued by QualityCert</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="validation-container">
            <div className="validation-form-card">
              <h2>Enter Certificate Number</h2>
              <p className="form-description">
                Please enter the certificate number found on your ISO certificate to verify its authenticity.
              </p>
              
              <form onSubmit={handleSubmit} className="validation-form">
                <div className="form-group">
                  <label htmlFor="certificateNumber">Certificate Number <span className="required">*</span></label>
                  <input
                    type="text"
                    id="certificateNumber"
                    value={certificateNumber}
                    onChange={(e) => setCertificateNumber(e.target.value)}
                    placeholder="Enter certificate number (e.g., QC-2023-001234)"
                    className="certificate-input"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary validate-btn"
                  disabled={isValidating}
                >
                  {isValidating ? 'Validating...' : 'Validate Certificate'}
                </button>
              </form>

              {validationResult && (
                <div className={`validation-result ${validationResult.valid ? 'valid' : 'invalid'}`}>
                  {validationResult.valid ? (
                    <>
                      <div className="result-icon">✓</div>
                      <h3>Certificate Valid</h3>
                      <div className="certificate-details">
                        <div className="detail-row">
                          <span className="detail-label">Certificate Number:</span>
                          <span className="detail-value">{validationResult.certificateNumber}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Company Name:</span>
                          <span className="detail-value">{validationResult.companyName}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Standard:</span>
                          <span className="detail-value">{validationResult.standard}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Issue Date:</span>
                          <span className="detail-value">{validationResult.issueDate}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Expiry Date:</span>
                          <span className="detail-value">{validationResult.expiryDate}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Status:</span>
                          <span className="detail-value status-active">{validationResult.status}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="result-icon invalid-icon">✗</div>
                      <h3>Certificate Not Found</h3>
                      <p>{validationResult.message || 'The certificate number you entered could not be found in our database. Please verify the number and try again.'}</p>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="validation-info">
              <h3>About Certificate Validation</h3>
              <ul>
                <li>Verify the authenticity of ISO certificates issued by QualityCert</li>
                <li>Check certificate status and validity dates</li>
                <li>Confirm company details and certified standards</li>
                <li>Ensure compliance and credibility</li>
              </ul>
              <div className="info-note">
                <strong>Note:</strong> This validation system is for certificates issued by QualityCert only. 
                For certificates from other certification bodies, please contact the issuing organization.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificateValidation;


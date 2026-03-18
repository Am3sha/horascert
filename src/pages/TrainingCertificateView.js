import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { verifyTrainingCertificate } from '../services/api';
import './TrainingCertificateView.css';

function TrainingCertificateView() {
  const { qrCode } = useParams();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    fetchCertificate();
  }, [qrCode]);

  const fetchCertificate = async () => {
    try {
      const res = await verifyTrainingCertificate(qrCode);
      if (res.verified) {
        setCert(res.data);
        setVerified(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="training-cert-loading">
        <div className="spinner"></div>
        <p>Verifying certificate...</p>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="training-cert-error">
        <h2>Certificate Not Found</h2>
        <p>The certificate you're looking for doesn't exist or has been revoked.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isExpired = new Date() > new Date(cert.expiryDate);

  return (
    <div className="training-cert-view-page">
      <div className="training-cert-card">
        {/* Top gradient bar */}
        <div className="training-cert-top-bar"></div>

        {/* Logo */}
        <div className="training-cert-logo">
          <img src="/imgeteam/LOGO.jpeg" alt="HORAS-Cert" />
        </div>

        {/* Status badge */}
        <div className="training-cert-status">
          <span className={`training-cert-badge ${isExpired ? 'expired' : cert.status}`}>
            {isExpired ? 'Expired' : cert.status}
          </span>
        </div>

        {/* Main content */}
        <div className="training-cert-content">
          {/* Title */}
          <div className="training-cert-title">
            <h1>CERTIFICATE OF</h1>
            <div className="training-cert-subtitle">REGISTRATION</div>
          </div>

          {/* Certify text */}
          <div className="training-cert-certify">
            HORAS Cert hereby certify that
          </div>

          {/* Trainee name (BIG RED) */}
          <div className="training-cert-trainee-name">
            {cert.traineeName}
          </div>

          {/* Organization (BLUE) */}
          <div className="training-cert-organization">
            {cert.organization}
          </div>

          {/* Address */}
          <div className="training-cert-address">
            {cert.address || 'Egypt'}
          </div>

          {/* Completion text */}
          <div className="training-cert-completion">
            Has Successfully completed the
          </div>

          {/* Course name (BLUE) */}
          <div className="training-cert-course">
            {cert.courseName}
          </div>

          {/* Date & Hours */}
          <div className="training-cert-date-hours">
            {formatDate(cert.trainingDate)} - {cert.hours} Training Hours
          </div>

          {/* Certificate details + QR */}
          <div className="training-cert-details">
            <div className="training-cert-info">
              <div className="training-cert-info-row">
                <div className="training-cert-info-label">
                  Certificate Number:
                </div>
                <div className="training-cert-info-value">
                  {cert.certificateNumber}
                </div>
              </div>
              <div className="training-cert-info-row">
                <div className="training-cert-info-label">
                  Original Issued Date
                </div>
                <div className="training-cert-info-value">
                  {formatDate(cert.issueDate)}
                </div>
              </div>
              <div className="training-cert-info-row">
                <div className="training-cert-info-label">
                  Issue Date
                </div>
                <div className="training-cert-info-value">
                  {formatDate(cert.issueDate)}
                </div>
              </div>
              <div className="training-cert-info-row">
                <div className="training-cert-info-label">
                  Validity Date
                </div>
                <div className="training-cert-info-value">
                  {formatDate(cert.expiryDate)}
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="training-cert-qr">
              {cert.qrCodeImage ? (
                <img
                  src={cert.qrCodeImage}
                  alt="QR Code"
                  onLoad={() => { }}
                  onError={(e) => {
                    console.error('QR Code failed to load');
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className="qr-error"
                style={{ display: cert.qrCodeImage ? 'none' : 'flex' }}
              >
                QR Code unavailable
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="training-cert-signatures">
            {/* Managing Director */}
            <div className="training-cert-signature">
              <div className="training-cert-sig-title">Managing Director</div>
              <div className="training-cert-sig-name">Waleed Amasha</div>
              {/* Signature image or placeholder */}
              <div className="training-cert-sig-placeholder">
                Waleed M.Amasha
              </div>
            </div>

            {/* Trainer */}
            <div className="training-cert-signature">
              <div className="training-cert-sig-title">Trainer</div>
              <div className="training-cert-sig-name">
                {cert.trainer || 'Tarik Moussa'}
              </div>
              <div className="training-cert-sig-placeholder">
                {cert.trainer || 'Tarik Moussa'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainingCertificateView;

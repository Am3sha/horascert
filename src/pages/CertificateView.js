import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCertificateById } from '../services/api';
import './CertificateView.css';
const CertificateView = () => {
    const { certificateId } = useParams();
    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadCertificate = async () => {
            try {
                const response = await fetchCertificateById(certificateId);
                if (response.success && response.data) {
                    setCertificate(response.data);
                } else {
                    setError('Certificate not found');
                }
            } catch (err) {
                setError('Failed to load certificate');
            } finally {
                setLoading(false);
            }
        };
        loadCertificate();
    }, [certificateId]);

    if (loading) {
        return (
            <div className="certificate-view-page">
                <p className="loading">Loading certificate...</p>
            </div>
        );
    }
    if (error || !certificate) {
        return (
            <div className="certificate-view-page">
                <p className="error">{error || 'Certificate not found'}</p>
            </div>
        );
    }
    const formatDate = (date) => {
        if (!date) return 'Not specified';
        const parsed = new Date(date);
        if (Number.isNaN(parsed.getTime())) return 'Not specified';
        return parsed.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const isActiveStatus = (status) => {
        const s = String(status || '').trim().toLowerCase();
        return s === 'active' || s === 'approved';
    };
    const companyAddress = certificate.companyAddress?.fullAddress ||
        `${certificate.companyAddress?.street || ''}, ${certificate.companyAddress?.city || ''}, ${certificate.companyAddress?.country || ''}`;
    return (
        <div className="certificate-view-page">
            <div className="certificate-container">
                <div className="certificate-content">
                    {/* Status Section */}
                    <div className="section status-section">
                        <p className="status-title">Status: <span className="status-active">{certificate.status || 'Active'}</span></p>
                        <p className="status-description">
                            {certificate.statusDescription ||
                                'This certification is active and valid, meeting all current standards set by the certifying body.'}
                        </p>
                    </div>
                    <div className="certificate-header">
                        <div className="certificate-header-left">
                            <img
                                src="/imgeteam/LOGO.webp"
                                alt="HORAS-Cert Logo"
                                className="certificate-company-logo"
                            />
                        </div>
                        <div className="certificate-header-center">
                            <h1 className="certificate-title">CONFIRMATION OF CERTIFICATE</h1>
                            <p className="certificate-subtitle">The Certification Body of HORAS-CERT</p>
                        </div>
                        <div className="certificate-header-right" />
                    </div>
                    {/* Confirmation Section */}
                    <div className="section certified-section">
                        <div className="certified-text">
                            <h2>CERTIFIED ORGANIZATION</h2>
                            <p className="certified-company-name">{certificate.companyName}</p>
                            <p className="certified-company-address">{companyAddress}</p>
                        </div>
                    </div>
                    {/* Certification Details */}
                    <div className="section">
                        <h2>CERTIFICATION DETAILS</h2>
                        <div className="details-row">
                            <span className="details-label">Standard</span>
                            <span className="details-value">{certificate.standard || 'ISO Management System'}</span>
                        </div>
                        <div className="details-row">
                            <span className="details-label">System</span>
                            <span className="details-value">{certificate.standardDescription || 'Management System'}</span>
                        </div>
                        <div className="details-row">
                            <span className="details-label">Status</span>
                            <span className={`status-badge ${isActiveStatus(certificate.status) ? 'status-badge-active' : 'status-badge-inactive'}`}>{certificate.status || 'Active'}</span>
                        </div>
                    </div>
                    {/* Certificate Information */}
                    <div className="section">
                        <h2>CERTIFICATE INFORMATION</h2>
                        <div className="certificate-info-grid">
                            <div className="certificate-info-item">
                                <span className="certificate-info-label"> Certificate Number</span>
                                <span className="certificate-info-value">{certificate.certificateNumber}</span>
                            </div>
                            <div className="certificate-info-item">
                                <span className="certificate-info-label"> Country / Economy</span>
                                <span className="certificate-info-value">{certificate.companyAddress?.country || 'Not specified'}</span>
                            </div>
                            <div className="certificate-info-item">
                                <span className="certificate-info-label"> Certification Type</span>
                                <span className="certificate-info-value">{certificate.type || 'Management System'}</span>
                            </div>
                            <div className="certificate-info-item">
                                <span className="certificate-info-label"> Last Updated At</span>
                                <span className="certificate-info-value">{formatDate(certificate.updatedAt || certificate.issueDate)}</span>
                            </div>
                        </div>
                    </div>
                    {/* Scope of Registration removed per request */}
                    {/* Sites Table */}
                    <div className="section">
                        <h2>SITES ({certificate.sites ? certificate.sites.length : 1})</h2>
                        <table className="certificate-table">
                            <thead>
                                <tr>
                                    <th>Site Type</th>
                                    <th>Site Location</th>
                                    <th>Certified Entity</th>
                                    <th>Site Scope</th>
                                </tr>
                            </thead>
                            <tbody>

                                {(certificate.sites || []).length > 0 ? (
                                    (certificate.sites || []).map((site, idx) => (
                                        <tr key={idx}>
                                            <td>{site.type || 'Main Site'}</td>
                                            <td>{site.location || companyAddress}</td>
                                            <td>{site.entity || certificate.companyName}</td>
                                            <td>{site.scope || certificate.scope || 'General'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td>Main Site</td>
                                        <td>{companyAddress}</td>
                                        <td>{certificate.companyName}</td>
                                        <td>{certificate.scope || 'General'}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CertificateView;
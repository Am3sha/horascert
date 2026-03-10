import React, { useState } from 'react';
import { verifyTrainingCertificate } from '../services/api';
import PageHero from '../components/PageHero/PageHero';
import './CertificationValidation.css';

const TrainingValidation = () => {
    const [certificateNumber, setCertificateNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const breadcrumb = [
        { path: '/', label: 'Services' },
        { path: '/training-validation', label: 'Training Certificate Validation', isCurrent: true }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedNumber = certificateNumber.trim();
        if (!trimmedNumber) {
            setError('Please enter a certificate number');
            return;
        }

        if (trimmedNumber.length < 3 || trimmedNumber.length > 20) {
            setError('Certificate number must be between 3 and 20 characters.');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await verifyTrainingCertificate(trimmedNumber);
            if (!res || !res.verified || !res.data) {
                setError('Training certificate not found.');
                return;
            }

            const cert = res.data;
            const isExpired = new Date() > new Date(cert.expiryDate);

            setResult({
                traineeName: cert.traineeName || '',
                organization: cert.organization || '',
                certificateNumber: cert.certificateNumber || trimmedNumber,
                courseName: cert.courseName || '',
                hours: cert.hours || 0,
                trainingDate: cert.trainingDate || '',
                issueDate: cert.issueDate || '',
                expiryDate: cert.expiryDate || '',
                status: cert.status || 'active',
                isExpired: isExpired
            });
        } catch (err) {
            setError('Training certificate not found.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setCertificateNumber('');
        setResult(null);
        setError('');
        setLoading(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '—';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="certification-validation-page">
            <PageHero
                title="Training Certificate Validation"
                subtitle="Verify the authenticity of a training certificate issued by HORAS CERT"
                breadcrumb={breadcrumb}
            />

            <section className="section">
                <div className="container">
                    <div className="validation-container">
                        <div className="validation-card">
                            <form onSubmit={handleSubmit} className="validation-form">
                                <div className="form-group">
                                    <label htmlFor="certificateNumber">Certificate Number</label>
                                    <input
                                        type="text"
                                        id="certificateNumber"
                                        value={certificateNumber}
                                        onChange={(e) => {
                                            setCertificateNumber(e.target.value);
                                        }}
                                        placeholder="e.g., TRAIN-001 or HOR-TR-2025-09"
                                        className="form-input"
                                        disabled={loading}
                                        required
                                        minLength={3}
                                        maxLength={20}
                                    />
                                </div>

                                <div className="form-buttons">
                                    <button
                                        type="submit"
                                        className="btn btn-primary validate-btn"
                                        disabled={loading || certificateNumber.trim().length < 3}
                                    >
                                        {loading ? 'Validating certificate...' : 'Validate Certificate'}
                                    </button>

                                    {certificateNumber && (
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="btn btn-secondary reset-btn"
                                            disabled={loading}
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        {error && (
                            <div className="validation-result error">
                                <div className="result-icon">✕</div>
                                <h3>Certificate Not Found</h3>
                                <p>{error}</p>
                            </div>
                        )}

                        {result && (
                            <div className="validation-result success">
                                <div className="result-icon">✔</div>
                                <h3>Certificate Validated {result.isExpired ? '(Expired)' : ''}</h3>
                                <div className="certificate-info">
                                    <div className="info-row">
                                        <span className="info-label">Trainee Name:</span>
                                        <span className="info-value">{result.traineeName}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Organization:</span>
                                        <span className="info-value">{result.organization}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Certificate Number:</span>
                                        <span className="info-value">{result.certificateNumber}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Training Course:</span>
                                        <span className="info-value">{result.courseName}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Training Hours:</span>
                                        <span className="info-value">{result.hours}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Training Date:</span>
                                        <span className="info-value">{formatDate(result.trainingDate)}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Issue Date:</span>
                                        <span className="info-value">{formatDate(result.issueDate)}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Expiry Date:</span>
                                        <span className="info-value">{formatDate(result.expiryDate)}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Status:</span>
                                        <span className={`info-value status ${result.isExpired ? 'expired' : result.status}`}>
                                            {result.isExpired ? '🔴 Expired' : result.status === 'active' ? '🟢 Active' : '🟡 ' + result.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TrainingValidation;

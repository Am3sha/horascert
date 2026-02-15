import React, { useState } from 'react';
import { fetchCertificateByNumber } from '../services/api';
import PageHero from '../components/PageHero/PageHero';
import './CertificationValidation.css';

const CertificationValidation = () => {
    const [certificateNumber, setCertificateNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const breadcrumb = [
        { path: '/', label: 'Services' },
        { path: '/certification-validation', label: 'Certification Validation', isCurrent: true }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedNumber = certificateNumber.trim();
        if (!trimmedNumber) {
            setError('Please enter a certificate number');
            return;
        }

        if (trimmedNumber.length < 3 || trimmedNumber.length > 16) {
            setError('Certificate number must be between 3 and 16 characters.');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetchCertificateByNumber(trimmedNumber);
            if (!res || !res.success || !res.data) {
                setError('Certificate not found.');
                return;
            }

            const cert = res.data;
            const systemValue = (cert && (cert.system || cert.standardDescription)) || '';

            setResult({
                companyName: cert.companyName || '',
                certificateNumber: cert.certificateNumber || trimmedNumber,
                standard: cert.standard || '',
                system: systemValue,
                status: cert.status || ''
            });
        } catch (err) {
            setError('Certificate not found.');
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

    return (
        <div className="certification-validation-page">
            <PageHero
                title="Certification Validation"
                subtitle="Verify the authenticity of a certificate issued by HORAS CERT"
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
                                            const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                                            setCertificateNumber(value);
                                        }}
                                        placeholder="HOR09152025112"
                                        className="form-input"
                                        disabled={loading}
                                        required
                                        minLength={3}
                                        maxLength={16}
                                        pattern="[A-Z0-9]{3,16}"
                                        title="Use only letters and numbers (3 to 16 characters)."
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
                                <h3>Certificate Validated</h3>
                                <div className="certificate-info">
                                    <div className="info-row">
                                        <span className="info-label">Company Name:</span>
                                        <span className="info-value">{result.companyName}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Certificate Number:</span>
                                        <span className="info-value">{result.certificateNumber}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Standard:</span>
                                        <span className="info-value">{result.standard}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">System:</span>
                                        <span className="info-value">{result.system ? result.system : '—'}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Status:</span>
                                        <span className={`info-value status ${result.status}`}>
                                            {result.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
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

export default CertificationValidation;

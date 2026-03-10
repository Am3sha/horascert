import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { verifyTrainingCertificate } from '../services/api';
// REUSE Certificates CSS
import './CertificateView.css';

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
            if (res && res.verified) {
                setCert(res.data);
                setVerified(true);
            }
        } catch (error) {
            // Error handling - certificate verification failed
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="certificate-view-page">
            <p className="loading">Verifying Training Certificate...</p>
        </div>
    );
    if (!verified || !cert) return (
        <div className="certificate-view-page">
            <p className="error">Training Certificate not found or invalid</p>
        </div>
    );

    const isExpired = new Date() > new Date(cert.expiryDate);

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '60px 20px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                {/* Header Badge */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        background: '#10b981',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        letterSpacing: 0.5
                    }}>
                        <span style={{ fontSize: 18 }}>✓</span>
                        VERIFIED CERTIFICATE
                    </div>
                </div>

                {/* Main Certificate Card */}
                <div style={{
                    background: 'white',
                    borderRadius: 12,
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                    overflow: 'hidden'
                }}>
                    {/* Header Section */}
                    <div style={{
                        background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
                        color: 'white',
                        padding: 40,
                        textAlign: 'center'
                    }}>
                        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 300, letterSpacing: 2 }}>TRAINING CERTIFICATE</h1>
                        <div style={{ marginTop: 20, fontSize: 28, fontWeight: 700, letterSpacing: 1 }}>
                            {cert.certificateNumber}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div style={{ padding: 50 }}>
                        {/* Trainee Info */}
                        <div style={{ marginBottom: 40 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 20, alignItems: 'start' }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#0066cc', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    Trainee Name
                                </div>
                                <div style={{ fontSize: 20, fontWeight: 700, color: '#111' }}>
                                    {cert.traineeName}
                                </div>
                            </div>
                        </div>

                        {/* Organization */}
                        <div style={{ marginBottom: 40 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 20, alignItems: 'start' }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#0066cc', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    Organization
                                </div>
                                <div style={{ fontSize: 16, color: '#333' }}>
                                    {cert.organization}
                                </div>
                            </div>
                        </div>

                        <hr style={{ border: 'none', borderTop: '2px solid #e5e7eb', margin: '40px 0' }} />

                        {/* Training Details */}
                        <div style={{ marginBottom: 40 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 20, alignItems: 'start' }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#0066cc', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    Course
                                </div>
                                <div style={{ fontSize: 16, fontWeight: 600, color: '#111' }}>
                                    {cert.courseName}
                                </div>
                            </div>
                        </div>

                        {/* Training Info Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginBottom: 40 }}>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    Trainer
                                </div>
                                <div style={{ fontSize: 15, color: '#333' }}>
                                    {cert.training?.trainer || 'Not specified'}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    Training Hours
                                </div>
                                <div style={{ fontSize: 15, color: '#333' }}>
                                    {cert.hours} Hours
                                </div>
                            </div>
                        </div>

                        <hr style={{ border: 'none', borderTop: '2px solid #e5e7eb', margin: '40px 0' }} />

                        {/* Dates Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 40 }}>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    Training Date
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: '#0066cc' }}>
                                    {new Date(cert.trainingDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    Issue Date
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: '#0066cc' }}>
                                    {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    Expiry Date
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: isExpired ? '#dc2626' : '#0066cc' }}>
                                    {new Date(cert.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                        </div>

                        <hr style={{ border: 'none', borderTop: '2px solid #e5e7eb', margin: '40px 0' }} />

                        {/* Status Section */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: isExpired ? '#fee2e2' : '#ecfdf5', borderRadius: 8 }}>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    Status
                                </div>
                                <div style={{ fontSize: 18, fontWeight: 700, color: isExpired ? '#dc2626' : '#10b981' }}>
                                    {isExpired ? '❌ EXPIRED' : '✓ ACTIVE'}
                                </div>
                            </div>
                            <div style={{ fontSize: 40, opacity: 0.2 }}>
                                {isExpired ? '⚠' : '✓'}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{
                        background: '#f9fafb',
                        padding: 30,
                        textAlign: 'center',
                        borderTop: '1px solid #e5e7eb'
                    }}>
                        <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>
                            Issued by HORAS CERT
                        </div>
                        <div style={{ fontSize: 12, color: '#999' }}>
                            This certificate verifies the completion of the specified training course.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrainingCertificateView;

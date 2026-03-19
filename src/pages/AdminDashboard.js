import React, { useState, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../services/api';
import './AdminDashboard.css';

// Lazy-loaded tab components for optimal bundle splitting
const CertificatesTab = lazy(() => import('./admin/CertificatesTab'));
const ApplicationsTab = lazy(() => import('./admin/ApplicationsTab'));
const EmailsTab = lazy(() => import('./admin/EmailsTab'));
const TrainingCertificatesTab = lazy(() => import('./admin/TrainingCertificatesTab'));

// Loading fallback component
const TabLoading = () => (
    <div className="tab-loading" role="status" aria-live="polite">
        <div className="loading-spinner"></div>
        <p>Loading tab...</p>
    </div>
);

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('certificates');
    const [error, setError] = useState('');

    // No auth check here - App.js already protects this route
    // App.js redirects to /login if not authenticated before rendering AdminDashboard

    const handleLogout = async () => {
        try {
            await adminLogout();
            // Wait 500ms to ensure logout request reaches backend
            await new Promise(resolve => setTimeout(resolve, 500));
        } finally {
            // Navigate to login using React Router instead of page reload
            navigate('/login', { replace: true });
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <div className="header-left">
                    <h1>Admin Dashboard</h1>
                    <p>Manage certificates, applications, and emails</p>
                </div>
                <div className="header-right">
                    <button onClick={handleLogout} className="btn-logout" type="button" aria-label="Logout from admin dashboard">
                        Logout
                    </button>
                </div>
            </div>

            {error && (
                <div className="alert alert-error" role="alert">
                    {error}
                    <button onClick={() => setError('')} className="alert-close" type="button" aria-label="Close error alert">×</button>
                </div>
            )}

            <div className="dash-tabs" role="tablist">
                <button
                    role="tab"
                    aria-selected={activeTab === 'certificates'}
                    aria-controls="certificates-panel"
                    className={`dash-tab ${activeTab === 'certificates' ? 'active' : ''}`}
                    onClick={() => setActiveTab('certificates')}
                    type="button"
                >
                    <span className="dash-tab-icon" aria-hidden="true">🏆</span>
                    ISO Certificates
                </button>

                <button
                    role="tab"
                    aria-selected={activeTab === 'training'}
                    aria-controls="training-panel"
                    className={`dash-tab ${activeTab === 'training' ? 'active' : ''}`}
                    onClick={() => setActiveTab('training')}
                    type="button"
                >
                    <span className="dash-tab-icon" aria-hidden="true">📜</span>
                    Training Certificates
                </button>

                <button
                    role="tab"
                    aria-selected={activeTab === 'applications'}
                    aria-controls="applications-panel"
                    className={`dash-tab ${activeTab === 'applications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('applications')}
                    type="button"
                >
                    <span className="dash-tab-icon" aria-hidden="true">📋</span>
                    Applications
                </button>

                <button
                    role="tab"
                    aria-selected={activeTab === 'emails'}
                    aria-controls="emails-panel"
                    className={`dash-tab ${activeTab === 'emails' ? 'active' : ''}`}
                    onClick={() => setActiveTab('emails')}
                    type="button"
                >
                    <span className="dash-tab-icon" aria-hidden="true">✉️</span>
                    Messages
                </button>
            </div>

            <div className="dashboard-content">
                <Suspense fallback={<TabLoading />}>
                    {activeTab === 'certificates' && (
                        <div id="certificates-panel" role="tabpanel" aria-labelledby="certificates-tab">
                            <CertificatesTab onError={setError} />
                        </div>
                    )}
                    {activeTab === 'applications' && (
                        <div id="applications-panel" role="tabpanel" aria-labelledby="applications-tab">
                            <ApplicationsTab onError={setError} />
                        </div>
                    )}
                    {activeTab === 'emails' && (
                        <div id="emails-panel" role="tabpanel" aria-labelledby="emails-tab">
                            <EmailsTab onError={setError} />
                        </div>
                    )}
                    {activeTab === 'training' && (
                        <div id="training-panel" role="tabpanel" aria-labelledby="training-tab">
                            <TrainingCertificatesTab onError={setError} />
                        </div>
                    )}
                </Suspense>
            </div>
        </div>
    );
};

export default AdminDashboard;

import React, { useState } from 'react';
import { adminLogout } from '../services/api';
import ApplicationsTab from './admin/ApplicationsTab';
import EmailsTab from './admin/EmailsTab';
import CertificatesTab from './admin/CertificatesTab';
import TrainingCertificatesTab from './admin/TrainingCertificatesTab';
import './AdminDashboard.css';

const AdminDashboard = () => {
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
            // Reload page to clear auth state
            window.location.href = '/login';
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
                    <button onClick={handleLogout} className="btn-logout" type="button">
                        Logout
                    </button>
                </div>
            </div>

            {error && (
                <div className="alert alert-error">
                    {error}
                    <button onClick={() => setError('')} className="alert-close" type="button">×</button>
                </div>
            )}

            <div className="dash-tabs">
                <div
                    className={`dash-tab ${activeTab === 'certificates' ? 'active' : ''}`}
                    onClick={() => setActiveTab('certificates')}
                >
                    <span className="dash-tab-icon">🏆</span>
                    ISO Certificates
                </div>

                <div
                    className={`dash-tab ${activeTab === 'training' ? 'active' : ''}`}
                    onClick={() => setActiveTab('training')}
                >
                    <span className="dash-tab-icon">📜</span>
                    Training Certificates
                </div>

                <div
                    className={`dash-tab ${activeTab === 'applications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('applications')}
                >
                    <span className="dash-tab-icon">📋</span>
                    Applications
                </div>

                <div
                    className={`dash-tab ${activeTab === 'emails' ? 'active' : ''}`}
                    onClick={() => setActiveTab('emails')}
                >
                    <span className="dash-tab-icon">✉️</span>
                    Messages
                </div>
            </div>

            <div className="dashboard-content">
                {activeTab === 'certificates' && <CertificatesTab onError={setError} />}
                {activeTab === 'applications' && <ApplicationsTab onError={setError} />}
                {activeTab === 'emails' && <EmailsTab onError={setError} />}
                {activeTab === 'training' && <TrainingCertificatesTab onError={setError} />}
            </div>
        </div>
    );
};

export default AdminDashboard;

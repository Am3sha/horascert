import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import QRCode from 'qrcode';
import {
    getTrainingCertificates,
    createTrainingCertificate,
    updateTrainingCertificate,
    deleteTrainingCertificate,
} from '../../services/api';

export default function TrainingCertificatesTab({ onError }) {
    const navigate = useNavigate();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [showAddCertificate, setShowAddCertificate] = useState(false);
    const [editingCertificate, setEditingCertificate] = useState(null);
    const [savingEdit, setSavingEdit] = useState(false);

    const [formData, setFormData] = useState({
        certificateNumber: '',
        trainee: { name: '', organization: '', address: '' },
        training: { courseName: '', category: 'ISO 9001', date: '', hours: 8, trainer: '' },
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
    });

    const trainingCategories = [
        'ISO 9001',
        'ISO 14001',
        'ISO 45001',
        'HACCP',
        'GMP',
        'Other'
    ];

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getTrainingCertificates({});
            if (res && res.success) {
                setCertificates(res.data || []);
            } else {
                setCertificates([]);
                if (onError) onError((res && (res.message || res.error)) || 'Failed to fetch training certificates');
            }
        } catch (err) {
            setCertificates([]);
            if (onError) onError((err && err.message) || 'Failed to fetch training certificates');
        } finally {
            setLoading(false);
        }
    }, [onError]);

    useEffect(() => {
        load();
    }, [load]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const resetForm = () => {
        setFormData({
            certificateNumber: '',
            trainee: { name: '', organization: '', address: '' },
            training: { courseName: '', category: 'ISO 9001', date: '', hours: 8, trainer: '' },
            issueDate: new Date().toISOString().split('T')[0],
            expiryDate: '',
        });
    };

    const handleAddNew = () => {
        resetForm();
        setEditingCertificate(null);
        setShowAddCertificate(true);
    };

    const handleEdit = (cert) => {
        if (!cert) {
            if (onError) onError('Certificate not found');
            return;
        }
        setEditingCertificate(cert);
        setFormData({
            certificateNumber: cert.certificateNumber || '',
            trainee: cert.trainee || { name: '', organization: '', address: '' },
            training: {
                courseName: cert.training?.courseName || '',
                category: cert.training?.category || 'ISO 9001',
                date: cert.training?.date ? String(cert.training.date).slice(0, 10) : '',
                hours: cert.training?.hours || 8,
                trainer: cert.training?.trainer || '',
            },
            issueDate: cert.issueDate ? String(cert.issueDate).slice(0, 10) : '',
            expiryDate: cert.expiryDate ? String(cert.expiryDate).slice(0, 10) : '',
        });
        setShowAddCertificate(true);
    };

    const downloadQRCode = (dataUrl, filename) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const generateAndDownloadQR = async (certificateUrl, filename) => {
        try {
            const dataUrl = await QRCode.toDataURL(certificateUrl, {
                width: 200,
                margin: 1,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
            downloadQRCode(dataUrl, filename);
        } catch (err) {
            // Silently handle QR code generation errors
        }
    };

    const handleSaveForm = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.certificateNumber.trim()) {
            toast.error('Certificate number is required');
            return;
        }
        if (!formData.trainee.name.trim()) {
            toast.error('Trainee name is required');
            return;
        }
        if (!formData.trainee.organization.trim()) {
            toast.error('Organization is required');
            return;
        }
        if (!formData.trainee.address.trim()) {
            toast.error('Address is required');
            return;
        }
        if (!formData.training.courseName.trim()) {
            toast.error('Course name is required');
            return;
        }
        if (!formData.training.date) {
            toast.error('Training date is required');
            return;
        }
        if (formData.training.hours <= 0) {
            toast.error('Training hours must be greater than 0');
            return;
        }
        if (!formData.issueDate) {
            toast.error('Issue date is required');
            return;
        }
        if (!formData.expiryDate) {
            toast.error('Expiry date is required');
            return;
        }

        setSavingEdit(true);
        try {
            let res;
            if (editingCertificate) {
                res = await updateTrainingCertificate(editingCertificate._id, formData);
            } else {
                res = await createTrainingCertificate(formData);
            }

            if (!res || !res.success) {
                toast.error((res && (res.message || res.error)) || 'Failed to save certificate');
                return;
            }

            if (!editingCertificate && res.data) {
                const certificateNumber = res.data.certificateNumber;
                const certificateUrl = `${window.location.origin}/verify/training/${certificateNumber}`;

                toast.success(`Training Certificate created! Certificate Number: ${certificateNumber}`);
                setShowAddCertificate(false);

                // Generate and download QR automatically (non-blocking)
                generateAndDownloadQR(certificateUrl, `QR_${certificateNumber}.png`)
                    .catch(() => {
                        // Silently handle QR code download errors
                    });
            } else if (editingCertificate) {
                toast.success('Certificate updated successfully');
                setShowAddCertificate(false);
            }

            load();
        } catch (err) {
            toast.error((err && err.message) || 'Failed to save certificate');
        } finally {
            setSavingEdit(false);
        }
    };

    const handleDelete = (certificateId) => {
        if (!certificateId) return;

        const toastId = toast(
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ flex: 1 }}>Delete this certificate?</span>
                <button
                    onClick={() => {
                        toast.dismiss(toastId);
                        performDelete(certificateId);
                    }}
                    style={{
                        padding: '4px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        background: '#dc2626',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}
                >
                    Delete
                </button>
                <button
                    onClick={() => toast.dismiss(toastId)}
                    style={{
                        padding: '4px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        background: '#f3f4f6',
                        color: '#6b7280',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}
                >
                    Cancel
                </button>
            </div>,
            {
                duration: 10000,
                position: 'top-right',
                style: {
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    color: '#111827',
                    padding: '12px 16px'
                }
            }
        );
    };

    const performDelete = async (certificateId) => {
        setDeletingId(certificateId);
        try {
            const res = await deleteTrainingCertificate(certificateId);
            if (!res || !res.success) {
                toast.error((res && (res.message || res.error)) || 'Failed to delete certificate');
                return;
            }
            toast.success('Certificate deleted successfully');
            load();
        } catch (err) {
            toast.error((err && err.message) || 'Failed to delete certificate');
        } finally {
            setDeletingId(null);
        }
    };

    const handleView = (cert) => {
        // Navigate to training certificate verification page
        if (cert.certificateNumber) {
            navigate(`/verify/training/${cert.certificateNumber}`);
        } else if (cert.qrCode) {
            // Fallback: extract certificateNumber from qrCode URL if needed
            const parts = cert.qrCode.split('/');
            const certNum = parts[parts.length - 1];
            if (certNum) navigate(`/verify/training/${certNum}`);
        }
    };

    return (
        <div className="tab-panel">
            <div className="panel-header">
                <h2>Training Certificates Management</h2>
                <button
                    onClick={handleAddNew}
                    className="btn-primary"
                    type="button"
                >
                    + Create New Training Certificate
                </button>
            </div>

            {showAddCertificate && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ maxWidth: 750, padding: 30 }}>
                        <h2 style={{ marginTop: 0 }}>
                            {editingCertificate ? 'Edit Training Certificate' : 'Create Training Certificate'}
                        </h2>

                        <form onSubmit={handleSaveForm} style={{ display: 'grid', gap: 20 }}>
                            {/* Certificate Number */}
                            <div style={{ display: 'grid', gap: 6 }}>
                                <label style={{ fontWeight: 600, color: '#333' }}>Certificate Number * {editingCertificate && '(Read-only)'}</label>
                                <input
                                    className="status-select"
                                    type="text"
                                    placeholder="e.g., TRAIN-001 or HOR-TR-2025-09"
                                    value={formData.certificateNumber}
                                    onChange={(e) => setFormData(f => ({ ...f, certificateNumber: e.target.value }))}
                                    disabled={!!editingCertificate}
                                    required
                                    style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }}
                                />
                            </div>

                            {/* Trainee Section - 2 column layout */}
                            <div>
                                <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: '#0066cc', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    TRAINEE INFORMATION
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div style={{ display: 'grid', gap: 6 }}>
                                        <label style={{ fontWeight: 500, color: '#333' }}>Name *</label>
                                        <input
                                            className="status-select"
                                            placeholder="Full name"
                                            value={formData.trainee.name}
                                            onChange={(e) => setFormData(f => ({
                                                ...f,
                                                trainee: { ...f.trainee, name: e.target.value }
                                            }))}
                                            required
                                            style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }}
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gap: 6 }}>
                                        <label style={{ fontWeight: 500, color: '#333' }}>Organization *</label>
                                        <input
                                            className="status-select"
                                            placeholder="Organization name"
                                            value={formData.trainee.organization}
                                            onChange={(e) => setFormData(f => ({
                                                ...f,
                                                trainee: { ...f.trainee, organization: e.target.value }
                                            }))}
                                            required
                                            style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gap: 6, marginTop: 12 }}>
                                    <label style={{ fontWeight: 500, color: '#333' }}>Address *</label>
                                    <input
                                        className="status-select"
                                        placeholder="Full address"
                                        value={formData.trainee.address}
                                        onChange={(e) => setFormData(f => ({
                                            ...f,
                                            trainee: { ...f.trainee, address: e.target.value }
                                        }))}
                                        required
                                        style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }}
                                    />
                                </div>
                            </div>

                            {/* Training Section - 2 column layout */}
                            <div>
                                <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: '#0066cc', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    TRAINING INFORMATION
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div style={{ display: 'grid', gap: 6 }}>
                                        <label style={{ fontWeight: 500, color: '#333' }}>Course Name *</label>
                                        <input
                                            className="status-select"
                                            placeholder="e.g., ISO 9001:2015 Internal Auditor"
                                            value={formData.training.courseName}
                                            onChange={(e) => setFormData(f => ({
                                                ...f,
                                                training: { ...f.training, courseName: e.target.value }
                                            }))}
                                            required
                                            style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }}
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gap: 6 }}>
                                        <label style={{ fontWeight: 500, color: '#333' }}>Category</label>
                                        <select
                                            className="status-select"
                                            value={formData.training.category}
                                            onChange={(e) => setFormData(f => ({
                                                ...f,
                                                training: { ...f.training, category: e.target.value }
                                            }))}
                                            style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }}
                                        >
                                            {trainingCategories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                                    <div style={{ display: 'grid', gap: 6 }}>
                                        <label style={{ fontWeight: 500, color: '#333' }}>Training Date *</label>
                                        <input
                                            className="status-select"
                                            type="date"
                                            value={formData.training.date}
                                            onChange={(e) => setFormData(f => ({
                                                ...f,
                                                training: { ...f.training, date: e.target.value }
                                            }))}
                                            required
                                            style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }}
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gap: 6 }}>
                                        <label style={{ fontWeight: 500, color: '#333' }}>Training Hours *</label>
                                        <input
                                            className="status-select"
                                            type="number"
                                            min="1"
                                            placeholder="8"
                                            value={formData.training.hours}
                                            onChange={(e) => setFormData(f => ({
                                                ...f,
                                                training: { ...f.training, hours: parseInt(e.target.value) || 0 }
                                            }))}
                                            required
                                            style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gap: 6, marginTop: 12 }}>
                                    <label style={{ fontWeight: 500, color: '#333' }}>Trainer</label>
                                    <input
                                        className="status-select"
                                        placeholder="Trainer name (optional)"
                                        value={formData.training.trainer}
                                        onChange={(e) => setFormData(f => ({
                                            ...f,
                                            training: { ...f.training, trainer: e.target.value }
                                        }))}
                                        style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }}
                                    />
                                </div>
                            </div>

                            {/* Certificate Dates Section */}
                            <div>
                                <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: '#0066cc', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    CERTIFICATE DATES
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div style={{ display: 'grid', gap: 6 }}>
                                        <label style={{ fontWeight: 500, color: '#333' }}>Issue Date *</label>
                                        <input
                                            className="status-select"
                                            type="date"
                                            value={formData.issueDate}
                                            onChange={(e) => setFormData(f => ({ ...f, issueDate: e.target.value }))}
                                            required
                                            style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }}
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gap: 6 }}>
                                        <label style={{ fontWeight: 500, color: '#333' }}>Expiry Date *</label>
                                        <input
                                            className="status-select"
                                            type="date"
                                            value={formData.expiryDate}
                                            onChange={(e) => setFormData(f => ({ ...f, expiryDate: e.target.value }))}
                                            required
                                            style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16, paddingTop: 16, borderTop: '1px solid #eee' }}>
                                <button
                                    type="button"
                                    className="btn-action"
                                    onClick={() => setShowAddCertificate(false)}
                                    disabled={savingEdit}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={savingEdit}
                                >
                                    {savingEdit ? 'Saving...' : (editingCertificate ? 'Save Changes' : 'Create Certificate')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="loading">Loading training certificates...</div>
            ) : certificates.length === 0 ? (
                <div className="empty-state">
                    <p>No training certificates found</p>
                    <button onClick={handleAddNew} className="btn-primary" type="button">
                        Create First Training Certificate
                    </button>
                </div>
            ) : (
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Certificate Number</th>
                                <th>Trainee Name</th>
                                <th>Training Name</th>
                                <th>Issue Date</th>
                                <th>Expiry Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {certificates.map((cert) => (
                                <tr key={cert._id}>
                                    <td className="cert-number">{cert.certificateNumber}</td>
                                    <td>{cert.trainee?.name || 'N/A'}</td>
                                    <td>{cert.training?.courseName || 'N/A'}</td>
                                    <td>{formatDate(cert.issueDate)}</td>
                                    <td>{formatDate(cert.expiryDate)}</td>
                                    <td>
                                        <span className={`status-badge status-${(cert.status || 'active').toLowerCase()}`}>
                                            {cert.status || 'active'}
                                        </span>
                                    </td>
                                    <td className="actions-cell">
                                        <button
                                            onClick={() => handleView(cert)}
                                            className="btn-action btn-view"
                                            type="button"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleEdit(cert)}
                                            className="btn-action btn-edit"
                                            title="Edit Certificate"
                                            type="button"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cert._id)}
                                            className="btn-action btn-delete"
                                            disabled={deletingId === cert._id}
                                            type="button"
                                        >
                                            {deletingId === cert._id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

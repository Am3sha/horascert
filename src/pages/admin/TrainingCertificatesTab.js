import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
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
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });

    const [showAddCertificate, setShowAddCertificate] = useState(false);
    const [editingCertificate, setEditingCertificate] = useState(null);
    const [savingEdit, setSavingEdit] = useState(false);

    const [formData, setFormData] = useState({
        certificateNumber: '',
        trainee: { name: '', organization: '', address: '', email: '' },
        training: { courseName: '', category: 'ISO 9001', date: '', hours: 8, trainer: '' },
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
    });

    // Load certificates
    const load = useCallback(async (page = 1, searchQuery = search) => {
        setLoading(true);
        try {
            const res = await getTrainingCertificates({
                page,
                limit: pagination.limit,
                ...(searchQuery && { search: searchQuery }),
                ...(statusFilter && { status: statusFilter })
            });
            if (res && res.success) {
                setCertificates(res.data || []);
                setPagination(prev => ({
                    ...prev,
                    page: res.page || page,
                    total: res.total || 0,
                    count: res.count || 0
                }));
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
    }, [onError, statusFilter, pagination.limit]);

    useEffect(() => {
        load(1);
    }, [load]);

    // Debounced search
    const handleSearchChange = useCallback((value) => {
        setSearch(value);
        const timer = setTimeout(() => {
            load(1, value);
        }, 300);
        return () => clearTimeout(timer);
    }, [load]);

    const handlePageChange = useCallback((newPage) => {
        load(newPage, search);
    }, [load, search]);

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
            trainee: { name: '', organization: '', address: '', email: '' },
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
            trainee: cert.trainee || { name: '', organization: '', address: '', email: '' },
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

    const handleSaveForm = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.trainee.name?.trim()) {
            toast.error('Trainee name is required');
            return;
        }
        if (!formData.trainee.organization?.trim()) {
            toast.error('Organization is required');
            return;
        }
        if (!formData.trainee.address?.trim()) {
            toast.error('Address is required');
            return;
        }
        if (!formData.training.courseName?.trim()) {
            toast.error('Course name is required');
            return;
        }
        if (!formData.training.date) {
            toast.error('Training date is required');
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
                const certificateUrl = `https://horascert.com/verify/training/${certificateNumber}`;
                toast.success(`Training Certificate created! Certificate Number: ${certificateNumber}`);
                setShowAddCertificate(false);

                // Download QR code
                try {
                    const qrServiceUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(certificateUrl)}`;
                    const response = await fetch(qrServiceUrl);
                    const blob = await response.blob();
                    const dataUrl = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.readAsDataURL(blob);
                    });

                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = `QR_${certificateNumber}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } catch (err) {
                    // Handle QR generation error silently
                }
            } else if (editingCertificate) {
                toast.success('Certificate updated successfully');
                setShowAddCertificate(false);
            }

            resetForm();
            load(1, search);
        } catch (err) {
            toast.error((err && err.message) || 'Failed to save certificate');
        } finally {
            setSavingEdit(false);
        }
    };

    const handleDelete = (certificateId) => {
        if (!certificateId) return;

        // Show confirmation toast with action buttons
        const toastId = toast(
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} lang="en">
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
                duration: 10000, // 10 seconds to decide
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
            load(1, search);
        } catch (err) {
            toast.error((err && err.message) || 'Failed to delete certificate');
        } finally {
            setDeletingId(null);
        }
    };

    const handleView = (cert) => {
        if (cert.certificateNumber) {
            navigate(`/verify/training/${cert.certificateNumber}`);
        } else if (cert.qrCode) {
            const parts = cert.qrCode.split('/');
            const certNum = parts[parts.length - 1];
            if (certNum) navigate(`/verify/training/${certNum}`);
        }
    };

    return (
        <div className="tab-panel">
            <div className="dash-page-title">Training Certificates Management</div>
            <div className="dash-page-sub">Manage and verify training certificates</div>

            {/* Dashboard Statistics */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-number">{certificates.length}</div>
                    <div className="stat-label">Total Certificates</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">
                        {certificates.filter(c => c.status === 'active').length}
                    </div>
                    <div className="stat-label">Active</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">
                        {certificates.filter(c => c.status === 'expired').length}
                    </div>
                    <div className="stat-label">Expired</div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="table-toolbar">
                <div className="table-search">
                    <input
                        type="text"
                        placeholder="Search certificates..."
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        aria-label="Search training certificates"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filter training certificates by status"
                    style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '2px solid #E0E0E0',
                        fontSize: '0.875rem',
                        fontFamily: 'inherit'
                    }}
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                    <option value="revoked">Revoked</option>
                </select>
                <button className="dbtn dbtn-primary" onClick={handleAddNew} type="button" aria-label="Create new training certificate">
                    + Create Certificate
                </button>
            </div>

            {/* Create/Edit Modal */}
            {showAddCertificate && (
                <div className="modal-overlay" onClick={() => setShowAddCertificate(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-head">
                            <h3>{editingCertificate ? 'Edit' : 'Create'} Training Certificate</h3>
                            <button type="button" className="modal-close" onClick={() => setShowAddCertificate(false)}>×</button>
                        </div>
                        <form className="dash-form" onSubmit={handleSaveForm}>
                            <div className="modal-body">
                                <div className="fg">
                                    <label>Certificate Number</label>
                                    <input
                                        type="text"
                                        placeholder="TRAIN-001"
                                        value={formData.certificateNumber || ''}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            certificateNumber: e.target.value
                                        })}
                                    />
                                    <small style={{ color: '#757575', fontSize: '0.75rem' }}>
                                        Leave empty to auto-generate
                                    </small>
                                </div>

                                <h4>Trainee Information</h4>

                                <div className="fg">
                                    <label>Trainee Name *</label>
                                    <input
                                        type="text"
                                        placeholder="Full name"
                                        value={formData.trainee.name}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            trainee: { ...formData.trainee, name: e.target.value }
                                        })}
                                        required
                                    />
                                </div>

                                <div className="fg">
                                    <label>Organization *</label>
                                    <input
                                        type="text"
                                        placeholder="Company or organization"
                                        value={formData.trainee.organization}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            trainee: { ...formData.trainee, organization: e.target.value }
                                        })}
                                        required
                                    />
                                </div>

                                <div className="fg">
                                    <label>Trainee Email (optional)</label>
                                    <input
                                        type="email"
                                        placeholder="Trainee Email (optional)"
                                        value={formData.trainee.email || ""}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            trainee: { ...formData.trainee, email: e.target.value }
                                        })}
                                    />
                                </div>

                                <div className="fg">
                                    <label>Address *</label>
                                    <input
                                        type="text"
                                        placeholder="Full address"
                                        value={formData.trainee.address}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            trainee: { ...formData.trainee, address: e.target.value }
                                        })}
                                        required
                                    />
                                </div>

                                <h4>Training Details</h4>

                                <div className="fg">
                                    <label>Course Name *</label>
                                    <input
                                        type="text"
                                        placeholder="ISO 9001:2015 Awareness and Implementation"
                                        value={formData.training.courseName}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            training: { ...formData.training, courseName: e.target.value }
                                        })}
                                        required
                                    />
                                </div>

                                <div className="form-row-2">
                                    <div className="fg">
                                        <label>Category</label>
                                        <select
                                            value={formData.training.category}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                training: { ...formData.training, category: e.target.value }
                                            })}
                                        >
                                            <option value="ISO 9001">ISO 9001</option>
                                            <option value="ISO 14001">ISO 14001</option>
                                            <option value="ISO 45001">ISO 45001</option>
                                            <option value="HACCP">HACCP</option>
                                            <option value="GMP">GMP</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="fg">
                                        <label>Training Hours *</label>
                                        <input
                                            type="number"
                                            placeholder="8"
                                            min="1"
                                            value={formData.training.hours}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                training: { ...formData.training, hours: e.target.value }
                                            })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="fg">
                                    <label>Training Date *</label>
                                    <input
                                        type="date"
                                        value={formData.training.date}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            training: { ...formData.training, date: e.target.value }
                                        })}
                                        required
                                    />
                                </div>

                                <div className="fg">
                                    <label>Trainer</label>
                                    <input
                                        type="text"
                                        placeholder="Trainer name"
                                        value={formData.training.trainer}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            training: { ...formData.training, trainer: e.target.value }
                                        })}
                                    />
                                </div>

                                <h4>Certificate Dates</h4>

                                <div className="form-row-2">
                                    <div className="fg">
                                        <label>Issue Date *</label>
                                        <input
                                            type="date"
                                            value={formData.issueDate}
                                            onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="fg">
                                        <label>Expiry Date *</label>
                                        <input
                                            type="date"
                                            value={formData.expiryDate}
                                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-foot">
                                <button type="button" className="dbtn dbtn-secondary btn-action" onClick={() => setShowAddCertificate(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="dbtn dbtn-primary btn-primary" disabled={savingEdit}>
                                    {savingEdit ? 'Saving...' : editingCertificate ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Certificates Table */}
            {loading ? (
                <div className="loading">Loading training certificates...</div>
            ) : (
                <div className="table-container">
                    {certificates.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🔍</div>
                            <div className="empty-state-title">No certificates found</div>
                            <div className="empty-state-text">{search ? 'Try adjusting your search' : 'Start by creating your first training certificate'}</div>
                            {!search && (
                                <button onClick={handleAddNew} className="dbtn dbtn-primary" type="button">
                                    + Create Certificate
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
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
                                        {(certificates || []).map((cert) => (
                                            <tr key={cert._id}>
                                                <td className="cert-number">{cert.certificateNumber}</td>
                                                <td>{cert.trainee?.name || 'N/A'}</td>
                                                <td>{cert.training?.courseName || 'N/A'}</td>
                                                <td>{formatDate(cert.issueDate)}</td>
                                                <td>{formatDate(cert.expiryDate)}</td>
                                                <td>
                                                    <span className={`status-badge status-${(cert.displayStatus || cert.status || 'active').toLowerCase()}`}>
                                                        {cert.displayStatus ? cert.displayStatus.charAt(0).toUpperCase() + cert.displayStatus.slice(1) : (cert.status || 'active')}
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
                                                        {deletingId === cert._id ? '...' : 'Delete'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {pagination.total > pagination.limit && (
                                <div className="pagination" style={{ marginTop: '1rem', textAlign: 'center' }}>
                                    <button
                                        className="dbtn dbtn-secondary"
                                        onClick={() => handlePageChange(pagination.page - 1)}
                                        disabled={pagination.page <= 1}
                                        style={{ marginRight: '0.5rem' }}
                                    >
                                        Previous
                                    </button>
                                    <span style={{ margin: '0 1rem' }}>
                                        Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
                                    </span>
                                    <button
                                        className="dbtn dbtn-secondary"
                                        onClick={() => handlePageChange(pagination.page + 1)}
                                        disabled={pagination.page >= Math.ceil(pagination.total / pagination.limit)}
                                        style={{ marginLeft: '0.5rem' }}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

import React, { useCallback, useEffect, useMemo, useState, useRef, memo } from 'react';
import { toast } from 'react-hot-toast';
import {
    deleteCertificateById,
    fetchCertificates,
    updateCertificateById
} from '../../services/api';
import AddCertificateForm from './AddCertificateForm';

function CertificatesTab({ onError, onSuccess }) {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });
    const searchTimeoutRef = useRef(null);


    const [showAddCertificate, setShowAddCertificate] = useState(false);

    const [editingCertificate, setEditingCertificate] = useState(null);
    const [editForm, setEditForm] = useState({
        certificateNumber: '',
        companyName: '',
        standard: '',
        standardDescription: '',
        scope: '',
        issueDate: '',
        expiryDate: '',
        status: 'Active'
    });
    const [savingEdit, setSavingEdit] = useState(false);

    const standardOptions = useMemo(
        () => [
            { value: 'ISO 9001:2015', label: 'ISO 9001:2015 – Quality Management System' },
            { value: 'ISO 14001:2015', label: 'ISO 14001:2015 – Environmental Management System' },
            { value: 'ISO 45001:2018', label: 'ISO 45001:2018 – Occupational Health and Safety' },
            { value: 'ISO 22000:2018', label: 'ISO 22000:2018 – Food Safety Management System' }
        ],
        []
    );

    const standardDescriptionByValue = useMemo(() => {
        const map = {};
        for (const opt of standardOptions) {
            const parts = String(opt.label || '').split('–');
            map[opt.value] = (parts[1] ? parts[1] : 'Management System').trim();
        }
        return map;
    }, [standardOptions]);

    const load = useCallback(async (page = 1, searchQuery = search) => {
        setLoading(true);
        try {
            // Fetch certificates with pagination and filters
            const res = await fetchCertificates({
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
                if (onError) onError((res && (res.message || res.error)) || 'Failed to fetch certificates');
            }
        } catch (err) {
            setCertificates([]);
            if (onError) onError((err && err.message) || 'Failed to fetch certificates');
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
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => {
            load(1, value);
        }, 300);
    }, [load]);

    const handlePageChange = useCallback((newPage) => {
        load(newPage, search);
    }, [load, search]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };


    const handleView = (certificateId) => {
        window.open(`/certificate/${certificateId}`, '_blank');
    };

    const handleEdit = (certificateId) => {
        const cert = certificates.find((c) => c.certificateId === certificateId) || null;
        if (!cert) {
            if (onError) onError('Certificate not found');
            return;
        }
        setEditingCertificate(cert);
        setEditForm({
            certificateNumber: cert.certificateNumber || '',
            companyName: cert.companyName || '',
            standard: cert.standard || '',
            standardDescription: cert.standardDescription || '',
            scope: cert.scope || '',
            issueDate: cert.issueDate ? String(cert.issueDate).slice(0, 10) : '',
            expiryDate: cert.expiryDate ? String(cert.expiryDate).slice(0, 10) : '',
            status: cert.status || 'Active'
        });
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        if (!editingCertificate) return;

        setSavingEdit(true);
        try {
            const res = await updateCertificateById(editingCertificate.certificateId, {
                certificateNumber: editForm.certificateNumber,
                companyName: editForm.companyName,
                standard: editForm.standard,
                standardDescription: editForm.standardDescription,
                scope: editForm.scope,
                issueDate: editForm.issueDate,
                expiryDate: editForm.expiryDate,
                status: editForm.status
            });

            if (!res || !res.success) {
                if (onError) onError((res && (res.message || res.error)) || 'Failed to update certificate');
                return;
            }

            if (onSuccess) onSuccess('Certificate updated successfully');
            setEditingCertificate(null);
            load(1, search);
        } catch (err) {
            if (onError) onError((err && err.message) || 'Failed to update certificate');
        } finally {
            setSavingEdit(false);
        }
    };

    const handleDelete = (certificateId) => {
        if (!certificateId) return;

        // Show confirmation toast with action buttons
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
            const res = await deleteCertificateById(certificateId);
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


    return (
        <div className="tab-panel">
            <div className="dash-page-title">Certificates Management</div>
            <div className="dash-page-sub">Manage and verify ISO certificates</div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Search by certificate number, company, or standard..."
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    aria-label="Search certificates"
                    style={{
                        flex: 1,
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '2px solid #E0E0E0',
                        fontSize: '0.875rem',
                        fontFamily: 'inherit'
                    }}
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filter certificates by status"
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

                <button
                    className="dbtn dbtn-primary"
                    onClick={() => setShowAddCertificate(true)}
                    type="button"
                    aria-label="Create new certificate"
                >
                    + Create
                </button>
            </div>

            {showAddCertificate && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <AddCertificateForm
                            onSuccess={() => {
                                setShowAddCertificate(false);
                                load(1, search);
                            }}
                            onCancel={() => setShowAddCertificate(false)}
                        />
                    </div>
                </div>
            )}

            {editingCertificate && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ maxWidth: 700, padding: 20 }}>
                        <h2 style={{ marginTop: 0 }}>Edit Certificate</h2>
                        <form onSubmit={handleSaveEdit} style={{ display: 'grid', gap: 12 }}>
                            <div style={{ display: 'grid', gap: 6 }}>
                                <label>Certificate Number</label>
                                <input
                                    className="status-select"
                                    value={editForm.certificateNumber}
                                    onChange={(e) => setEditForm((f) => ({ ...f, certificateNumber: e.target.value }))}
                                    required
                                />
                            </div>
                            <div style={{ display: 'grid', gap: 6 }}>
                                <label>Company Name</label>
                                <input
                                    className="status-select"
                                    value={editForm.companyName}
                                    onChange={(e) => setEditForm((f) => ({ ...f, companyName: e.target.value }))}
                                    required
                                />
                            </div>
                            <div style={{ display: 'grid', gap: 6 }}>
                                <label>Standard</label>
                                <select
                                    className="status-select"
                                    value={editForm.standard}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setEditForm((f) => ({
                                            ...f,
                                            standard: value,
                                            standardDescription: standardDescriptionByValue[value] || ''
                                        }));
                                    }}
                                    required
                                >
                                    <option value="" disabled>Select a standard</option>
                                    {standardOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ display: 'grid', gap: 6 }}>
                                <label>Scope</label>
                                <input
                                    className="status-select"
                                    value={editForm.scope}
                                    onChange={(e) => setEditForm((f) => ({ ...f, scope: e.target.value }))}
                                    required
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div style={{ display: 'grid', gap: 6 }}>
                                    <label>Issue Date</label>
                                    <input
                                        className="status-select"
                                        type="date"
                                        value={editForm.issueDate}
                                        onChange={(e) => setEditForm((f) => ({ ...f, issueDate: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div style={{ display: 'grid', gap: 6 }}>
                                    <label>Expiry Date</label>
                                    <input
                                        className="status-select"
                                        type="date"
                                        value={editForm.expiryDate}
                                        onChange={(e) => setEditForm((f) => ({ ...f, expiryDate: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gap: 6 }}>
                                <label>Status</label>
                                <select
                                    className="status-select"
                                    value={editForm.status}
                                    onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value }))}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Suspended">Suspended</option>
                                    <option value="Withdrawn">Withdrawn</option>
                                    <option value="Expired">Expired</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
                                <button
                                    type="button"
                                    className="btn-action"
                                    onClick={() => setEditingCertificate(null)}
                                    disabled={savingEdit}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={savingEdit}
                                >
                                    {savingEdit ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="table-container">
                <div className="table-toolbar">
                    <div className="table-search">
                        <input
                            type="text"
                            placeholder="Search ISO certificates..."
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                    </div>
                    <button className="dbtn dbtn-primary" onClick={() => setShowAddCertificate(true)}>
                        + Create Certificate
                    </button>
                </div>

                {loading ? (
                    <div className="loading">Loading certificates...</div>
                ) : certificates.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">🏆</div>
                        <div className="empty-state-title">No Certificates Found</div>
                        <div className="empty-state-text">
                            {search ? 'Try adjusting your search' : 'Create your first ISO certificate to get started'}
                        </div>
                        {!search && (
                            <button className="dbtn dbtn-primary" onClick={() => setShowAddCertificate(true)}>
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
                                        <th>Certificate #</th>
                                        <th>Company</th>
                                        <th>Standard</th>
                                        <th>Issue Date</th>
                                        <th>Expiry</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(certificates || []).map((cert) => (
                                        <tr key={cert._id}>
                                            <td className="cert-number">{cert.certificateNumber}</td>
                                            <td>{cert.companyName}</td>
                                            <td>{cert.standard}</td>
                                            <td>{formatDate(cert.issueDate)}</td>
                                            <td>{formatDate(cert.expiryDate)}</td>
                                            <td>
                                                <span className={`status-badge status-${(cert.displayStatus || cert.status || 'active').toLowerCase()}`}>
                                                    {cert.displayStatus ? cert.displayStatus.charAt(0).toUpperCase() + cert.displayStatus.slice(1) : cert.status}
                                                </span>
                                            </td>
                                            <td className="actions-cell">
                                                <button
                                                    className="btn-action btn-view"
                                                    onClick={() => handleView(cert.certificateId)}
                                                    title="View"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="btn-action btn-edit"
                                                    onClick={() => handleEdit(cert.certificateId)}
                                                    title="Edit"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn-action btn-delete"
                                                    onClick={() => handleDelete(cert.certificateId)}
                                                    disabled={deletingId === cert.certificateId}
                                                    title="Delete"
                                                >
                                                    {deletingId === cert.certificateId ? '...' : 'Delete'}
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
        </div>
    );
}

export default memo(CertificatesTab);

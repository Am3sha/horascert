import React, { useState, useEffect } from 'react';
import {
    getTrainingCertificates,
    deleteTrainingCertificate,
    createTrainingCertificate,
    updateTrainingCertificate,
} from '../services/api';
import './TrainingCertificates.css';

function TrainingCertificates() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingCert, setEditingCert] = useState(null);
    const [formData, setFormData] = useState({
        trainee: { name: '', organization: '', address: '', email: '', phone: '' },
        training: { courseName: '', category: 'ISO 9001', date: '', hours: 8, trainer: '' },
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
        notes: '',
    });

    useEffect(() => {
        fetchCertificates();
    }, [search]);

    const fetchCertificates = async () => {
        try {
            setLoading(true);
            const res = await getTrainingCertificates({ search });
            if (res.success) {
                setCertificates(res.data);
            }
        } catch (error) {
            // Error handling - consider adding toast notification
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingCert(null);
        setFormData({
            trainee: { name: '', organization: '', address: '', email: '', phone: '' },
            training: { courseName: '', category: 'ISO 9001', date: '', hours: 8, trainer: '' },
            issueDate: new Date().toISOString().split('T')[0],
            expiryDate: '',
            notes: '',
        });
        setShowModal(true);
    };

    const handleEdit = (cert) => {
        setEditingCert(cert);
        setFormData({
            trainee: cert.trainee,
            training: {
                ...cert.training,
                date: cert.training.date ? cert.training.date.split('T')[0] : '',
            },
            issueDate: cert.issueDate ? cert.issueDate.split('T')[0] : '',
            expiryDate: cert.expiryDate ? cert.expiryDate.split('T')[0] : '',
            notes: cert.notes || '',
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this certificate?')) return;
        try {
            await deleteTrainingCertificate(id);
            fetchCertificates();
        } catch (error) {
            // Error handling - consider adding toast notification
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCert) {
                await updateTrainingCertificate(editingCert._id, formData);
            } else {
                await createTrainingCertificate(formData);
            }
            setShowModal(false);
            fetchCertificates();
        } catch (error) {
            // Error handling - consider adding toast notification
        }
    };

    return (
        <div className="certificates-tab" style={{ padding: '20px' }}>
            <div className="tab-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div className="filters" style={{ flex: 1 }}>
                    <div className="search-box" style={{ maxWidth: '400px' }}>
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search training certificates..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>
                <button className="btn-primary" onClick={handleCreate} style={{ marginLeft: '15px' }}>
                    + New Training Certificate
                </button>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading validation history...</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Certificate ID</th>
                                <th>Trainee</th>
                                <th>Organization</th>
                                <th>Course</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {certificates.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="empty-state">
                                        No results found
                                    </td>
                                </tr>
                            ) : (
                                certificates.map((cert) => (
                                    <tr key={cert._id}>
                                        <td>
                                            <span className="cert-number">{cert.certificateNumber}</span>
                                        </td>
                                        <td>
                                            <div className="company-name">{cert.trainee?.name}</div>
                                        </td>
                                        <td>
                                            {cert.trainee?.organization}
                                        </td>
                                        <td>
                                            <span className={`standard-badge`}>
                                                {cert.training?.courseName}
                                            </span>
                                        </td>
                                        <td>
                                            {new Date(cert.training?.date).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <span className={`status-badge status-${cert.status?.toLowerCase() || 'active'}`}>
                                                {cert.isExpired ? 'Expired' : cert.status}
                                            </span>
                                        </td>
                                        <td className="actions-cell">
                                            <div className="action-buttons">
                                                {cert.pdfUrl && (
                                                    <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-action btn-pdf" title="View PDF">
                                                        📄
                                                    </a>
                                                )}
                                                <button onClick={() => handleEdit(cert)} className="btn-action btn-edit" title="Edit Certificate">
                                                    ✏️
                                                </button>
                                                <button onClick={() => handleDelete(cert._id)} className="btn-action btn-delete" title="Delete Certificate">
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal - built in line to match requirement, styled manually for neatness */}
            {showModal && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }} onClick={() => setShowModal(false)}>
                    <div className="modal-content" style={{
                        background: 'white', padding: '30px', borderRadius: '12px',
                        width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto'
                    }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ margin: 0 }}>{editingCert ? 'Edit' : 'Create'} Training Certificate</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div className="form-section">
                                    <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>Trainee Info</h3>

                                    <div className="form-group" style={{ marginBottom: '15px' }}>
                                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Trainee Name *</label>
                                        <input
                                            type="text"
                                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                                            value={formData.trainee.name}
                                            onChange={(e) => setFormData({ ...formData, trainee: { ...formData.trainee, name: e.target.value } })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group" style={{ marginBottom: '15px' }}>
                                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Organization *</label>
                                        <input
                                            type="text"
                                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                                            value={formData.trainee.organization}
                                            onChange={(e) => setFormData({ ...formData, trainee: { ...formData.trainee, organization: e.target.value } })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group" style={{ marginBottom: '15px' }}>
                                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Address *</label>
                                        <input
                                            type="text"
                                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                                            value={formData.trainee.address}
                                            onChange={(e) => setFormData({ ...formData, trainee: { ...formData.trainee, address: e.target.value } })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>Training Info</h3>

                                    <div className="form-group" style={{ marginBottom: '15px' }}>
                                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Course Name *</label>
                                        <input
                                            type="text"
                                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                                            value={formData.training.courseName}
                                            onChange={(e) => setFormData({ ...formData, training: { ...formData.training, courseName: e.target.value } })}
                                            required
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <div className="form-group" style={{ marginBottom: '15px' }}>
                                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date *</label>
                                            <input
                                                type="date"
                                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                                                value={formData.training.date}
                                                onChange={(e) => setFormData({ ...formData, training: { ...formData.training, date: e.target.value } })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group" style={{ marginBottom: '15px' }}>
                                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Hours *</label>
                                            <input
                                                type="number"
                                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                                                value={formData.training.hours}
                                                onChange={(e) => setFormData({ ...formData, training: { ...formData.training, hours: e.target.value } })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <div className="form-group" style={{ marginBottom: '15px' }}>
                                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Issue Date *</label>
                                            <input
                                                type="date"
                                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                                                value={formData.issueDate}
                                                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group" style={{ marginBottom: '15px' }}>
                                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Validity Date *</label>
                                            <input
                                                type="date"
                                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                                                value={formData.expiryDate}
                                                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{
                                    padding: '10px 20px', borderRadius: '6px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer'
                                }}>
                                    Cancel
                                </button>
                                <button type="submit" style={{
                                    padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#0369a1', color: '#fff', cursor: 'pointer'
                                }}>
                                    {editingCert ? 'Update Certificate' : 'Create Certificate'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TrainingCertificates;

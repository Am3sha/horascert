import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCertificate } from '../../services/api';
import './AddCertificateForm.css';

const TECHNICAL_SECTORS = [
    { code: "1", name: "Agriculture, forestry and fishing" },
    { code: "C0", name: "Animal - Primary conversion" },
    { code: "12", name: "Chemicals, chemical products and fibres" },
    { code: "37", name: "Education" },
    { code: "32", name: "Financial intermediation; real estate; renting" },
    { code: "C", name: "Food Manufacturing" },
    { code: "3", name: "Food products, beverages and tobacco" },
    { code: "C-Food", name: "Food, ingredient and pet food processing" },
    { code: "30", name: "Hotels and restaurants" },
    { code: "33", name: "Information technology" },
    { code: "7", name: "Limited to Pulp and paper manufacturing" },
    { code: "10", name: "Manufacture of coke and refined petroleum products" },
    { code: "23", name: "Manufacturing not elsewhere classified" },
    { code: "15", name: "Non-metallic mineral products" },
    { code: "35", name: "Other services" },
    { code: "CIV", name: "Processing of ambient stable products" },
    { code: "CIII", name: "Processing of perishable animal and plant products (mixed)" },
    { code: "CI", name: "Processing of perishable animal products" },
    { code: "CII", name: "Processing of perishable plant products" },
    { code: "36", name: "Public administration" },
    { code: "14", name: "Rubber and plastic products" },
    { code: "4", name: "Textiles and textile products" },
    { code: "29", name: "Wholesale and retail trade" },
    { code: "6", name: "Wood and wood products" }
];

const AddCertificateForm = ({ onSuccess, onCancel }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        certificateNumber: '',
        companyName: '',
        companyEmail: '',
        companyAddress: '',
        standard: 'ISO 9001:2015',
        standardDescription: 'Quality Management System',
        scope: '',
        technicalSector: '',
        issueDate: '',
        expiryDate: '',
        firstIssueDate: '',
        status: 'Active'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const standards = [
        { value: 'ISO 9001:2015', desc: 'Quality Management System' },
        { value: 'ISO 14001:2015', desc: 'Environmental Management System' },
        { value: 'ISO 45001:2018', desc: 'Occupational Health and Safety' },
        { value: 'ISO 22000:2018', desc: 'Food Safety Management System' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'standard') {
            const selected = standards.find(s => s.value === value);
            if (selected) {
                setFormData(prev => ({ ...prev, standardDescription: selected.desc }));
            }
        }

        if (error) setError('');
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
            // Use external QR code service for frontend compatibility
            const qrServiceUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(certificateUrl)}`;

            // Convert to data URL
            const response = await fetch(qrServiceUrl);
            const blob = await response.blob();
            const dataUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });

            downloadQRCode(dataUrl, filename);
        } catch (err) {
            // Handle QR code generation error silently
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Basic validation
        if (!formData.certificateNumber.trim()) {
            setError('Certificate Number is required');
            setLoading(false);
            return;
        }

        if (!formData.companyName.trim()) {
            setError('Company Name is required');
            setLoading(false);
            return;
        }

        if (!formData.companyAddress.trim()) {
            setError('Company Address is required');
            setLoading(false);
            return;
        }

        if (!formData.scope.trim()) {
            setError('Scope of Registration is required');
            setLoading(false);
            return;
        }

        if (!formData.issueDate) {
            setError('Issue Date is required');
            setLoading(false);
            return;
        }

        if (!formData.expiryDate) {
            setError('Expiry Date is required');
            setLoading(false);
            return;
        }

        try {
            // Ensure technicalSector is included
            const payload = {
                ...formData,
                technicalSector: formData.technicalSector && formData.technicalSector.trim() ? formData.technicalSector : null
            };

            const data = await createCertificate(payload);

            if (data && data.success && data.data && data.data.certificateId) {
                const certificateUrl = `${window.location.origin}/certificate/${data.data.certificateId}`;

                // Show success message IMMEDIATELY - data is safely in database!
                setSuccessMessage(`Certificate created successfully! Certificate Number: ${data.data.certificateNumber}, Certificate ID: ${data.data.certificateId}.`);
                setLoading(false); // Clear loading state instantly for instant UX feedback

                // Generate and download QR Code in background (non-blocking)
                // This doesn't block UX from showing success
                generateAndDownloadQR(certificateUrl, `QR_${data.data.certificateNumber}.png`)
                    .catch(() => {
                        // Silently handle QR code download errors - don't disrupt UX
                    });

                // Optional: Redirect after success is visible (brief pause for UX clarity)
                setTimeout(() => {
                    navigate(`/certificate/${data.data.certificateId || data.data._id}`);

                    if (onSuccess) {
                        onSuccess(data.data);
                    }

                    // Reset form and success message
                    setFormData({
                        certificateNumber: '',
                        companyName: '',
                        companyEmail: '',
                        companyAddress: '',
                        standard: 'ISO 9001:2015',
                        standardDescription: 'Quality Management System',
                        scope: '',
                        technicalSector: '',
                        issueDate: '',
                        expiryDate: '',
                        firstIssueDate: '',
                        status: 'Active'
                    });
                    setSuccessMessage('');
                }, 1000);

            } else {
                setError((data && (data.error || data.message)) || 'Failed to create certificate - Invalid response from server');
                setLoading(false);
            }

        } catch (err) {
            setError(`Network error: ${err.message || 'Failed to connect to server'}`);
            setLoading(false);
        }
    };

    return (
        <div className="add-certificate-form">
            <div className="form-header">
                <h2>Create New Certificate</h2>
                <p>Fill in the required information to issue a new certificate</p>
            </div>

            {error && (
                <div className="alert alert-error">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="alert alert-success" style={{ backgroundColor: '#d4edda', color: '#155724', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="certificate-form">

                <div className="form-grid">

                    <div className="form-group full-width">
                        <label htmlFor="certificateNumber">Certificate Number *</label>
                        <input
                            id="certificateNumber"
                            type="text"
                            name="certificateNumber"
                            value={formData.certificateNumber}
                            onChange={handleChange}
                            placeholder="HOR09152025112"
                            required
                            disabled={loading}
                        />
                        <small>Example: HOR09152025112</small>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="companyName">Company Name *</label>
                        <input
                            id="companyName"
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Company Name"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="companyEmail">Company Email (optional)</label>
                        <input
                            id="companyEmail"
                            type="email"
                            name="companyEmail"
                            value={formData.companyEmail}
                            onChange={handleChange}
                            placeholder="Company email address"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="companyAddress">Full Address *</label>
                        <textarea
                            id="companyAddress"
                            name="companyAddress"
                            value={formData.companyAddress}
                            onChange={handleChange}
                            placeholder="10 Bahaa El-Din Ibn Hanna Street, Bab Al-Sharia, Cairo - Egypt, Cairo, 11511, Egypt"
                            required
                            disabled={loading}
                            rows="2"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="standard">ISO Standard *</label>
                        <select
                            id="standard"
                            name="standard"
                            value={formData.standard}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        >
                            <option value="">Select a standard...</option>
                            {standards.map(s => (
                                <option key={s.value} value={s.value}>
                                    {s.value} - {s.desc}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <option value="Active">Active</option>
                            <option value="Suspended">Suspended</option>
                            <option value="Expired">Expired</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="scope">Scope of Registration *</label>
                        <textarea
                            id="scope"
                            name="scope"
                            value={formData.scope}
                            onChange={handleChange}
                            placeholder="Import, export and general supplies"
                            required
                            disabled={loading}
                            rows="3"
                        />
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="technicalSector">
                            Technical Sector
                            <span style={{ fontSize: '0.875rem', color: '#6C757D', fontWeight: '400', marginLeft: '0.5rem' }}>(Optional)</span>
                        </label>
                        <select
                            id="technicalSector"
                            name="technicalSector"
                            value={formData.technicalSector}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <option value="">-- Select Technical Sector (Optional) --</option>
                            {TECHNICAL_SECTORS.map(sector => (
                                <option key={sector.code} value={sector.name}>
                                    {sector.code} - {sector.name}
                                </option>
                            ))}
                        </select>
                        <small style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.875rem', color: '#6C757D' }}>
                            Select the technical sector that applies to this certificate (optional)
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="issueDate">Issue Date *</label>
                        <input
                            id="issueDate"
                            type="date"
                            name="issueDate"
                            value={formData.issueDate}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            aria-label="Issue Date"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date *</label>
                        <input
                            id="expiryDate"
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            aria-label="Expiry Date"
                        />
                    </div>

                </div>

                <div className="form-actions">
                    <div className="form-actions-row" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        {onCancel && (
                            <button
                                type="button"
                                className="dbtn dbtn-secondary"
                                onClick={onCancel}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className="dbtn dbtn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Certificate'}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default AddCertificateForm;

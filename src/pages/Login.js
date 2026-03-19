import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/api';
import './Login.css';

/**
 * Admin Login Page
 * Secure authentication gateway for administrators
 * Horas Cert ISO certification branding
 */
export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Auto-hide error after 4 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        setLoading(true);

        try {
            const res = await adminLogin(email.trim(), password);

            if (res && res.success) {
                // Login successful, cookie is set by backend
                // Navigate to dashboard using React Router instead of page reload
                navigate('/dashboard', { replace: true });
            } else {
                // Friendly error message
                setError('Invalid email or password. Please try again.');
                setLoading(false);
            }
        } catch (err) {
            // Friendly error message
            setError('Invalid email or password. Please try again.');
            setLoading(false);
        }
    };

    // Form validation
    const isFormValid = email && password && !loading;

    return (
        <div className="login-page">
            {/* Background gradient overlay */}
            <div className="login-background"></div>

            {/* Login card */}
            <div className="login-card">
                <div className="login-header">
                    <img
                        src="/imgeteam/LOGO.jpeg"
                        alt="HORAS-Cert Logo"
                        className="login-logo"
                    />
                    <h1 className="login-title">Login</h1>
                    <p className="login-subtitle">Authorized access to the administration area</p>
                </div>

                {/* Login form */}
                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    {/* Email field */}
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@mail.com"
                            required
                            disabled={loading}
                            autoComplete="email"
                            aria-label="Email Address"
                        />
                    </div>

                    {/* Password field */}
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            disabled={loading}
                            autoComplete="current-password"
                            aria-label="Password"
                        />
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="error-message" role="alert" aria-live="polite">
                            <span className="error-icon">⚠</span>
                            <span className="error-text">{error}</span>
                        </div>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="login-button"
                        disabled={!isFormValid}
                        aria-busy={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Logging in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>

                    <div className="login-links">
                        <Link className="login-link" to="/">Back to Home</Link>
                    </div>
                </form>

                {/* Footer note */}
                <div className="login-footer">
                    <p>Authorized personnel only</p>
                </div>
            </div>
        </div>
    );
}

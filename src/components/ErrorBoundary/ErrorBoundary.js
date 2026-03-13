import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Store the error for debugging
        return { hasError: true, error: error };
    }

    componentDidCatch(error, errorInfo) {
        // Log errors and component stack for debugging/monitoring
        console.error('React Error Boundary caught an error:', error);
        console.error('Component Stack:', errorInfo.componentStack);

        // Store error details for debugging
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // In production, you might want to send this to an error reporting service
        if (process.env.NODE_ENV === 'production') {
            // Example: Send to Sentry, LogRocket, or custom error tracking
            // window.Sentry?.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });

            // For now, log to console in production as well (can be removed later)
            console.error('Production Error:', {
                message: error.message,
                stack: error.stack,
                componentStack: errorInfo.componentStack,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href
            });
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 40, textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>Something went wrong.</h2>
                    <p style={{ marginBottom: '20px', color: '#666' }}>
                        Please refresh the page or contact support if the problem persists.
                    </p>

                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details style={{
                            textAlign: 'left',
                            background: '#f8f9fa',
                            padding: '20px',
                            borderRadius: '4px',
                            border: '1px solid #dee2e6'
                        }}>
                            <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}>
                                Error Details (Development Only)
                            </summary>
                            <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>
                                <p><strong>Error:</strong> {this.state.error.toString()}</p>
                                <p><strong>Stack:</strong></p>
                                <pre style={{
                                    background: '#fff',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    overflow: 'auto',
                                    maxHeight: '200px'
                                }}>
                                    {this.state.error.stack}
                                </pre>
                                <p><strong>Component Stack:</strong></p>
                                <pre style={{
                                    background: '#fff',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    overflow: 'auto',
                                    maxHeight: '200px'
                                }}>
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </div>
                        </details>
                    )}

                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

import React from 'react';
import './ProcessTimeline.css';

const ProcessTimeline = () => {
  const steps = [
    {
      id: 1,
      title: 'Application',
      description: 'Submit your application form with required documents',
      icon: '📋'
    },
    {
      id: 2,
      title: 'Document Review',
      description: 'Our experts review your documentation and management system',
      icon: '📄'
    },
    {
      id: 3,
      title: 'On-site Audit',
      description: 'Comprehensive audit of your facilities and processes',
      icon: '🔍'
    },
    {
      id: 4,
      title: 'Non-conformance Management',
      description: 'Address any findings and implement corrective actions',
      icon: '✅'
    },
    {
      id: 5,
      title: 'Certification Decision',
      description: 'Review and approval by certification committee',
      icon: '🎯'
    },
    {
      id: 6,
      title: 'Surveillance Audits',
      description: 'Regular audits to maintain certification compliance',
      icon: '🔄'
    },
    {
      id: 7,
      title: 'Re-certification',
      description: 'Renewal process every three years',
      icon: '🔄'
    }
  ];

  return (
    <div className="process-timeline">
      <div className="container">
        <div className="timeline-wrapper">
          {steps.map((step, index) => (
            <div key={step.id} className="timeline-step">
              <div className="step-number">{step.id}</div>
              <div className="step-icon">{step.icon}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;


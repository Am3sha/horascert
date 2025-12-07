const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendApplicationEmail, sendContactEmail } = require('../config/email');

const router = express.Router();

// Validation rules for application form
const applicationValidation = [
  body('companyName').optional().trim().isLength({ min: 2, max: 200 }),
  body('companyAddress').optional().trim().isLength({ min: 10, max: 500 }),
  body('industry').optional().trim().isLength({ min: 2, max: 100 }),
  body('contactName').optional().trim().isLength({ min: 2, max: 100 }),
  body('contactEmail').isEmail().normalizeEmail(),
  body('contactPhone').optional().trim().isLength({ min: 8, max: 20 }),
  body('certificationsRequested').optional(),
];

// Validation rules for contact form
const contactValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().trim().isLength({ min: 8, max: 20 }),
  body('subject').trim().isLength({ min: 3, max: 200 }).withMessage('Subject must be between 3 and 200 characters'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
];

/**
 * POST /api/applications
 * Submit a new certification application
 */
router.post('/', applicationValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      phone,
      companyName,
      companyAddress,
      industry,
      companySize,
      numberOfEmployees,
      numberOfLocations,
      contactPersonName,
      contactPersonPosition,
      contactEmail,
      contactPhone,
      standards,
      currentCertifications,
      preferredAuditDate,
      additionalInfo,
    } = req.body;

    // Prepare data for email
    const applicationData = {
      name: name || contactPersonName,
      email: email || contactEmail,
      phone: phone || contactPhone,
      companyName,
      companyAddress,
      industry,
      companySize,
      numberOfEmployees: numberOfEmployees?.toString(),
      numberOfLocations: numberOfLocations?.toString(),
      contactPersonName: contactPersonName || name,
      contactPersonPosition,
      contactEmail: contactEmail || email,
      contactPhone: contactPhone || phone,
      certificationsRequested: Array.isArray(standards) ? JSON.stringify(standards) : standards,
      currentCertifications,
      preferredAuditDate: preferredAuditDate ? new Date(preferredAuditDate) : null,
      additionalInfo,
    };

    // Send email notification
    const emailResult = await sendApplicationEmail(applicationData);

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to send email. Please try again later.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      emailSent: true,
    });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit application. Please try again later.',
    });
  }
});

/**
 * POST /api/applications/contact
 * Submit contact form
 */
router.post('/contact', contactValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, subject, message } = req.body;

    // Prepare contact data for email
    const contactData = {
      name,
      email,
      phone,
      subject,
      message,
    };

    // Send email notification
    const emailResult = await sendContactEmail(contactData);

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to send email. Please try again later.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message sent successfully',
      emailSent: true,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.',
    });
  }
});

module.exports = router;


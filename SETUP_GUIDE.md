# Complete Form Submission System - Setup Guide

## Overview

This implementation provides a complete form submission system with:
- ✅ Email integration using Nodemailer
- ✅ Database storage with Prisma (PostgreSQL)
- ✅ Admin dashboard with authentication
- ✅ Form validation and security
- ✅ API endpoints for form submissions

## Project Structure

```
Hors/
├── server/                    # Backend server
│   ├── config/
│   │   ├── database.js       # Prisma client
│   │   └── email.js          # Nodemailer configuration
│   ├── middleware/
│   │   └── auth.js           # JWT authentication
│   ├── routes/
│   │   ├── applications.js   # Application & contact form routes
│   │   └── auth.js           # Admin authentication routes
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   ├── scripts/
│   │   └── create-admin.js   # Admin user creation script
│   ├── server.js             # Express server
│   └── package.json
├── src/
│   ├── pages/
│   │   ├── Application.js    # Updated with API integration
│   │   └── AdminDashboard.js # New admin dashboard
│   └── components/
│       └── ContactForm/
│           └── ContactForm.js # Updated with API integration
└── README_BACKEND.md         # Detailed backend setup guide
```

## Quick Start

### 1. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Configure your database and email settings

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Create admin user
node scripts/create-admin.js admin admin@horas-cert.com your-password

# Start server
npm run dev
```

### 2. Frontend Setup

```bash
# In root directory
# Create .env file with:
REACT_APP_API_URL=http://localhost:5000

# Start React app
npm start
```

### 3. Access Admin Dashboard

Navigate to: `http://localhost:3000/admin/applications`

Login with your admin credentials.

## Environment Variables

### Backend (.env in server/ directory)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/horas_cert"
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@horas-cert.com
EMAIL_TO=info@horas-cert.com
JWT_SECRET=your-secret-key
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env in root directory)

```env
REACT_APP_API_URL=http://localhost:5000
```

## Features

### 1. Form Submissions

- **Application Form** (`/application`)
  - Saves to database
  - Sends email notification
  - Validates all inputs

- **Contact Form** (`/contact`)
  - Saves to database
  - Sends email notification
  - Validates all inputs

### 2. Admin Dashboard (`/admin/applications`)

- View all applications
- Filter by certification type
- Filter by audit date
- View detailed application information
- Pagination support
- Secure authentication

### 3. Email Notifications

- Automatic email on form submission
- HTML formatted emails
- Includes all form data
- Sent to configured email address

### 4. Database Schema

**Applications Table:**
- Stores all form submissions
- Includes company info, contact details, certifications
- Timestamps for tracking

**Admins Table:**
- Stores admin user credentials
- Password hashing with bcrypt
- JWT token authentication

## API Endpoints

### Public

- `POST /api/applications` - Submit certification application
- `POST /api/applications/contact` - Submit contact form
- `GET /api/health` - Health check

### Admin (Requires Authentication)

- `POST /api/auth/login` - Admin login
- `GET /api/applications` - Get applications (with filters)
- `GET /api/applications/:id` - Get single application

## Security Features

- Input sanitization
- SQL injection prevention (Prisma)
- XSS protection
- JWT authentication
- Password hashing (bcrypt)
- CORS configuration
- Input validation

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET`
- [ ] Configure production database
- [ ] Set up SSL/TLS for email
- [ ] Update CORS origins
- [ ] Disable registration endpoint
- [ ] Set up environment variables securely
- [ ] Configure firewall rules
- [ ] Set up database backups
- [ ] Enable rate limiting
- [ ] Set up monitoring/logging

## Troubleshooting

See `README_BACKEND.md` for detailed troubleshooting guide.

## Support

For issues or questions, refer to:
- Backend setup: `README_BACKEND.md`
- Prisma docs: https://www.prisma.io/docs
- Nodemailer docs: https://nodemailer.com/about/


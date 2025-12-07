# Simple Form Submission Setup - Email Only

## Overview

This implementation uses **email-only** form submissions. No database required!

- ✅ Forms submit to Express API
- ✅ API sends email via Nodemailer
- ✅ All form data included in email
- ✅ Simple, clean, and efficient

## Quick Setup

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Configure Email

Create `server/.env` file:

```env
# Email Configuration (Gmail example)
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
EMAIL_TO=info@horas-cert.com

# Server
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

**For Gmail:**
1. Enable 2-Factor Authentication
2. Go to Google Account → Security → App Passwords
3. Generate App Password
4. Use it in `MAIL_PASS` (not your regular password)

### 3. Start Server

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`

### 4. Configure Frontend

Create `.env` file in root directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

### 5. Start Frontend

```bash
npm start
```

## How It Works

1. **User fills form** (Application or Contact)
2. **Frontend validates** inputs
3. **Frontend sends POST** to `/api/applications` or `/api/applications/contact`
4. **Backend validates** inputs again
5. **Backend sends email** to `info@horas-cert.com`
6. **Backend returns** success/error response
7. **Frontend shows** success/error message

## API Endpoints

- `POST /api/applications` - Submit certification application
- `POST /api/applications/contact` - Submit contact form
- `GET /api/health` - Health check

## Email Format

### Application Form Email

**Subject:** "New Certification Application"

**Body includes:**
- Contact Information (Name, Email, Phone)
- Company Information (Name, Address, Industry, Size, Employees, Locations)
- Contact Person Details
- Certification Details (Requested, Current, Preferred Audit Date)
- Additional Information

### Contact Form Email

**Subject:** "Contact Form: [Subject]"

**Body includes:**
- Name, Email, Phone
- Subject
- Message

## Files Structure

```
server/
├── server.js              # Express server
├── config/
│   └── email.js          # Nodemailer setup
├── routes/
│   └── applications.js   # Form routes
└── package.json

src/
├── pages/
│   └── Application.js    # Application form
└── components/
    └── ContactForm/
        └── ContactForm.js # Contact form
```

## Testing

1. **Test Application Form:**
   - Go to `/application`
   - Fill and submit
   - Check email inbox

2. **Test Contact Form:**
   - Go to `/contact`
   - Fill and submit
   - Check email inbox

## Troubleshooting

### Email Not Sending

- ✅ Verify `MAIL_USER` and `MAIL_PASS` are correct
- ✅ For Gmail, use App Password
- ✅ Check network/firewall settings
- ✅ Verify SMTP port (587) is open

### CORS Errors

- ✅ Update `CORS_ORIGIN` in backend `.env`
- ✅ Match frontend URL

### Server Errors

- ✅ Check all environment variables are set
- ✅ Verify port 5000 is available
- ✅ Check console for error messages

## Production

1. Set `NODE_ENV=production`
2. Use secure email credentials
3. Configure proper CORS origins
4. Set up SSL/TLS for email
5. Use environment variables for all config

## That's It!

Simple email-only form submissions. No database, no admin dashboard, just forms → email! 🎉


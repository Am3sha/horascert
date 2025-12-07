# Quick Start Guide - Form Submission System

## 🎯 What's Been Implemented

✅ **Complete backend server** with Express, Prisma, and Nodemailer  
✅ **Database schema** with Applications and Admins tables  
✅ **Email notifications** to info@horas-cert.com  
✅ **Admin dashboard** at `/admin/applications`  
✅ **Form integration** - Both Application and Contact forms connected  
✅ **JWT authentication** for secure admin access  

## 🚀 Quick Setup (5 Steps)

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create `server/.env` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/horas_cert?schema=public"

# Email (Gmail example)
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
EMAIL_TO=info@horas-cert.com

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this

# Server
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

**For Gmail:** Use an App Password (not your regular password)
- Go to Google Account → Security → 2-Step Verification → App Passwords

### 3. Set Up Database

```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Create Admin User

```bash
cd server
node scripts/create-admin.js admin admin@horas-cert.com your-password
```

### 5. Start Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
# In root directory
npm start
```

## 📧 Email Configuration

The system supports both naming conventions:

**Preferred (as requested):**
```env
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
```

**Alternative (also supported):**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

Emails are sent to: `info@horas-cert.com` (configurable via `EMAIL_TO`)

## 🔐 Admin Dashboard

**URL:** `http://localhost:3000/admin/applications`

**Features:**
- Login with admin credentials
- View all form submissions
- Filter by certification type
- Filter by audit date
- View detailed information
- Pagination support

## 📝 Testing

1. **Test Application Form:**
   - Go to `/application`
   - Fill and submit
   - Check database and email

2. **Test Contact Form:**
   - Go to `/contact`
   - Fill and submit
   - Check database and email

3. **Test Admin Dashboard:**
   - Go to `/admin/applications`
   - Login and view submissions

## 📁 File Structure

```
server/
├── server.js              # Express server
├── config/
│   ├── database.js       # Prisma client
│   └── email.js          # Nodemailer config
├── routes/
│   ├── applications.js   # Form routes
│   └── auth.js           # Auth routes
├── middleware/
│   └── auth.js           # JWT middleware
├── prisma/
│   └── schema.prisma     # Database schema
└── scripts/
    └── create-admin.js   # Admin creation

src/
├── pages/
│   ├── Application.js    # Updated with API
│   └── AdminDashboard.js # New dashboard
└── components/
    └── ContactForm/
        └── ContactForm.js # Updated with API
```

## 🔍 API Endpoints

**Public:**
- `POST /api/applications` - Submit application form
- `POST /api/applications/contact` - Submit contact form
- `GET /api/health` - Health check

**Admin (Requires JWT):**
- `POST /api/auth/login` - Admin login
- `GET /api/applications` - List applications (with filters)
- `GET /api/applications/:id` - Get single application

## ⚠️ Troubleshooting

**Database connection failed:**
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

**Email not sending:**
- Verify MAIL_USER and MAIL_PASS
- For Gmail, use App Password
- Check network/firewall settings

**CORS errors:**
- Update CORS_ORIGIN in backend .env
- Match frontend URL

**Can't login to admin:**
- Verify admin user exists
- Check JWT_SECRET is set
- Clear browser localStorage

## 📚 Documentation

- **Detailed Setup:** `README_BACKEND.md`
- **Implementation Checklist:** `IMPLEMENTATION_CHECKLIST.md`
- **Quick Start:** This file

## ✨ Ready to Use!

Everything is implemented and ready. Just follow the 5 setup steps above and you're good to go!


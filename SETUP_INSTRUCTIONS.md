# MongoDB Connection Setup - Quick Guide

## ✅ What's Been Done

1. **MongoDB Client Setup** - Created connection client with connection pooling
2. **Database Models** - Created TypeScript interfaces for all collections
3. **Password Hashing** - Implemented bcrypt for secure password storage
4. **All API Routes Updated** - All routes now use MongoDB:
   - Authentication (login, register, logout)
   - Admission applications
   - Payments
   - Exam results
   - Student profiles

## 🔧 Setup Steps

### 1. Create `.env.local` File

Create a file named `.env.local` in the root directory with:

```env
MONGODB_URI=mongodb+srv://shajibislam3004:YOUR_ACTUAL_PASSWORD@cluster-1.lnfudjh.mongodb.net/?appName=Cluster-1
MONGODB_DB_NAME=sahin-chemistry
```

**⚠️ Important:** Replace `YOUR_ACTUAL_PASSWORD` with your actual MongoDB password.

### 2. Install Dependencies (Already Done)

The following packages have been installed:
- `mongodb` - MongoDB driver
- `bcrypt` - Password hashing
- `@types/bcrypt` - TypeScript types

### 3. Test the Connection

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Try registering a new user at `/register`
3. Check MongoDB Atlas to verify the user was created in the `users` collection

## 📊 Database Collections

The following collections will be automatically created:

- **users** - Student accounts
- **admissions** - Admission applications  
- **payments** - Payment records
- **examResults** - Exam submissions

## 🔒 Security Features

- ✅ Passwords are hashed with bcrypt (10 salt rounds)
- ✅ Email addresses are stored in lowercase
- ✅ Input validation on all API routes
- ✅ Error handling and logging

## 📝 Next Steps

1. **Set your MongoDB password** in `.env.local`
2. **Whitelist your IP** in MongoDB Atlas (if needed)
3. **Test registration** to verify connection
4. **Optional:** Add JWT authentication for secure API access

## 🐛 Troubleshooting

### Connection Error
- Verify password in `.env.local` is correct
- Check MongoDB Atlas IP whitelist
- Ensure connection string format is correct

### Authentication Issues
- Make sure username and password in connection string are correct
- Verify database user has proper permissions

### Collections Not Appearing
- Collections are created automatically on first insert
- No manual collection creation needed

## 📚 For More Details

See `MONGODB_SETUP.md` for detailed database schema documentation.


# MongoDB Setup Instructions

## 1. Create Environment File

Create a `.env.local` file in the root directory of your project with the following content:

```env
MONGODB_URI=mongodb+srv://shajibislam3004:YOUR_PASSWORD@cluster-1.lnfudjh.mongodb.net/?appName=Cluster-1
MONGODB_DB_NAME=sahin-chemistry
```

**Important:** Replace `YOUR_PASSWORD` with your actual MongoDB password.

## 2. MongoDB Collections

The following collections will be automatically created when data is inserted:

- **users** - Stores student user accounts
- **admissions** - Stores admission applications
- **payments** - Stores payment records
- **examResults** - Stores exam submission results

## 3. Database Structure

### Users Collection
```typescript
{
  _id: ObjectId,
  name: string,
  email: string (unique, lowercase),
  phone: string,
  password: string (hashed with bcrypt),
  studentId: string (unique),
  role: 'student' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

### Admissions Collection
```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  phone: string,
  course: string,
  paymentMethod: 'bkash' | 'nagad' | 'bank' | 'cash',
  transactionId?: string,
  status: 'pending' | 'approved' | 'rejected',
  createdAt: Date,
  updatedAt: Date
}
```

### Payments Collection
```typescript
{
  _id: ObjectId,
  userId?: string,
  name: string,
  email: string,
  phone: string,
  amount: number,
  purpose: 'admission' | 'tuition' | 'exam' | 'other',
  paymentMethod: 'bkash' | 'nagad' | 'bank' | 'cash',
  transactionId?: string,
  status: 'pending' | 'verified' | 'failed',
  verifiedAt?: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### ExamResults Collection
```typescript
{
  _id: ObjectId,
  userId?: string,
  examId: string,
  answers: Record<number, number>,
  score: number,
  totalPoints: number,
  percentage: number,
  correctAnswers: number,
  totalQuestions: number,
  timeSpent: number,
  submittedAt: Date,
  createdAt: Date
}
```

## 4. Security Notes

1. **Never commit `.env.local`** - It contains sensitive credentials
2. **Password Hashing** - All passwords are hashed using bcrypt (10 salt rounds)
3. **Email Uniqueness** - Email addresses are stored in lowercase and must be unique
4. **Connection Pooling** - MongoDB client is reused across requests for better performance

## 5. Testing Connection

After setting up, test the connection by:
1. Starting the development server: `npm run dev`
2. Registering a new user through the registration page
3. Checking MongoDB Atlas to see if the user was created

## 6. Troubleshooting

### Connection Error
- Verify your MongoDB password is correct
- Check if your IP address is whitelisted in MongoDB Atlas
- Ensure the connection string format is correct

### Authentication Error
- Make sure the username and password in the connection string are correct
- Check if the database user has proper permissions

### Collection Not Found
- Collections are created automatically on first insert
- No need to manually create collections


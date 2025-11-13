# API Documentation

This directory contains all API routes for the Sahin Chemistry Center application.

## API Structure

### Authentication APIs (`/api/auth`)

#### POST `/api/auth/login`
Login a student user.

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "email": "student@example.com",
      "name": "Student Name",
      "studentId": "STU123456"
    },
    "token": "jwt-token-here"
  },
  "message": "Login successful"
}
```

#### POST `/api/auth/register`
Register a new student.

**Request Body:**
```json
{
  "name": "Student Name",
  "email": "student@example.com",
  "phone": "01712345678",
  "password": "password123"
}
```

#### GET `/api/auth/me`
Get current authenticated user.

#### POST `/api/auth/logout`
Logout current user.

---

### Admission API (`/api/admission`)

#### POST `/api/admission`
Submit admission application.

**Request Body:**
```json
{
  "name": "Student Name",
  "email": "student@example.com",
  "phone": "01712345678",
  "course": "Organic Chemistry",
  "paymentMethod": "bkash",
  "transactionId": "TXN123456"
}
```

---

### Payment APIs (`/api/payments`)

#### POST `/api/payments`
Submit payment information.

**Request Body:**
```json
{
  "name": "Student Name",
  "email": "student@example.com",
  "phone": "01712345678",
  "amount": 5000,
  "purpose": "admission",
  "paymentMethod": "bkash",
  "transactionId": "TXN123456"
}
```

#### GET `/api/payments`
Get payment history (requires authentication).

---

### Exam APIs (`/api/exams`)

#### GET `/api/exams`
Get list of all available exams.

#### GET `/api/exams/[id]`
Get specific exam details.

#### POST `/api/exams/[id]/submit`
Submit exam answers.

**Request Body:**
```json
{
  "answers": {
    "1": 1,
    "2": 0,
    "3": 2
  }
}
```

---

### Student APIs (`/api/student`)

#### GET `/api/student/profile`
Get student profile (requires authentication).

#### PUT `/api/student/profile`
Update student profile (requires authentication).

---

## Implementation Notes

1. **Authentication**: Currently using demo authentication. Replace with actual database queries and JWT tokens.

2. **Database**: All routes have TODO comments indicating where to add database operations.

3. **Error Handling**: All routes include proper error handling and validation.

4. **Environment Variables**: Use `.env.local` for local development (see `.env.example`).

5. **Production**: 
   - Implement JWT token verification
   - Add database connections
   - Add payment gateway integrations
   - Add email notifications
   - Add rate limiting
   - Add CORS configuration


# How to Create an Admin User

## Method 1: Using the API Endpoint (Recommended)

1. Make sure your development server is running:
   ```bash
   npm run dev
   ```

2. Open your browser and go to: `http://localhost:3000`

3. Open the browser console (F12) and run this command:

```javascript
fetch('/api/admin/create-admin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '1234567890',
    password: 'admin123'
  })
})
.then(res => res.json())
.then(data => {
  console.log('Result:', data);
  if (data.success) {
    alert('Admin user created successfully! You can now login.');
  } else {
    alert('Error: ' + data.error);
  }
});
```

4. Replace the email and password with your desired admin credentials.

5. After creating the admin user, go to `/login` and login with those credentials.

6. You will be automatically redirected to `/admin` dashboard.

## Method 2: Update Existing User in MongoDB

If you already have a user account, you can update it to admin:

1. Connect to your MongoDB database (MongoDB Atlas or local MongoDB)

2. Run this command in MongoDB shell or Compass:

```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

Replace `"your-email@example.com"` with your actual email.

3. Logout and login again to refresh your session.

## Method 3: Using MongoDB Compass or Atlas UI

1. Open MongoDB Compass or MongoDB Atlas
2. Connect to your database
3. Navigate to the `users` collection
4. Find the user you want to make admin
5. Edit the document and add or update the `role` field to `"admin"`
6. Save the document
7. Logout and login again

## Troubleshooting

- If you get redirected to `/student` instead of `/admin`, make sure:
  1. The user's `role` field in the database is set to `"admin"` (not `"Admin"` or `"ADMIN"`)
  2. You have logged out and logged back in after updating the role
  3. Clear your browser's localStorage: `localStorage.clear()` in console

- If the admin dashboard shows "Loading..." forever:
  1. Check the browser console for errors
  2. Make sure MongoDB connection is working
  3. Check that the API routes are accessible







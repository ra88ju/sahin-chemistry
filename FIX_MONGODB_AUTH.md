# Fix MongoDB Authentication Error

## Error: "bad auth : authentication failed"

This error occurs when MongoDB cannot authenticate with the provided credentials.

## Solution

### Step 1: Create `.env.local` file

Create a file named `.env.local` in the root directory of your project with the following content:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/?appName=Cluster
MONGODB_DB_NAME=sahin-chemistry
```

### Step 2: Get Your MongoDB Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Log in to your account
3. Click on "Connect" for your cluster
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your actual MongoDB password
7. Replace `<dbname>` with `sahin-chemistry` or remove it

### Step 3: URL-Encode Special Characters

If your password contains special characters, you must URL-encode them:

- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`
- `?` → `%3F`

**Example:**
- Password: `My@Pass#123`
- URL-encoded: `My%40Pass%23123`

### Step 4: Update Your Connection String

Your final connection string should look like:

```
MONGODB_URI=mongodb+srv://username:My%40Pass%23123@cluster-1.lnfudjh.mongodb.net/?appName=Cluster-1
```

### Step 5: Restart Your Development Server

After creating/updating `.env.local`:

1. Stop your development server (Ctrl+C)
2. Start it again: `npm run dev`
3. Try creating the admin user again

## Test Your Connection

You can test your MongoDB connection by visiting:
```
http://localhost:3000/api/test-db
```

If the connection is successful, you'll see:
```json
{
  "success": true,
  "message": "Database connection successful",
  "data": {
    "userCount": 0
  }
}
```

## Common Issues

### Issue 1: Password Not URL-Encoded
**Error:** `authentication failed`
**Solution:** Make sure special characters in your password are URL-encoded

### Issue 2: Wrong Username or Password
**Error:** `authentication failed`
**Solution:** Double-check your MongoDB Atlas username and password

### Issue 3: IP Address Not Whitelisted
**Error:** `IP not whitelisted`
**Solution:** 
1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Add `0.0.0.0/0` to allow all IPs (for development) or your specific IP

### Issue 4: .env.local Not Loaded
**Error:** Still using default connection string
**Solution:** 
1. Make sure `.env.local` is in the root directory (same level as `package.json`)
2. Restart your development server
3. Make sure the file is not named `.env.local.txt` (Windows sometimes adds .txt)

## Quick Fix: Use Default Connection

If you want to use the default connection string in the code (not recommended for production):

1. Update `app/lib/mongodb.ts` with your actual credentials
2. Make sure to URL-encode special characters in the password

## Need Help?

1. Check MongoDB Atlas dashboard for your connection string
2. Verify your database user has read/write permissions
3. Check the server logs for detailed error messages
4. Test connection at `/api/test-db` endpoint




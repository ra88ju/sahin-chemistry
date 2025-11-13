# MongoDB Password Encoding Guide

## The Problem

If your MongoDB password contains special characters like `@`, `#`, `%`, etc., they need to be URL-encoded in the connection string.

## Special Characters Encoding

- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- `:` → `%3A`
- `/` → `%2F`
- `?` → `%3F`
- `&` → `%26`
- `=` → `%3D`
- `+` → `%2B`
- ` ` (space) → `%20`

## Example

If your password is: `Shajib@123`

The encoded password in connection string should be: `Shajib%40123`

## Connection String Format

```
mongodb+srv://username:ENCODED_PASSWORD@cluster.mongodb.net/?appName=AppName
```

## For Your Case

Password: `Shajib@123`
Encoded: `Shajib%40123`

Full connection string:
```
mongodb+srv://shajibislam3004:Shajib%40123@cluster-1.lnfudjh.mongodb.net/?appName=Cluster-1
```

## Best Practice: Use .env.local

Instead of hardcoding, create `.env.local`:

```env
MONGODB_URI=mongodb+srv://shajibislam3004:Shajib%40123@cluster-1.lnfudjh.mongodb.net/?appName=Cluster-1
MONGODB_DB_NAME=sahin-chemistry
```

This keeps your password secure and out of version control.


import bcrypt from 'bcrypt';

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Verify password
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate student ID
export function generateStudentId(): string {
  const timestamp = Date.now().toString();
  return `STU${timestamp.slice(-6)}`;
}


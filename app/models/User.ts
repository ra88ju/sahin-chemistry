export interface User {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string; // Hashed password
  studentId: string;
  role?: 'student' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserWithoutPassword extends Omit<User, 'password'> {}


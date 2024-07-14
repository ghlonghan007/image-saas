// utils/password.ts

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function saltAndHashPassword(plainPassword: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error salting and hashing password:', error);
    throw new Error('Failed to hash password');
  }
}
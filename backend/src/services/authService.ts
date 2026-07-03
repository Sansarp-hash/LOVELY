import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { TokenPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

export class AuthService {
  /**
   * Register a new user
   */
  async register(data: {
    name: string;
    email: string;
    password: string;
    dob: Date;
    countryCode: string;
    preferredLanguage: string;
  }) {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Calculate age
    const today = new Date();
    let age = today.getFullYear() - data.dob.getFullYear();
    const monthDiff = today.getMonth() - data.dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < data.dob.getDate())) {
      age--;
    }

    // Check age requirement
    if (age < 15) {
      throw new Error('User must be at least 15 years old');
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(data.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        dob: data.dob,
        countryCode: data.countryCode,
        preferredLanguage: data.preferredLanguage,
        ageVerified: age >= 18,
        role: 'free_verified',
        coinBalance: 0n,
      },
    });

    // Generate token
    const token = this.generateToken(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        ageVerified: user.ageVerified,
        premiumStatus: user.premiumStatus,
      },
      accessToken: token,
    };
  }

  /**
   * Login user
   */
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Check if banned
    if (user.role === 'banned') {
      throw new Error('Account has been suspended');
    }

    // Generate token
    const token = this.generateToken(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        ageVerified: user.ageVerified,
        premiumStatus: user.premiumStatus,
      },
      accessToken: token,
    };
  }

  /**
   * Verify email token
   */
  async verifyEmail(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
      await prisma.user.update({
        where: { id: decoded.userId },
        data: { emailVerified: true },
      });
      return { success: true };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Generate JWT token
   */
  generateToken(userId: string, email: string, role: string): string {
    return jwt.sign(
      {
        userId,
        email,
        role,
      } as TokenPayload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );
  }

  /**
   * Verify and decode token
   */
  verifyToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
      return null;
    }
  }
}

export default new AuthService();

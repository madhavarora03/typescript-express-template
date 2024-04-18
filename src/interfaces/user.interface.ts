import { Document, Model } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isVerified: boolean;
  avatar: string;
  refreshToken?: string;

  // password reset and email verification
  verifyToken?: string;
  verifyTokenExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;

  // timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserMethods {
  comparePassword: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

export interface UserModel extends Model<UserDocument, UserMethods> {}

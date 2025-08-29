import User, * as UserModel from '../models/User.ts';

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class UserService {
  // Create a new user
  static async createUser(userData: {
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'superadmin';
  }): Promise<UserModel.IUser> {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = new User(userData);
    return await user.save();
  }

  // Get user by ID
  static async getUserById(id: string): Promise<UserModel.IUser | null> {
    return await User.findById(id).select('-password');
  }

  // Get user by email
  static async getUserByEmail(email: string): Promise<UserModel.IUser | null> {
    return await User.findOne({ email }).select('-password');
  }

  // Get all users (for superadmin)
  static async getAllUsers(): Promise<UserModel.IUser[]> {
    return await User.find({}).select('-password').sort({ createdAt: -1 });
  }

  // Update user
  static async updateUser(
    id: string,
    updateData: Partial<{
      name: string;
      email: string;
      role: 'admin' | 'superadmin';
    }>
  ): Promise<UserModel.IUser | null> {
    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    return user;
  }

  // Delete user
  static async deleteUser(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id);
    return !!result;
  }

  // Authenticate user
  static async authenticateUser(email: string, password: string): Promise<{
    user: UserModel.IUser;
    token: string;
  } | null> {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return null;
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      user: user.toJSON() as UserModel.IUser,
      token
    };
  }

  // Change password
  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    user.password = newPassword;
    await user.save();
    return true;
  }

  // Get users by role
  static async getUsersByRole(role: 'admin' | 'superadmin'): Promise<UserModel.IUser[]> {
    return await User.find({ role }).select('-password').sort({ createdAt: -1 });
  }
}


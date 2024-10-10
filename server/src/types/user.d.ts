import { Document } from "mongoose";

export interface IUser extends Document {
  id?: string;
  email: string;
  password: string;
  userName: string;
  profilePictureUrl: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  comparePassword(password: string): Promise<boolean>;
}

export interface IUserProfile extends Document {
  email: string;
  userName: string;
  profilePictureUrl: string;
}

export interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any;
}

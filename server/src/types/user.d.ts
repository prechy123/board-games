import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  userName: string;
  profilePictureUrl: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  comparePassword(password: string): Promise<boolean>;
}

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import type { HookNextFunction, IUser } from "../types/user.js";

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: String,
  profilePictureUrl: {
    type: String,
    default: "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Hash the password before saving
UserSchema.pre<IUser>("save", async function (next: HookNextFunction) {
  const user = this as IUser
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// Add a method to compare passwords
UserSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  const user = this as IUser
  return bcrypt.compare(password, user.password);
};

export default mongoose.model<IUser>("User", UserSchema);

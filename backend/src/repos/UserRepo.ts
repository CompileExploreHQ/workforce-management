import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  sub: string;
  password: string;
  roles: string[];
  profilePicture?: string;
  mobile?: string;
  dob?: Date;
  department?: string;
  company?: string;
  joiningDate?: Date;
  workspaceId?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    sub: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: String, required: true }],
    profilePicture: { type: String },
    mobile: { type: String },
    dob: { type: Date },
    department: { type: String },
    company: { type: String },
    joiningDate: { type: Date },
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace" },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;

import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  email: string;
  sub: string;
  password: string;
  role: "SuperAdmin" | "WorkspaceAdmin" | "Employee";
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

const EmployeeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    sub: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["SuperAdmin", "WorkspaceAdmin", "Employee"],
      required: true,
    },
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

const Employee = mongoose.model<IEmployee>("Employee", EmployeeSchema);
export default Employee;

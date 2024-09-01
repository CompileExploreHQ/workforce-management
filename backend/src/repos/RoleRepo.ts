import mongoose, { Schema, Document, model } from "mongoose";

export interface IRole extends Document {
  roleName: string;
  permissions: string[];
}

const RoleSchema: Schema<IRole> = new Schema({
  roleName: { type: String, required: true, unique: true },
  permissions: [{ type: String, required: true }],
});

// Create and export the model
const Role = model<IRole>("Role", RoleSchema);
export default Role;

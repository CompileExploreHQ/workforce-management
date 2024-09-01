import mongoose, { Schema, Document, model } from "mongoose";

export interface IPermission extends Document {
  permissionName: string;
  description: string;
}

const PermissionSchema: Schema<IPermission> = new Schema({
  permissionName: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

const Permission = model<IPermission>("Permission", PermissionSchema);
export default Permission;

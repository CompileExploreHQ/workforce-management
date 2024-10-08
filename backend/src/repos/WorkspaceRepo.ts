import mongoose, { Schema, Document } from "mongoose";

export interface IWorkspace extends Document {
  logo: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const WorkspaceSchema: Schema = new Schema({
  logo: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
});

const Workspace = mongoose.model<IWorkspace>("Workspace", WorkspaceSchema);

export default Workspace;

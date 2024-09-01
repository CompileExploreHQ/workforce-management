export enum Permissions {
  // User
  UserCreate = "user:create",
  UserRead = "user:read",
  UserEdit = "user:edit",

  // Workspace
  WorkspaceCreate = "workspace:create",
  WorkspaceRead = "workspace:read",
  WorkspaceEdit = "workspace:edit",
}

export enum Roles {
  Employee = "Employee",
  SuperAdmin = "SuperAdmin",
  WorkspaceAdmin = "WorkspaceAdmin",
}

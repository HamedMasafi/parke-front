export const Role = {
  None: '',
  Admin: 'Admin',
  Manager: 'Manager',
  User: 'User'
}

export const RoleValues = {
  None: '',
  Admin: 2,
  Manager: 1,
  User: 0
}

export function RoleNameToValue(role) {
  switch (role) {
    case Role.Admin:
      return RoleValues.Admin;
    case Role.Manager:
      return RoleValues.Manager;
    case Role.User:
      return RoleValues.User;
  }

  return -1;
}

export function RoleValueToName(role) {
  if (role === RoleValues.Admin) return Role.Admin;
  if (role === RoleValues.Manager) return Role.Manager;
  if (role === RoleValues.User) return Role.User;

  return Role.None
}

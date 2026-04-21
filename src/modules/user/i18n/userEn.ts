import type { UserI18nSchema } from './userEs';

export const usersEn: UserI18nSchema = {
  user: {
    page: {
      title: 'System Users',
      subtitleAll: 'Management of all system users',
      subtitleLocation: 'Management of users at: {location}',
    },
    search: 'Search',
    locationPlaceholder: 'Location',

    headers: {
      fullName: 'Name',
      userName: 'User ID',
      roles: 'Roles',
      active: 'Active',
      location: 'Location',
      actions: 'Actions',
    },

    status: {
      active: 'Active',
      inactive: 'Inactive',
    },

    actions: {
      add: 'New User',
      edit: 'Edit User',
      delete: 'Delete User',
    },

    dialog: {
      titleNew: 'New User',
      titleEdit: 'Edit User',
      titlePassword: 'Change Password',
      titleRole: 'Change Role',
      deleteTitle: 'Delete {name}',
      deleteMessage: 'Do you want to delete this user?',
      errorMessage: 'An error occurred while deleting the user',
      successMessage: 'User successfully deleted',
    },

    form: {
      generalData: 'General Data',
      userData: 'User Data',
      contactInfo: 'Contact Information',

      firstName: 'First name(s) *',
      lastName: 'Last name(s) *',
      userName: 'User ID *',
      password: 'Password *',
      changePassword: 'Change Password',
      roles: 'Select a role *',
      location: 'Location *',
      active: 'Active',
      mobilePhone: 'Mobile phone',
      phoneOffice: 'Office phone',
      phoneExt: 'Extension',
      email: 'Email *',

      oldPassword: 'Current Password *',
      newPassword: 'New Password *',
      showFields: 'Show fields',
    },

    notifications: {
      created: 'User created successfully',
      updated: 'User updated successfully',
      deleted: 'User deleted successfully',
      passwordUpdated: 'Password updated',
      deleteError: 'Could not delete the user',
    },
  },
};

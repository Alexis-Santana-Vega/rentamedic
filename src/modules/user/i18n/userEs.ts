export const userEs = {
  user: {
    page: {
      title: 'Usuarios Sistema',
      subtitleAll: 'Gestión de todos los usuarios del sistema',
      subtitleLocation: 'Gestión de los usuarios de: {location}',
    },
    search: 'Buscar',
    locationPlaceholder: 'Locación',

    headers: {
      fullName: 'Nombre',
      userName: 'ID Usuario',
      roles: 'Roles',
      active: 'Activo',
      location: 'Locación',
      actions: 'Acciones',
    },

    status: {
      active: 'Activo',
      inactive: 'Inactivo',
    },

    actions: {
      add: 'Nuevo Usuario',
      edit: 'Editar Usuario',
      delete: 'Eliminar Usuario',
    },

    dialog: {
      titleNew: 'Nuevo Usuario',
      titleEdit: 'Editar Usuario',
      titlePassword: 'Cambiar Contraseña',
      titleRole: 'Cambiar Rol',
      deleteTitle: 'Eliminar {name}',
      deleteMessage: '¿Desea eliminar a este usuario?',
      errorMessage: 'Ha ocurrido un error al eliminar al usuario',
      successMessage: 'Usuario eliminado con éxito',
    },

    form: {
      generalData: 'Datos Generales',
      userData: 'Datos de Usuario',
      contactInfo: 'Información de Contacto',

      firstName: 'Nombre(s) *',
      lastName: 'Apellido(s) *',
      userName: 'ID Usuario *',
      password: 'Contraseña *',
      changePassword: 'Cambiar Contraseña',
      roles: 'Selecciona un rol *',
      location: 'Locación *',
      active: 'Activo',
      mobilePhone: 'Tel. Móvil',
      phoneOffice: 'Tel. Oficina',
      phoneExt: 'Extensión',
      email: 'Email *',

      oldPassword: 'Contraseña Actual *',
      newPassword: 'Nueva Contraseña *',
      showFields: 'Mostrar campos',
    },

    notifications: {
      created: 'Usuario creado con éxito',
      updated: 'Usuario editado con éxito',
      deleted: 'Usuario eliminado con éxito',
      passwordUpdated: 'Contraseña actualizada',
      deleteError: 'No fue posible eliminar al usuario',
    },
  },
};

export type UserI18nSchema = typeof userEs;

export const supplierEs = {
  supplier: {
    page: {
      title: 'Proveedores',
      subtitle: 'Gestión de proveedores',
    },
    search: 'Buscar',
    headers: {
      name: 'Nombre',
      mobilePhone: 'Tel. Móvil',
      email: 'Correo Electrónico',
      status: 'Status',
      actions: 'Acciones',
    },
    table: {
      active: 'Activo',
      inactive: 'Inactivo',
    },
    actions: {
      add: 'Nuevo Proveedor',
      edit: 'Editar Proveedor',
      delete: 'Eliminar Proveedor',
    },
    dialog: {
      titleNew: 'Nuevo Proveedor',
      titleEdit: 'Editar Proveedor',
      deleteTitle: 'Eliminar {name}',
      deleteMessage: '¿Desea eliminar a este proveedor?',
    },
    form: {
      generalData: 'Datos Generales',
      contactInfo: 'Información de Contacto',
      address: 'Dirección',

      name: 'Nombre Comercial / Razón Social *',
      rfc: 'RFC *',
      active: 'Proveedor Activo',
      contactName: 'Nombre Contacto *',
      mobilePhone: 'Tel. Móvil *',
      phoneOffice: 'Tel. Oficina',
      phoneExt: 'Extensión',
      email: 'Email *',
      country: 'País *',
      state: 'Estado/Provincia *',
      zipCode: 'Código Postal *',
      city: 'Ciudad *',
      neighborhood: 'Colonia *',
      addressLine: 'Dirección *',
    },
    notifications: {
      created: 'Proveedor creado con éxito',
      updated: 'Proveedor editado con éxito',
      deleted: 'Proveedor eliminado con éxito',
      deleteError: 'No fue posible eliminar al proveedor',
    },
    summary: {
      total: 'Total de proveedores',
      active: 'Proveedores activos',
      inactive: 'Proveedores inactivos',
    },
  },
};

export type SupplierI18nSchema = typeof supplierEs;

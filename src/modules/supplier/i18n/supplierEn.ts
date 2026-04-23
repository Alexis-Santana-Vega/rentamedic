import type { SupplierI18nSchema } from './supplierEs';

export const supplierEn: SupplierI18nSchema = {
  supplier: {
    page: {
      title: 'Suppliers',
      subtitle: 'Supplier Management',
    },
    search: 'Search',
    headers: {
      name: 'Name',
      mobilePhone: 'Mobile Phone',
      email: 'Email Address',
      status: 'Status',
      actions: 'Actions',
    },
    table: {
      active: 'Active',
      inactive: 'Inactive',
    },
    actions: {
      add: 'New Supplier',
      edit: 'Edit Supplier',
      delete: 'Delete Supplier',
    },
    dialog: {
      titleNew: 'New Supplier',
      titleEdit: 'Edit Supplier',
      deleteTitle: 'Delete {name}',
      deleteMessage: 'Are you sure you want to delete this supplier?',
    },
    form: {
      generalData: 'General Data',
      contactInfo: 'Contact Information',
      address: 'Address',

      name: 'Trade Name / Legal Name *',
      rfc: 'Tax ID (RFC) *',
      active: 'Active Supplier',
      contactName: 'Contact Name *',
      mobilePhone: 'Mobile Phone *',
      phoneOffice: 'Office Phone',
      phoneExt: 'Extension',
      email: 'Email *',
      country: 'Country *',
      state: 'State/Province *',
      zipCode: 'Zip Code *',
      city: 'City *',
      neighborhood: 'Neighborhood *',
      addressLine: 'Address *',
    },
    notifications: {
      created: 'Supplier successfully created',
      updated: 'Supplier successfully updated',
      deleted: 'Supplier successfully deleted',
      deleteError: 'The supplier could not be deleted',
    },
    summary: {
      total: 'Total suppliers',
      active: 'Active suppliers',
      inactive: 'Inactive suppliers',
    },
  },
};

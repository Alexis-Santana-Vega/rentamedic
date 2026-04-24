import type { OutboundI18nSchema } from './OutboundEs';

export const outboundEn: OutboundI18nSchema = {
  outbound: {
    page: {
      title: 'Equipment Outbound',
      subtitle: 'Register and manage equipment inventory stock-outs',
    },
    search: 'Search',
    headers: {
      folio: 'Folio',
      outboundType: 'Outbound Type',
      datetime: 'Date & Time',
      totalAmount: 'Invoice Amount',
      actions: 'Actions',
    },
    actions: {
      add: 'New Outbound',
      edit: 'Edit Outbound',
      delete: 'Delete Outbound',
      expand: 'Expand Details',
      discardEquipment: 'Discard Outbound',
      generateOutbound: 'Generate Outbound',
      scanEquipment: 'Scan Equipment',
      addEquipmentManually: 'Add Equipment Manually',
    },
    dialog: {
      titleNew: 'New Outbound',
      titleEdit: 'Edit Outbound',
      deleteTitle: 'Delete {name}',
      deleteMessage: 'Are you sure you want to delete this outbound entry?',
    },
    form: {
      folio: 'Folio',
      datetime: 'Dispatch Date',
      outboundType: 'Outbound Type *',
      destinationLocation: 'Destination Location *',
      purchaser: 'Purchaser *',
      note: 'Note',
      totalAmount: 'Invoice Amount *',
      equipmentTitle: 'Equipment Dispatch',
      headers: {
        barcode: 'Barcode',
        name: 'Equipment Name',
        quantity: 'Quantity',
        actions: 'Actions',
      },
    },
    notifications: {
      outboundCreated: 'Outbound entry successfully created',
      outboundUpdated: 'Outbound entry successfully updated',
      outboundDeleted: 'Outbound entry successfully deleted',
      outboundDeletedError: 'Error deleting outbound entry',
      equipmentNotFound: 'Equipment not found',
      outboundDiscarded: 'Outbound entry discarded',
    },
    type: {
      transfer: 'Transfer',
      sale: 'Sale',
    },
  },
};

export const outboundEs = {
  outbound: {
    page: {
      title: 'Salida de Equipos',
      subtitle: 'Registra y gestiona la salida de equipos al inventario',
    },
    search: 'Buscar',
    headers: {
      folio: 'Folio',
      outboundType: 'Tipo de Salida',
      datetime: 'Fecha y Hora',
      totalAmount: 'Monto de Factura',
      actions: 'Acciones',
    },
    actions: {
      add: 'Nueva Salida',
      edit: 'Editar Salida',
      delete: 'Eliminar Salida',
      expand: 'Expandir Detalles',
      discardEquipment: 'Descartar salida',
      generateOutbound: 'Generar Salida',
      scanEquipment: 'Escanear Equipo',
      addEquipmentManually: 'Agregar Equipo Manualmente',
    },
    dialog: {
      titleNew: 'Nueva Salida',
      titleEdit: 'Editar Salida',
      deleteTitle: 'Eliminar {name}',
      deleteMessage: '¿Desea eliminar esta salida?',
    },
    form: {
      folio: 'Folio',
      datetime: 'Día Salida',
      outboundType: 'Tipo de Salida *',
      destinationLocation: 'Ubicación de Destino *',
      purchaser: 'Comprador *',
      note: 'Nota',
      totalAmount: 'Monto de Factura *',
      equipmentTitle: 'Salida de Equipo',
      headers: {
        barcode: 'Código de Barras',
        name: 'Nombre del Equipo',
        quantity: 'Cantidad',
        actions: 'Acciones',
      },
    },
    notifications: {
      outboundCreated: 'Salida creada con éxito',
      outboundUpdated: 'Salida editada con éxito',
      outboundDeleted: 'Salida eliminada con éxito',
      outboundDeletedError: 'Error al eliminar la salida',
      equipmentNotFound: 'Equipo no encontrado',
      outboundDiscarded: 'Salida descartada',
    },
    type: {
      transfer: 'Transferencia',
      sale: 'Venta',
    },
  },
};

export type OutboundI18nSchema = typeof outboundEs;

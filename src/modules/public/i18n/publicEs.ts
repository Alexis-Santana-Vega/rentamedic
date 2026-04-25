export const publicEs = {
  public: {
    home: {
      title: 'Renta de Equipo Médico',
      subtitle: 'Tu equipo médico, en un solo clic.',
      button: 'Comienza a Explorar',
      cta: {
        title: '¿Listo para explorar?',
        button: 'Buscar Equipo',
      },
      features: {
        catalog: {
          title: 'Catálogo Extenso',
          description:
            'Explora una amplia gama de equipo médico incluyendo concentradores de oxígeno, camas hospitalarias, monitores y más.',
        },
        availability: {
          title: 'Disponibilidad en Tiempo Real',
          description:
            'Verifica la disponibilidad y estado del stock del equipo instantáneamente sin esperas.',
        },
        easy: {
          title: 'Fácil de Ordenar',
          description: 'Completa tu solicitud de renta o compra en solo unos pocos pasos simples.',
        },
        support: {
          title: 'Soporte Especial',
          description:
            'Obtén asistencia cuando la necesites. Nuestro equipo siempre está listo para ayudarte.',
        },
      },
      whyChoose: '¿Por Qué Elegir Rentamedic?',
    },
    aboutUs: {
      title: 'Acerca de Nosotros',
      mission: {
        title: 'Nuestra Misión',
        description:
          'En Rentamedic, nuestra misión es hacer que la renta de equipo médico sea accesible, asequible y sin complicaciones para individuos, clínicas y organizaciones en la región.',
      },
      vision: {
        title: 'Nuestra Visión',
        description:
          'Imaginamos un mundo donde todos tienen fácil acceso a equipo médico de calidad sin cargas financieras, fomentando mejores resultados de salud y una calidad de vida mejorada.',
      },
      values: {
        title: 'Nuestros Valores',
        accessibility: {
          name: 'Accesibilidad',
          description: 'Hacer que el equipo de atención médica esté disponible para todos.',
        },
        reliability: {
          name: 'Confiabilidad',
          description: 'Calidad consistente y servicio dependable.',
        },
        transparency: {
          name: 'Transparencia',
          description: 'Comunicación clara y prácticas honestas.',
        },
        excellence: {
          name: 'Excelencia',
          description: 'Mejora continua en todo lo que hacemos.',
        },
      },
      team: {
        title: 'Nuestro Equipo',
        description:
          'Rentamedic es construido por un equipo dedicado de profesionales de salud, expertos en tecnología y especialistas en servicio al cliente.',
        members: {
          expertManagement: {
            name: 'Gestión Experta',
            role: 'Liderazgo',
            description: 'Profesionales experimentados liderando la visión hacia adelante.',
          },
          healthSpecialists: {
            name: 'Especialistas en Salud',
            role: 'Equipo de Producto',
            description: 'Conocimiento profundo del equipo médico y necesidades del paciente.',
          },
          customerSupport: {
            name: 'Soporte al Cliente',
            role: 'Equipo de Soporte',
            description: 'Dedicados a garantizar la satisfacción del cliente.',
          },
        },
      },
    },
    contact: {
      title: 'Ponte en Contacto',
      subtitle: '¿Tienes preguntas? Nos encantaría escucharte.',
      form: {
        nameLabel: 'Nombre Completo',
        namePlaceholder: 'Ingresa tu nombre completo',
        emailLabel: 'Correo Electrónico',
        emailPlaceholder: 'Ingresa tu correo electrónico',
        phoneLabel: 'Número de Teléfono',
        phonePlaceholder: 'Ingresa tu número de teléfono',
        subjectLabel: 'Asunto',
        subjectPlaceholder: '¿De qué se trata?',
        messageLabel: 'Mensaje',
        messagePlaceholder: 'Cuéntanos tu mensaje...',
        submit: 'Enviar Mensaje',
        success: '¡Gracias! Tu mensaje ha sido enviado exitosamente.',
        error: 'Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.',
      },
      info: {
        title: 'Información de Contacto',
        email: 'Correo Electrónico',
        phone: 'Teléfono',
        address: 'Dirección',
      },
      support: {
        title: 'Horario de Atención',
        week: {
          title: 'Lunes a Viernes',
          schedule: '8:00 AM - 6:00 PM',
        },
        saturday: {
          title: 'Sábado',
          schedule: '9:00 AM - 1:00 PM',
        },
        sunday: {
          title: 'Domingo',
          schedule: 'Cerrado',
        },
      },
    },
    search: {
      pageTitle: 'Buscar Equipo',
      searchCard: 'Buscar',
      searchByName: 'Buscar por Nombre',
      filtersCard: 'Filtros',
      offerLabel: 'Oferta de Producto',
      offerRent: 'Renta',
      offerSale: 'Venta',
      categoriesLabel: 'Categorías',
      priceMin: 'Precio Mínimo',
      priceMax: 'Precio Máximo',
      resultsTitle: 'Resultados de la búsqueda',

      chipRent: 'Renta',
      chipSale: 'Venta',

      dialog: {
        title: 'Detalles',
        tabRent: 'Renta',
        tabSale: 'Venta',
        costPerDay: 'Costo por Día:',
        salePrice: 'Precio de Venta:',
        quantity: 'Cantidad',
        rentalDays: 'Tiempo de Renta (Días)',
        addToCart: 'Añadir al Carrito',
        rentNow: 'Rentar Equipo Ahora',
        buyNow: 'Comprar Equipo Ahora',
        description: 'Descripción',
      },

      notifications: {
        addedToCart: '{name} agregado al carrito',
      },
    },
  },
};

export type PublicI18nSchema = typeof publicEs;

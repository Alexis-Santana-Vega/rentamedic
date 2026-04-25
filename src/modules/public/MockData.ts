import type { SearchResponse } from './types/publicTypes';

export const mockSearch: SearchResponse[] = [
  {
    id: 's1111111-1111-4111-8111-111111111111',
    name: 'Centrimax 12K',
    rentalPrice: 1200,
    salePrice: 25000,
    brand: 'MedTech',
    photoUrl: [
      'https://www.velaquin.com.mx/cdn/shop/products/Pro-12M-2_600x.jpg?v=1652292451',
      'https://www.rorer.mx/cdn/shop/products/Pro-12M-1_1024x1024_36a01c87-b093-468b-b84c-7177804bb34a_300x300.jpg?v=1559785916',
    ],
    status: ['RENTA', 'VENTA'],
    shortDescription: 'Centrífuga clínica de alta velocidad',
    longDescription:
      'Equipo especializado para laboratorio clínico que permite la separación rápida de componentes en muestras biológicas mediante control preciso de velocidad.',
  },
  {
    id: 's2222222-2222-4222-8222-222222222222',
    name: 'PhotoCare LED',
    rentalPrice: 900,
    salePrice: 0,
    brand: 'NeoLife',
    photoUrl: [
      'https://www.distribuidorasanlucas.com/wp-content/uploads/2023/08/Fototerapia-neonatal-BILITRON-BED-4006-Fanem.jpeg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSzFmJgFeAn2YwHDexD82xISz-CrzllpTsTA&s',
    ],
    status: ['RENTA'],
    shortDescription: 'Lámpara de fototerapia neonatal',
    longDescription:
      'Sistema de luz azul de alta intensidad diseñado para el tratamiento eficaz de la ictericia en recién nacidos.',
  },
  {
    id: 's3333333-3333-4333-8333-333333333333',
    name: 'AutoPipette X3',
    rentalPrice: 0,
    salePrice: 6000,
    brand: 'LabPro',
    photoUrl: [
      'https://catalogomedicomx.s3.amazonaws.com/produccion/img/p/3/0/1/8/2/30182-large_default.jpg',
      'https://www.buhlerpharma.net/sites/default/files/productos/bt400.jpg',
    ],
    status: ['VENTA'],
    shortDescription: 'Pipeta electrónica de volumen variable',
    longDescription:
      'Dispositivo de laboratorio de alta precisión para dispensación de líquidos con control digital y ergonomía avanzada.',
  },
  {
    id: 's4444444-4444-4444-8444-444444444444',
    name: 'NebulaCare Mini',
    rentalPrice: 400,
    salePrice: 8500,
    brand: 'Omron',
    photoUrl: ['https://medicamarquet.com/wp-content/uploads/2021/02/c900.jpg'],
    status: ['RENTA', 'VENTA'],
    shortDescription: 'Nebulizador portátil',
    longDescription:
      'Equipo compacto para terapia respiratoria que convierte medicamentos líquidos en vapor fino para inhalación.',
  },
  {
    id: 's5555555-5555-4555-8555-555555555555',
    name: 'SuctionMed V2',
    rentalPrice: 500,
    salePrice: 0,
    brand: 'HealthFlow',
    photoUrl: [
      'https://equipomedicoveltro.com.mx/wp-content/uploads/2022/04/equipo_medico_veltro_aspirador_de_flemas_2-300x300.webp',
      'https://equipomedicoveltro.com.mx/wp-content/uploads/2022/04/equipo_medico_veltro_aspirador_de_flemas.webp',
      'https://medicalstoremx.com/cdn/shop/files/D_900892-MLM31234450064_062019-B_grande.jpg?v=1753905133',
    ],
    status: ['RENTA'],
    shortDescription: 'Aspirador de secreciones',
    longDescription:
      'Dispositivo eléctrico para la aspiración de fluidos en procedimientos médicos con sistema de presión regulable.',
  },
  {
    id: 's7777777-7777-4777-8777-777777777777',
    name: 'OxyFlow 500',
    rentalPrice: 0,
    salePrice: 15000,
    brand: 'RespiraMed',
    photoUrl: [
      'https://www.zonanutricion.mx/wp-content/uploads/2018/10/08Ainfantil.webp',
      'https://novamedical.com.mx/cdn/shop/products/BAUMAOXIM084-0-1_2048x.jpg?v=1569097935',
    ],
    status: ['VENTA'],
    shortDescription: 'Concentrador de oxígeno portátil',
    longDescription:
      'Equipo portátil para suministro continuo de oxígeno con batería recargable y múltiples niveles de flujo.',
  },
  {
    id: 's8888888-8888-4888-8888-888888888888',
    name: 'LabAnalyzer Smart',
    rentalPrice: 3500,
    salePrice: 75000,
    brand: 'LabPro',
    photoUrl: [
      'https://desego.com/wp-content/uploads/2016/09/ES-300111-scaled.jpg',
      'https://desego.com/wp-content/uploads/2022/04/ES-430-IZQ.png',
    ],
    status: ['RENTA', 'VENTA'],
    shortDescription: 'Analizador clínico automatizado',
    longDescription:
      'Sistema automatizado para análisis clínicos que optimiza tiempos y mejora la precisión de resultados en laboratorio.',
  },
  {
    id: 's9999999-9999-4999-8999-999999999999',
    name: 'Ventilator Pro X',
    rentalPrice: 4200,
    salePrice: 98000,
    brand: 'RespiraMed',
    photoUrl: [
      'https://www.getinge.com/siteassets/start/product-catalog/servo-i-mechanical-ventilator/servo-i-1280x1280-1.jpg/constrain-0x640-324196867.jpg',
    ],
    status: ['RENTA', 'VENTA'],
    shortDescription: 'Ventilador mecánico avanzado',
    longDescription:
      'Equipo de soporte respiratorio de alta gama con múltiples modos de ventilación, monitoreo en tiempo real y alarmas inteligentes para pacientes críticos.',
  },
  {
    id: 'saaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    name: 'InfuSmart Pump',
    rentalPrice: 600,
    salePrice: 12000,
    brand: 'HealthFlow',
    photoUrl: [
      'https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiaGFtaWx0b24tbWVkaWNhbC1hZ1wvZmlsZVwvcXUxdHVDVHRkRG9GU3RqSHNWTnIucG5nIn0:hamilton-medical-ag:8n4_2AsNOAc7-RL2SJ9Uxs1DdRyy8WQLEVDmx_-3sfA?width=640&quality=50',
      'https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiaGFtaWx0b24tbWVkaWNhbC1hZ1wvZmlsZVwva3FGY2FXcEhnY1k1ZUFFRGlid1oucG5nIn0:hamilton-medical-ag:VONFjGUHcPasrop1VaH1MnVd7gnHsbZsQeLurgmb9sk?width=640&quality=50',
    ],
    status: ['RENTA', 'VENTA'],
    shortDescription: 'Bomba de infusión inteligente',
    longDescription:
      'Dispositivo médico para administración controlada de medicamentos y fluidos intravenosos con programación digital precisa.',
  },
  {
    id: 'sbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    name: 'ECG Monitor 12L',
    rentalPrice: 900,
    salePrice: 0,
    brand: 'CardioTech',
    photoUrl: [
      'https://www.soloequiposmedicos.mx/wp-content/uploads/2013/12/principal-4.jpg.webp',
      'https://www.soloequiposmedicos.mx/wp-content/uploads/2013/12/1-4.jpg',
    ],
    status: ['RENTA'],
    shortDescription: 'Monitor de electrocardiograma de 12 derivaciones',
    longDescription:
      'Equipo portátil para monitoreo cardíaco con pantalla digital, análisis automático y almacenamiento de datos clínicos.',
  },
  {
    id: 'sccccccc-cccc-4ccc-8ccc-cccccccccccc',
    name: 'UltraScan Portable',
    rentalPrice: 2500,
    salePrice: 65000,
    brand: 'SonoTech',
    photoUrl: [
      'https://www.soloequiposmedicos.mx/wp-content/uploads/2017/07/principal.jpg',
      'https://www.soloequiposmedicos.mx/wp-content/uploads/2019/09/principal.jpg',
    ],
    status: ['RENTA', 'VENTA'],
    shortDescription: 'Ultrasonido portátil',
    longDescription:
      'Sistema de ultrasonido compacto con alta resolución de imagen, ideal para diagnósticos rápidos en clínicas y hospitales.',
  },
  {
    id: 'sddddddd-dddd-4ddd-8ddd-dddddddddddd',
    name: 'DefibraCare AED',
    rentalPrice: 0,
    salePrice: 15000,
    brand: 'LifeGuard',
    photoUrl: [
      'https://m.media-amazon.com/images/I/614KhH524hL._AC_UF1000,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/61WRr9XHjFL._AC_UF350,350_QL80_.jpg',
    ],
    status: ['VENTA'],
    shortDescription: 'Desfibrilador externo automático',
    longDescription:
      'Equipo esencial para emergencias cardíacas que analiza el ritmo del corazón y aplica descargas eléctricas de forma segura.',
  },
];

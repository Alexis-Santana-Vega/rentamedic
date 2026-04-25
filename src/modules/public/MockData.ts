import type { SearchResponse } from './types/publicTypes';

export const mockSearch: SearchResponse[] = [
  {
    id: '1',
    name: 'ThermaBath 100',
    status: ['VENTA', 'RENTA'],
    photoUrl: [
      'https://www.somatechnology.com/spanish/wp-content/uploads/sites/2/2018/03/ERBE-VIO-300S-Electrobisturis-2.jpg',
      'https://d17eythm3w95tp.cloudfront.net/media/1224/conversions/68389-9611056-large.webp',
      'https://medgill.co.uk/cdn/shop/files/Erbecosmeticdisplay.jpg?v=1714652022&width=1946',
    ],
    brand: 'Erbe Bio',
    rentPrice: '$2,00.00 / día',
    sellingPrice: '$150,000.00',
    shortDescription: 'Baño térmico para tratamientos médicos precisos',
    longDescription:
      'El ThermaBath 100 de Erbe Bio es un sistema de terapia térmica diseñado específicamente para aplicaciones médicas, clínicas de fisioterapia y centros de rehabilitación. Este dispositivo ofrece una solución segura y controlada para la aplicación de calor terapéutico sobre zonas corporales específicas, facilitando la relajación muscular, la mejora de la circulación sanguínea y la reducción del dolor. Con un control digital de temperatura altamente preciso, permite personalizar la intensidad del tratamiento según las necesidades del paciente. Su diseño ergonómico y materiales resistentes garantizan una larga durabilidad, además de facilitar su limpieza y mantenimiento. Compatible con una variedad de accesorios térmicos, el ThermaBath 100 se convierte en una herramienta versátil para cualquier profesional de la salud que requiera aplicaciones constantes de calor húmedo. Está construido para ofrecer un rendimiento confiable en sesiones prolongadas y cumple con estándares internacionales de calidad y seguridad médica. Ideal para hospitales, clínicas y consultorios que buscan optimizar sus tratamientos de rehabilitación.',
  },
  {
    id: '2',
    name: 'BioSafe B2',
    status: ['VENTA', 'RENTA'],
    photoUrl: [
      'https://bioap.com.mx/wp-content/uploads/2023/05/Lina-xcise-Cordless-Morcellator-2-e1686345910274.jpg',
      'https://img.medicalexpo.es/images_me/photo-m2/110269-16145408.jpg',
    ],
    brand: 'BiMarks',
    rentPrice: '$500.00 / día',
    sellingPrice: '$450,000.00',
    shortDescription: 'Unidad quirúrgica segura y portátil',
    longDescription:
      'El BioSafe B2 es una solución quirúrgica de última generación, especialmente diseñada para facilitar procedimientos de morcelación durante cirugías laparoscópicas y ginecológicas. Equipado con tecnología inalámbrica, su diseño portátil elimina la dependencia de cables, mejorando la movilidad del cirujano en el quirófano y reduciendo el riesgo de contaminación. La unidad cuenta con cuchillas de alta precisión que permiten una fragmentación eficiente de tejidos con mínimo trauma, promoviendo una recuperación más rápida del paciente. Además, está fabricado con materiales biocompatibles y esterilizables que cumplen rigurosamente con normas internacionales de calidad. Su interfaz digital intuitiva permite monitorear parámetros clave en tiempo real, garantizando un control total durante la intervención. Gracias a su bajo nivel de ruido y estructura ligera, el BioSafe B2 es ideal tanto para hospitales como clínicas ambulatorias. Su rendimiento ha sido validado en múltiples estudios clínicos, y su eficiencia energética lo convierte en una opción sostenible para entornos quirúrgicos modernos.',
  },
  {
    id: '3',
    name: 'MicroScope Pro',
    status: ['VENTA'],
    photoUrl: [
      'https://image.made-in-china.com/2f0j00DJYiZIRzYgpS/B2-Biosafeti-2-Esco-II-A2-Class-3-Heal-Force-Cabinets-Laboratory-Biosafety-Cabinet.webp',
      'https://5.imimg.com/data5/SELLER/Default/2022/2/XU/LI/AC/132352180/pathology-products-500x500.jpg',
    ],
    brand: 'Heal Force',
    rentPrice: '',
    sellingPrice: '$40,000.00',
    shortDescription: 'Microscopio de laboratorio de alta resolución',
    longDescription:
      'El MicroScope Pro de Heal Force es un microscopio profesional diseñado para entornos científicos exigentes, como laboratorios clínicos, institutos de investigación y departamentos universitarios. Equipado con óptica de precisión alemana y objetivos acromáticos, este microscopio permite observar estructuras celulares y tejidos con una nitidez excepcional. Su sistema de iluminación LED regulable proporciona una fuente de luz fría y duradera, ideal para largas sesiones de trabajo sin alterar las muestras. El diseño ergonómico de su cabezal inclinado y plataforma mecánica de doble capa facilita la manipulación continua con mínima fatiga visual o postural. Además, incluye opciones de captura digital y conexión a monitores o computadoras, permitiendo el almacenamiento y análisis detallado de imágenes. Su robustez estructural garantiza una vida útil prolongada, incluso en condiciones intensivas de laboratorio. El MicroScope Pro ha sido validado para su uso en diagnóstico clínico, investigación biomédica y enseñanza de histología, lo que lo convierte en una inversión versátil y confiable.',
  },
  {
    id: '4',
    name: 'AutoPipette X3',
    status: ['RENTA'],
    photoUrl: [
      'https://images-na.ssl-images-amazon.com/images/I/51vqUoHqmKL._AC_UL495_SR435,495_.jpg',
      'https://m.media-amazon.com/images/I/71pG4APOtbL._UF350,350_QL80_.jpg',
      'https://www.eppendorf.com/product-media/img/global/540218/Eppendorf_Liquid-Handling_Research-plus-12-channel-pipette-epTIPS-384_Research-plus-12-channel-pipette-filling-384-well-plate_product.jpg?imwidth=540',
    ],
    brand: 'XPipe',
    rentPrice: '$120.00 / día',
    sellingPrice: '',
    shortDescription: 'Pipeta automática multicanal de laboratorio',
    longDescription:
      'La AutoPipette X3 es una herramienta avanzada de laboratorio diseñada para optimizar la dispensación precisa de líquidos en tareas repetitivas. Su mecanismo multicanal permite realizar múltiples transferencias simultáneas, lo que agiliza considerablemente los procesos en laboratorios clínicos, farmacéuticos y de investigación. Fabricada con materiales duraderos y resistentes a agentes químicos, esta pipeta destaca por su ergonomía, precisión volumétrica y facilidad de calibración. Su mango antideslizante y sistema de expulsión suave minimizan la fatiga del usuario durante largas sesiones de trabajo. La AutoPipette X3 es compatible con diversas puntas universales y cuenta con mecanismos de ajuste que permiten personalizar el volumen deseado con alta precisión. Es ideal para aplicaciones que requieren exactitud, como la preparación de reactivos, cultivos celulares, y análisis de muestras en placas de 96 y 384 pozos. Su diseño modular facilita el mantenimiento y reemplazo de piezas, lo que extiende la vida útil del dispositivo y asegura un rendimiento constante en ambientes exigentes.',
  },
  {
    id: '5',
    name: 'Drager Oxylog 3000',
    status: ['VENTA', 'RENTA'],
    photoUrl: [
      'https://www.draeger.com/Media/Content/Products/Default/Draeger-Oxylog-3000-plus-1-MT-5809-2008.jpg',
      'https://storage.googleapis.com/avante/images/12671-1-drager-oxylog-3000.jpg',
    ],
    brand: 'Drager',
    rentPrice: '$200.00 / día',
    sellingPrice: '$50,000.00',
    shortDescription: 'Ventilador portátil de emergencia',
    longDescription:
      'El Drager Oxylog 3000 es un ventilador mecánico portátil de alto rendimiento, diseñado para la atención de pacientes en situaciones críticas, tanto en ambientes hospitalarios como durante el transporte. Su estructura compacta y resistente permite su uso en ambulancias, helicópteros y áreas de urgencias, ofreciendo soporte respiratorio inmediato y eficaz. Con modos de ventilación invasiva y no invasiva, este dispositivo se adapta a diferentes escenarios clínicos, desde emergencias hasta cuidados intensivos. Integra una interfaz gráfica intuitiva, monitoreo en tiempo real de parámetros respiratorios y alarmas de seguridad ajustables. Su batería de larga duración garantiza un funcionamiento continuo en traslados prolongados. Además, cumple con las normativas internacionales de dispositivos médicos y ha sido probado en múltiples entornos hostiles, lo que respalda su fiabilidad. Su capacidad para funcionar con diferentes fuentes de gas y oxígeno lo convierte en una solución indispensable para equipos médicos móviles, hospitales rurales y zonas de desastre.',
  },
  {
    id: '6',
    name: 'HoneyWell h60240 a10 Plus',
    status: ['RENTA'],
    photoUrl: [
      'https://m.media-amazon.com/images/I/61sIys3lxaL._UF894,1000_QL80_.jpg',
      'https://www.amresupply.com/thumbnail/product/1656514/625/469/1656514-H6062A1000-Honeywell-H6062A1000-Home-HumidiPRO-Digital-Humidistat-Control-with-Outdoor-Sensor.jpg',
    ],
    brand: 'HoneyHome',
    rentPrice: '$120.00 / día',
    sellingPrice: '',
    shortDescription: 'Control digital de humedad inteligente',
    longDescription:
      'El HoneyWell h60240 a10 Plus es un controlador digital de humedad que permite monitorear y ajustar los niveles de humedad relativa en entornos clínicos, industriales y residenciales. Su tecnología avanzada permite una gestión precisa y automática del ambiente, ideal para mantener condiciones óptimas en quirófanos, laboratorios y salas blancas. Incorpora sensores de alta sensibilidad que detectan cambios mínimos en la humedad y activan sistemas de humidificación o deshumidificación según la configuración deseada. Su pantalla LCD retroiluminada facilita la lectura de parámetros incluso en condiciones de baja luz, y su interfaz es altamente intuitiva para usuarios sin formación técnica. Además, cuenta con memoria interna para registrar historial de datos, lo que permite análisis de tendencias. Su carcasa está diseñada para resistir condiciones extremas de temperatura y humedad, garantizando su funcionamiento incluso en ambientes exigentes. También es compatible con sensores externos para monitoreo de zonas específicas y sistemas de automatización centralizada.',
  },
  {
    id: '7',
    name: 'Oxyflow 5L Oxygen XML',
    status: ['VENTA', 'RENTA'],
    photoUrl: [
      'https://5.imimg.com/data5/SELLER/Default/2021/6/KP/DV/GP/109247365/oxyflow-5-500x500.jpg',
      'https://5.imimg.com/data5/SELLER/Default/2023/6/321315275/IP/FL/SG/74865603/oxyflow-5l-zy-5af-oxygen-concentrator-500x500.jpg',
    ],
    brand: 'India Mart',
    rentPrice: '$2,500.00 / día',
    sellingPrice: '$3,000,000.00',
    shortDescription: 'Concentrador de oxígeno de 5 litros',
    longDescription:
      'El Oxyflow 5L Oxygen XML es un concentrador de oxígeno de última generación que proporciona un flujo continuo de oxígeno de alta pureza para pacientes con necesidades respiratorias. Capaz de entregar hasta 5 litros por minuto, este equipo es ideal para terapias domiciliarias, clínicas y hospitales. Su tecnología avanzada permite separar el oxígeno del aire ambiente de manera eficiente, ofreciendo un suministro constante sin necesidad de cilindros. Está equipado con filtros reemplazables, sistema de alarma por baja pureza, protección contra sobrecalentamiento y apagado automático en caso de emergencia. Su diseño moderno y compacto incluye ruedas para fácil transporte, una pantalla digital para lectura de flujo y tiempo de uso, y controles intuitivos accesibles incluso para adultos mayores. Es especialmente útil en zonas con acceso limitado a oxígeno medicinal embotellado. Cumple con las normativas de seguridad eléctrica y cuenta con certificaciones internacionales. El Oxyflow 5L ha sido utilizado en campañas de atención comunitaria, emergencias respiratorias y programas de cuidados prolongados.',
  },
];

export const SITE = {
  name: "Folios Digitales Premium®",
  tagline: "Los expertos en facturación electrónica",
  phones: {
    soporte: "222 141 3900",
    soporteTel: "2221413900",
    ventas: "222 599 7853",
    ventasTel: "2225997853",
  },
  hours: "Lunes a Viernes 9am - 7pm",
  email: "mesadecontrol@foliosdigitales.com.mx",
  privacyEmail: "datospersonales@foliosdigitales.com.mx",
  company: "Servicios Tecnológicos Avanzados en Facturación S.A. de C.V.",
};

export const CFDI_TYPES = [
  { label: "Facturas electrónicas", primary: true },
  { label: "Notas de Crédito", primary: false },
  { label: "Recibos de honorarios", primary: true },
  { label: "Recibo de Donativo", primary: false },
  { label: "Recibos de Arrendamiento", primary: true },
  { label: "Cartas Porte", primary: false },
  { label: "Recibo de Nómina", primary: true },
  { label: "Notas de Cargo y Devolución", primary: false },
  { label: "Recibos de Pago", primary: false },
  { label: "Formato para Gasolineras", primary: false },
];

export const BENEFITS = [
  {
    title: "Facilidad",
    description: "Elaboración de\ncomprobantes en\npocos clics.",
    image: "/assets/slider/01.png",
  },
  {
    title: "Accesibilidad",
    description: "Accesible desde\ncualquier dispositivo\ncon acceso a internet.",
    image: "/assets/slider/02.png",
  },
  {
    title: "Personalización",
    description: "De los comprobantes\nen PDF, con diseño,\ncolor y logotipo.",
    image: "/assets/slider/03.png",
  },
  {
    title: "Catálogos",
    description: "Registros ilimitados\nde catálogos de\nclientes, productos y\ntrabajadores.",
    image: "/assets/slider/04.png",
  },
  {
    title: "Múltiples sucursales",
    description: "Capacidad para\noperar con múltiples\nsucursales y usuarios.",
    image: "/assets/slider/05.png",
  },
  {
    title: "Múltiples divisas",
    description: "Factura en múltiples\ndivisas según las\nnecesidades\nde tu negocio.",
    image: "/assets/slider/06.png",
  },
  {
    title: "Actualizaciones sin costo",
    description: "Actualizaciones y\ncomplementos sin\ncosto.",
    image: "/assets/slider/07.png",
  },
  {
    title: "10 facturas gratis",
    description: "Recibe 10 facturas\ntotalmente gratis al\nregistrarte por\nprimera vez.",
    image: "/assets/slider/09.png",
    highlight: true,
  },
];

export type Product = {
  slug: string;
  title: string;
  price: string;
  priceValue: number;
  summary: string;
  icon: string;
  highlighted?: boolean;
  badge?: string;
  cta: "adquirir" | "descarga";
  payKey: string;
  subtitle?: string;
  description: string;
  bullets: string[];
  extrasTitle?: string;
  extras: { title: string; text: string }[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "facturacion-electronica",
    title: "Sistema de generación de CFDI Online",
    price: "$490.00",
    priceValue: 490,
    summary:
      "Solución Web para la emisión y certificación de Comprobantes Fiscales Digitales por Internet. Ingresa desde cualquier dispositivo con acceso a internet, aseguramos más del 99% de disponibilidad en el servicio.",
    icon: "/assets/products/cfdi.svg",
    cta: "adquirir",
    payKey: "cfdi",
    description: "Solución Web para la emisión y certificación de comprobantes Fiscales Digitales por Internet.",
    bullets: [
      "Ingresa desde cualquier dispositivo con acceso a internet, aseguramos más del 99% de disponibilidad en el servicio.",
      "Envía tus comprobantes por Correo Electrónico",
      "Desde una interfaz sencilla e intuitiva podrás generar Facturas, Notas de Crédito, Recibos de Honorario, Recibos de Arrendamiento, Complemento de Pago, Recibo de Nómina, Cartas Porte, etc.",
      "Consulta y administra tus comprobantes emitidos.",
    ],
    extrasTitle: "Nuestra aplicación de CFDI's te permite:",
    extras: [
      { title: "Personalizar tus comprobantes", text: "Agrega tu logotipo y color a las facturas o selecciona un template de nuestra lista para tus clientes." },
      { title: "Generar reportes mensuales", text: "Emite reportes mensuales de contabilidad en dos formatos principales: PDF para presentación y XLS (excel) para edición." },
      { title: "Compatibilidad con ERP", text: "Conexión con los sistemas contables para realizar toda la carga de facturación TXT, BD Access, Conexión SQL Server." },
    ],
  },
  {
    slug: "timbrado",
    title: "Timbrado",
    price: "$200.00",
    priceValue: 200,
    summary: "Con Nuestro servicio de timbrado podrás certificar los XML generados desde cualquier desarrollo que cumpla con las especificaciones técnicas del Anexo 20.",
    icon: "/assets/products/timbrado.svg",
    cta: "adquirir",
    payKey: "timbrado",
    description: "Con Nuestro servicio de timbrado podrás certificar los XML generados desde cualquier desarrollo que cumpla con las especificaciones técnicas del Anexo 20.",
    bullets: ["Sistema estable y veloz.", "Compatible con el 95% de los lenguajes de programación.", "Velocidad de timbrado entre 1 y 8 segundos por cada XML v3.3.", "Disponibilidad del servicio en un 99.3%.", "Autofacturación por Tickets.", "Soporte Técnico especializado sin costo."],
    extrasTitle: "Nuestro timbrado te permite:",
    extras: [
      { title: "API de Conexión", text: "El archivo XML se envía con un formato especificado en el Anexo 20, nuestro sistema lo procesa y lo devuelve certificado." },
      { title: "Integración a la medida", text: "Adaptación de sistemas de terceros para crear la conexión con nuestro sistema." },
      { title: "Calidad Premium", text: "Certifica tus comprobantes con calidad Premium y velocidades que no encontrarás fácilmente." },
    ],
  },
  {
    slug: "xml-contable",
    title: "Módulo XML contable",
    price: "$1,160.00",
    priceValue: 1160,
    summary: "Podrás generar los archivos XML de Catálogo de Cuentas, Balanzas y Pólizas.",
    icon: "/assets/products/xml.svg",
    cta: "adquirir",
    payKey: "contables",
    description: "A través de nuestro módulo de Contabilidad Electrónica podrás generar los archivos XML de Catálogo de Cuentas, Balanzas y Pólizas.",
    bullets: ["Acceso a sucursal para Contabilidad Electrónica", "No requiere de créditos o timbres", "Resguardo de información 5 años", "Modificación de información sin costo adicional", "Soporte Técnico gratuito", "Descarga de plantillas en Excel"],
    extras: [],
  },
  {
    slug: "buzon",
    title: "Buzón de recepción",
    price: "$200.00",
    priceValue: 200,
    summary: "Utiliza nuestro servicio de Buzón y asegúrate de la validez de tus comprobantes.",
    icon: "/assets/products/buzon.svg",
    cta: "adquirir",
    payKey: "buzon",
    description: "Folios Digitales proporciona una herramienta de gran utilidad para recepción de facturas.",
    bullets: ["Recibe sólo los comprobantes válidos.", "Organiza en automático los comprobantes recibidos."],
    extras: [],
  },
  {
    slug: "erp-contable",
    title: "ERP Contable",
    price: "$7,499.00",
    priceValue: 7499,
    summary: "El sistema contable cuenta con las herramientas necesarias para cumplir con la contabilidad electrónica.",
    icon: "/assets/products/erp.svg",
    highlighted: true,
    cta: "adquirir",
    payKey: "contables",
    description: "Con una sola licencia puedes trabajar hasta 99 RFC’s distintos con usuarios ilimitados.",
    bullets: ["Ingresos", "Inventarios", "Egresos", "Activo Fijo", "Contabilidad", "Ventas", "Bancos", "Punto de Venta"],
    extras: [],
  },
  {
    slug: "addendas",
    title: "Addendas",
    price: "$3,480.00",
    priceValue: 3480,
    summary: "Complemento opcional de la factura electrónica requerida por receptores en específico.",
    icon: "/assets/products/addendas.svg",
    cta: "adquirir",
    payKey: "addendas",
    description: "Contamos con áreas especializadas capaces de desarrollar cualquier diseño de addenda.",
    bullets: ["Clave de proveedor", "Número de serie de los productos", "Número de orden de compra"],
    extras: [],
  },
  {
    slug: "validador-xml",
    title: "Validador XML",
    price: "$1,160.00",
    priceValue: 1160,
    summary: "La solución más rápida y económica para asegurarte que estás recibiendo únicamente comprobantes válidos.",
    icon: "/assets/products/validador.svg",
    cta: "adquirir",
    payKey: "addendas",
    description: "Almacenar un CFDi sin haberlo validado nos puede meter en un problema con el SAT.",
    bullets: ["Licencia anual del módulo validador.", "Valida XMLs recibidos o descargados del SAT."],
    extras: [],
  },
  {
    slug: "click",
    title: "¿Ya facturas?",
    subtitle: "Cámbiate con nosotros en un sólo click",
    price: "¡Totalmente Gratis!",
    priceValue: 0,
    summary: "Esta herramienta te ayudará a migrar Catálogos de Clientes, Productos y Servicios.",
    icon: "/assets/products/click.svg",
    highlighted: true,
    cta: "descarga",
    payKey: "click",
    description: "Migrate en sólo 5 pasos.",
    bullets: ["Descarga Click.", "Registra tu mail.", "Selecciona la carpeta de catálogos.", "Revisa el resumen.", "¡Listo!"],
    extras: [],
  },
];

export const MANUALS_VISIBLE = [
  { title: "Guía rápida para complemento de hidrocarburos y petrolíferos", nuevo: true, href: "https://foliosdigitales.com/descarga/infografias/FD_GuiaRapidaComplementoHidrocarburosPetroliferos.pdf" },
  { title: "Guía Buzón RFC", nuevo: true, href: "https://foliosdigitales.com/descarga/infografias/GuiaBuzonRFC-FD.pdf" },
  { title: "Manual Punto de Venta", nuevo: true, href: "https://www.foliosdigitales.com/PuntoVenta/manual/Manual_Punto_de_Venta_FD.pdf" },
  { title: "Manual de Sistema Online", href: "https://www.foliosdigitales.com/descarga/MANUAL-SISTEMA-ONLINE.pdf" },
  { title: "Lista de soluciones Comercio Exterior 2.0", href: "https://foliosdigitales.com/descarga/infografias/ListadodeSolucionesparaComercioExterior-FDv2.pdf" },
  { title: "¿Cómo declarar el nombre tanto emisor como receptor para CFDI 4.0?", href: "https://foliosdigitales.com/descarga/infografias/NombreCFDIV4-FD.pdf" },
];

export const MANUALS_MORE = [
  { title: "Guía de registro de empleados V4.0", href: "https://www.foliosdigitales.com/descarga/infografias/GuiadeRegistrodeEmpleadosV4-FD.pdf" },
  { title: "Infografía complemento de pagos V2.0", href: "https://foliosdigitales.com/descarga/infografias/FD-Infografia-ComplementoDePagos2.pdf" },
  { title: "Guía complemento de pagos V4.0", href: "https://foliosdigitales.com/descarga/infografias/FD-GuiaComplementoPagosV4.pdf" },
  { title: "Guía comercio exterior V4.0", href: "https://www.foliosdigitales.com/descarga/infografias/FD-GuiaComercioExteriorV2-2024.pdf" },
  { title: "Guía rápida carta porte V4.0", href: "https://www.foliosdigitales.com/descarga/infografias/FD-GuiaRapidaCartaPorteV4.pdf" },
  { title: "Complemento de nómina V4.0", href: "https://www.foliosdigitales.com/descarga/infografias/FD-ComplementodeNominaV4.pdf" },
  { title: "Guía de uso CFDI V4.0.", href: "https://www.foliosdigitales.com/descarga/infografias/GuiaRapidaCFDI4.0.pdf" },
  { title: "Registra un ticket de soporte desde la página comercial.", href: "https://www.foliosdigitales.com/descarga/infografias/FD_Soporte.pdf?v1.0" },
  { title: "Compra tus productos desde el portal de la página.", href: "https://www.foliosdigitales.com/descarga/infografias/FD_Compra_Productos.pdf?v1.0" },
  { title: "Registro de comprobante de pago.", href: "https://www.foliosdigitales.com/descarga/infografias/FD_Registro_Pago.pdf" },
  { title: "Cómo activar IVA 8% en Sistema en línea.", href: "https://www.foliosdigitales.com/descarga/infografias/FD_IVA8.pdf" },
  { title: "Cuenta sucursal.", href: "https://www.foliosdigitales.com/descarga/infografias/FD_Cuenta_Sucursal.pdf" },
  { title: "Activa tus créditos de cortesía.", href: "https://www.foliosdigitales.com/descarga/infografias/FD_activacion_creditos.pdf?v1.0" },
  { title: "Agregar Addendas desde el sistema online.", href: "https://www.foliosdigitales.com/descarga/infografias/FD_Agregar_addendas_en_sistema_online.pdf" },
  { title: "Cambio de contraseña del CSD.", href: "https://www.foliosdigitales.com/descarga/infografias/FD_Cambio_contrasena_CSD.pdf" },
  { title: "Agregar subsidio al empleo.", href: "https://www.foliosdigitales.com/descarga/infografias/FD_Subsidio_a_empleo.pdf" },
  { title: "Guía de llenado de Complemento Carta Porte.", href: "https://www.foliosdigitales.com/descarga/infografias/FDP_Carta_Porte.pdf" },
];

export const TICKET_TYPES = [
  "Ticket de soporte",
  "Comentario",
  "Sugerencia",
  "Información sobre franquicia o distribución",
  "Ticket de facturación",
];

export const CREDIT_PACKS = [
  { credits: 25, label: "Paquete de 25 créditos", price: 490, note: "Vigencia 1 año" },
  { credits: 50, label: "Paquete de 50 créditos", price: 590, note: "Vigencia 1 año" },
  { credits: 100, label: "Paquete de 100 créditos", price: 1080, note: "Vigencia 1 año" },
  { credits: 300, label: "Paquete de 300 créditos", price: 1650, note: "Vigencia 1 año" },
  { credits: 500, label: "Paquete de 500 créditos", price: 1950, note: "Vigencia 1 año" },
  { credits: 1000, label: "Paquete de 1,000 créditos", price: 3150, note: "Vigencia 1 año" },
  { credits: 2500, label: "Paquete de 2,500 créditos", price: 6150, note: "Vigencia 2 años" },
  { credits: 5000, label: "Paquete de 5,000 créditos", price: 10650, note: "Vigencia 2 años" },
  { credits: 10000, label: "Paquete de 10,000 créditos", price: 18550, note: "Vigencia 2 años" },
  { credits: 30000, label: "Paquete de 30,000 créditos", price: 52500, note: "Vigencia 2 años" },
  { credits: 50000, label: "Paquete de 50,000 créditos", price: 78500, note: "Vigencia 2 años" },
];

export const PAY_CATEGORIES = [
  { id: "cfdi", label: "CFDI", icon: "/assets/pago/cfdi.svg" },
  { id: "timbrado", label: "Timbrado", icon: "/assets/pago/timbrado.svg" },
  { id: "erp", label: "ERP Contable", icon: "/assets/pago/erp.svg" },
  { id: "buzon", label: "Buzón RFC", icon: "/assets/pago/buzon.svg" },
  { id: "otros", label: "Otros Productos", icon: "/assets/pago/otros.svg" },
];

export const OTHER_PACKS: Record<string, { label: string; price: number }[]> = {
  timbrado: [
    { label: "Paquete de 100 timbres", price: 200 },
    { label: "Paquete de 500 timbres", price: 800 },
    { label: "Paquete de 1,000 timbres", price: 1400 },
    { label: "Paquete de 5,000 timbres", price: 5500 },
  ],
  erp: [
    { label: "Licencia anual ERP Contable", price: 7499 },
    { label: "Módulo XML contable", price: 1160 },
  ],
  buzon: [
    { label: "Buzón de recepción anual", price: 200 },
    { label: "Validador XML anual", price: 1160 },
  ],
  otros: [
    { label: "Addendas", price: 3480 },
    { label: "Punto de Venta — licencia anual", price: 2000 },
    { label: "Punto de Venta — precio CFDI", price: 1500 },
  ],
};

let a = 1;

export const RFC_REGEX =
  /^[A-ZÑ&]{3,4}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z0-9]{2}[0-9A]$/i;

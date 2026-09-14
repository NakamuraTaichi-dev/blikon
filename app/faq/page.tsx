import Link from "next/link";

const FAQ = [
  ["¿Cómo obtengo 10 facturas gratis?", "Regístrese en Ingresa al sistema. Los 10 créditos tienen vigencia de 3 meses."],
  ["¿Qué medios de pago aceptan?", "Tarjeta de débito o crédito, PayPal, depósito en efectivo / OXXO y transferencia electrónica."],
  ["¿Cuánto tarda la activación?", "Inmediata con tarjeta o PayPal; 24 a 48 horas con depósito o transferencia."],
  ["¿Cómo genero un ticket?", "En Soporte complete RFC, razón social, correo, teléfono, comentarios y captcha."],
  ["¿El Punto de Venta tiene prueba?", "Sí, 30 días gratis al registrar sus datos. Precio de lanzamiento $2,000 o $1,500 si ya es usuario CFDI."],
];

export default function FaqPage() {
  return (
    <section className="section">
      <div className="wrap legal">
        <h1>Preguntas frecuentes</h1>
        {FAQ.map(([q, a]) => (
          <div key={q}>
            <h2>{q}</h2>
            <p>{a}</p>
          </div>
        ))}
        <p>
          Más material en <Link href="/soporte">Soporte</Link>.
        </p>
      </div>
    </section>
  );
}

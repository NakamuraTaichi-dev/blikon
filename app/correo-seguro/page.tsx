const CLIENTS = [
  {
    name: "Gmail",
    fake: "Al seleccionar el correo podrás ver que en la parte derecha aparece: Detalles de contacto y se muestra la dirección completa del remitente, en este caso es foliosdigitales.com.mx@gmail.com, con lo cual se deduce que es un correo falso, pues el dominio debe ser @foliosdigitales.com.mx y no @gmail.com.",
    extra:
      "Podemos darnos cuenta de qué dominio proviene el correo con tan solo observar lo que está escrito después de la arroba. En Gmail se pueden observar dos apartados (Enviado por y firmado por).",
    real: "En este caso, al seleccionar el correo y checar en detalles del contacto, se puede observar que la cuenta es real, pues cuenta con el dominio correcto @foliosdigitales.com.mx y el “enviado por” y “firmado por” viene de un dominio verificado.",
    fakeShot: "De: Folios Digitales <foliosdigitales.com.mx@gmail.com>\nEnviado por: gmail.com",
    realShot: "De: Folios Digitales <avisos@foliosdigitales.com.mx>\nFirmado por: foliosdigitales.com.mx",
  },
  {
    name: "eM Client",
    fake: "Al seleccionar el correo podrás ver Detalles de contacto. Si el remitente es foliosdigitales.com.mx@gmail.com, es un correo falso.",
    real: "La cuenta es real si el dominio es @foliosdigitales.com.mx.",
    fakeShot: "Remitente: foliosdigitales.com.mx@gmail.com",
    realShot: "Remitente: avisos@foliosdigitales.com.mx",
  },
  {
    name: "Mail de Mac",
    fake: "Al dar clic en el remitente se muestra la dirección completa. Si termina en @gmail.com u otro dominio ajeno, es falso.",
    real: "La cuenta es real cuando el dominio es @foliosdigitales.com.mx.",
    fakeShot: "foliosdigitales.com.mx@gmail.com",
    realShot: "avisos@foliosdigitales.com.mx",
  },
  {
    name: "Outlook",
    fake: "Junto al nombre puede aparecer otro correo @gmail.com que se hace pasar por dominio verídico.",
    real: "Un correo verdadero de Folios Digitales usa únicamente @foliosdigitales.com.mx.",
    fakeShot: "Folios Digitales <foliosdigitales.com.mx@gmail.com>",
    realShot: "RICARDO SANTOS MORO <rsantos@foliosdigitales.com.mx>",
  },
];

export default function CorreoSeguroPage() {
  return (
    <>
      <div className="page-banner">
        <div className="wrap">
          <h1>Correo electrónico seguro</h1>
          <p>
            El dominio oficial siempre es <b>@foliosdigitales.com.mx</b>. Cualquier otro
            (@gmail, @hotmail, @yahoo, @outlook, etc.) es falso.
          </p>
        </div>
      </div>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          {CLIENTS.map((c) => (
            <article key={c.name}>
              <h2 className="h-navy">{c.name}</h2>
              <div className="correo-flag bad">CORREO FALSO</div>
              <p>{c.fake}</p>
              {c.extra && <p className="italic">{c.extra}</p>}
              <p className="error">
                Nota: No solo @gmail puede ser el dominio incorrecto, puede ser cualquier otro dominio que no fuera @foliosdigitales.
              </p>
              <pre className="shot">{c.fakeShot}</pre>
              <div className="correo-flag good">CORREO VERDADERO</div>
              <p>{c.real}</p>
              <pre className="shot">{c.realShot}</pre>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

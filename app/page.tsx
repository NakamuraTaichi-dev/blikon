import Link from "next/link";
import { BENEFITS, CFDI_TYPES } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-stage">
          <div className="hero-cta">
            <Link href="/comprar?nuevo=1">
              <img src="/assets/index/boton.svg" alt="¿Aún no facturas con nosotros? Comienza aquí" />
            </Link>
          </div>
          <div className="hero-captions">
            <div className="hero-leyenda">
              <img
                src="/assets/index/leyenda.svg"
                alt="Continúa con la facturación de tu negocio. Con infraestructura de la más alta tecnología"
              />
            </div>
            <div className="hero-hashtag">
              <img src="/assets/index/juntos.svg" alt="#juntosPodemosLograrlo" />
            </div>
          </div>
        </div>
      </section>

      <div className="mobile-cta">
        <div>¿Aún no facturas con nosotros?</div>
        <Link href="/comprar?nuevo=1">Comienza aquí</Link>
        <div style={{ marginTop: 10 }}>¿Ya facturas con nosotros?</div>
        <Link href="/sistema">Ingresa al sistema</Link>
        <div style={{ marginTop: 10 }}>¿Eres Distribuidor?</div>
        <Link href="/micrositio">Ingresa a tu Micrositio</Link>
      </div>

      <section className="section cfdi-section">
        <div className="wrap cfdi-grid">
          <div>
            <h2 className="cfdi-heading">
              A través de nuestro sistema en línea,
              <br />
              <span>podrás generar estos tipos de comprobantes (CFDI&apos;s):</span>
            </h2>
            <div className="cfdi-list">
              {CFDI_TYPES.map((item) => (
                <div key={item.label} className={`cfdi-item ${item.primary ? "primary" : ""}`}>
                  <img
                    src={item.primary ? "/assets/index/destello-blanco.svg" : "/assets/index/destello.svg"}
                    alt=""
                  />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <aside className="cfdi-aside">
            <img src="/assets/index/cfdi-blur.svg" alt="" />
            <p>
              Genera fácilmente comprobantes
              <br />
              fiscales digitales CFDI&apos;s cumpliendo
              <br />
              con las disposiciones vigentes del SAT
            </p>
            <img className="watermark" src="/assets/index/logo-blur.svg" alt="" />
          </aside>
        </div>
      </section>

      <section className="benefits honey">
        <div className="wrap center">
          <p className="benefits-kicker">Los expertos en Facturación Electrónica</p>
          <h2 className="benefits-title">
            Conoce todos los beneficios
            <br />
            que Folios Digitales te ofrece:
          </h2>
          <div className="benefit-grid">
            {BENEFITS.map((b) => (
              <article key={b.title} className="benefit-card">
                <img src={b.image} alt="" />
                <div className="info">
                  <h3 className={"highlight" in b && b.highlight ? "green" : undefined}>{b.title}</h3>
                  <p>
                    {b.description.split("\n").map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="benefits-cta-label">¿Aún no facturas con nosotros?</p>
          <Link href="/comprar?nuevo=1" className="btn-comienza">
            Comienza aquí &gt;
          </Link>
        </div>
      </section>

      <section className="xml-banner">
        <Link href="/descarga-xml" className="btn-xml">
          Clic aquí &gt;
        </Link>
      </section>
    </>
  );
}

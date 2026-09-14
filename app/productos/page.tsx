import Link from "next/link";
import { PRODUCTS } from "@/lib/data";

export default function ProductosPage() {
  return (
    <>
      <div className="page-banner">
        <div className="wrap">
          <h1>Productos</h1>
          <p>
            Contamos con una amplia gama de productos capaces de satisfacer las
            necesidades fiscales de todos los contribuyentes.
          </p>
        </div>
      </div>
      <section className="section honey">
        <div className="wrap product-grid">
          {PRODUCTS.map((p) => (
            <article key={p.slug} className={`product-card ${p.highlighted ? "highlight" : ""}`}>
              {p.highlighted && <img className="marker" src="/assets/products/marcador.svg" alt="" />}
              <div className="product-top">
                <img src={p.icon} alt="" />
                <div>
                  <h3>
                    {p.title}
                    {p.subtitle && (
                      <>
                        <br />
                        <span style={{ fontWeight: 400, fontSize: 15 }}>{p.subtitle}</span>
                      </>
                    )}
                  </h3>
                  <div className="price">Desde: {p.price}</div>
                </div>
              </div>
              <p>{p.summary}</p>
              <div className="card-actions">
                <Link href={`/productos/${p.slug}`} className="link-more">
                  Conoce más
                </Link>
                {p.cta === "descarga" ? (
                  <Link href="/productos/click" className="btn btn-gold">
                    Descarga
                  </Link>
                ) : (
                  <Link href={`/comprar?producto=${p.payKey}`} className="btn btn-gold">
                    Adquirir
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

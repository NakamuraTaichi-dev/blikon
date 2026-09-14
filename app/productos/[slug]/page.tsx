import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  return (
    <>
      <div className="page-banner">
        <div className="wrap center">
          <h1>{product.subtitle ? `${product.title} ${product.subtitle}` : product.title}</h1>
          <p>{product.description}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap center">
          <img src={product.icon} alt="" style={{ width: 140, margin: "8px auto 24px" }} />
          <div className="checks">
            {product.bullets.map((b) => (
              <div key={b} className="check">
                <i />
                <span>{b}</span>
              </div>
            ))}
          </div>
          {product.extrasTitle && <h2 className="h-blue">{product.extrasTitle}</h2>}
          {product.extras.length > 0 && (
            <div className="extras">
              {product.extras.map((e) => (
                <div key={e.title} className="extra">
                  <div className="icon">★</div>
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                </div>
              ))}
            </div>
          )}
          {product.cta === "descarga" ? (
            <Link href="/productos/click" className="btn btn-gold">
              Descargar Click
            </Link>
          ) : (
            <Link href={`/comprar?producto=${product.payKey}`} className="btn btn-gold">
              Adquirir
            </Link>
          )}
        </div>
      </section>
    </>
  );
}

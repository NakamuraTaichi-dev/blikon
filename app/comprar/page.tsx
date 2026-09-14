"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CREDIT_PACKS, OTHER_PACKS, PAY_CATEGORIES, RFC_REGEX } from "@/lib/data";
import { createOrder, getSession, registerUser } from "@/lib/store";

const STEPS = ["Selecciona tus productos", "Ingresa tus datos", "Elige tu forma de pago", "Finaliza tu compra"];
const METHODS = [
  { id: "tarjeta", label: "Tarjeta de débito o crédito" },
  { id: "paypal", label: "Cuenta PayPal" },
  { id: "oxxo", label: "Depósito en efectivo / OXXO" },
  { id: "transferencia", label: "Transferencia electrónica" },
];

type Pack = { label: string; price: number };

function CheckoutInner() {
  const params = useSearchParams();
  const initialCat = params.get("producto") === "timbrado" ? "timbrado" : params.get("producto") === "buzon" ? "buzon" : params.get("producto") === "contables" ? "erp" : params.get("producto") === "addendas" ? "otros" : "cfdi";
  const [step, setStep] = useState(0);
  const [cat, setCat] = useState(initialCat);
  const [selected, setSelected] = useState<Pack | null>(null);
  const [info, setInfo] = useState({ rfc: "", razonSocial: "", email: "", telefono: "", password: "Demo1234" });
  const [method, setMethod] = useState("tarjeta");
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  const packs: Pack[] = useMemo(() => {
    if (cat === "cfdi") return CREDIT_PACKS.map((p) => ({ label: p.label, price: p.price }));
    return OTHER_PACKS[cat] ?? [];
  }, [cat]);

  const total = selected?.price ?? 0;

  function nextFromProducts() {
    if (!selected) return setError("Selecciona un paquete.");
    setError("");
    setStep(1);
  }

  function nextFromData(e: FormEvent) {
    e.preventDefault();
    if (!RFC_REGEX.test(info.rfc.toUpperCase())) return setError("RFC con formato inválido.");
    if (!info.razonSocial || !info.email) return setError("Complete los datos fiscales.");
    setError("");
    setStep(2);
  }

  async function finish() {
    const session = await getSession();
    if (!session && params.get("nuevo") === "1") {
      try {
        await registerUser({
          rfc: info.rfc.toUpperCase(),
          razonSocial: info.razonSocial,
          email: info.email,
          password: info.password,
          telefono: info.telefono,
        });
      } catch {
        /* already registered */
      }
    }
    try {
      const order = await createOrder({
        product: `${PAY_CATEGORIES.find((c) => c.id === cat)?.label} · ${selected?.label}`,
        amount: total,
        rfc: info.rfc.toUpperCase(),
        razonSocial: info.razonSocial,
        email: info.email,
        method,
      });
      setOrderId(order.id);
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo registrar la orden.");
    }
  }

  return (
    <>
      <div className="warn-bar">
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span aria-hidden>⚠</span>
          <span>
            Cuando realices alguna compra, recuerda generar la orden de pago, ya que en caso de depósito a cuentas distintas a las marcadas, no procederá activación.
          </span>
        </div>
        <a className="more" href="/faq">
          MÁS INFORMACIÓN
        </a>
      </div>
      <div className="checkout-hero">
        <h1>Adquiere y compra tus productos</h1>
        <p>
          Con nuestro sistema de Pago Online tendrás al alcance las opciones de compra que te permitirán decidir el tiempo de activación del producto CFDI que sea de tu preferencia.
        </p>
      </div>
      <section className="section">
        <div className="wrap">
          <div className="steps">
            {STEPS.map((label, i) => (
              <button key={label} className={`step ${step === i ? "active" : ""}`} onClick={() => i < step && setStep(i)}>
                {i + 1}. {label}
              </button>
            ))}
          </div>

          {step === 0 && (
            <>
              <div className="cats">
                {PAY_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    className={`cat ${cat === c.id ? "active" : ""}`}
                    onClick={() => {
                      setCat(c.id);
                      setSelected(null);
                    }}
                  >
                    <img src={c.icon} alt="" />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
              <div className="checkout-grid">
                <div>
                  <div className="bold" style={{ marginBottom: 10 }}>
                    {cat === "cfdi" ? "Selecciona los créditos que deseas adquirir:" : "Selecciona el producto:"}
                  </div>
                  {packs.map((p) => (
                    <label key={p.label} className="pack-row">
                      <input
                        type="radio"
                        name="pack"
                        checked={selected?.label === p.label}
                        onChange={() => setSelected(p)}
                      />
                      <span>{p.label}</span>
                      <span>${p.price.toLocaleString("es-MX")}.00</span>
                      <span>▾</span>
                    </label>
                  ))}
                  {cat === "cfdi" && (
                    <p className="hint">
                      * Los paquetes de CFDI tienen vigencia de 1 año. A partir de 2,500 créditos la vigencia es de 2 años.
                    </p>
                  )}
                  {error && <p className="error">{error}</p>}
                </div>
                <aside className="summary">
                  <h3>RESUMEN DE COMPRA</h3>
                  <div className="body">
                    <div className="total">TOTAL ${total.toLocaleString("es-MX")}.00</div>
                    <p className="hint">Todos nuestros precios incluyen IVA.</p>
                    <button className={`btn-continue ${selected ? "enabled" : ""}`} onClick={nextFromProducts}>
                      Continuar
                    </button>
                  </div>
                </aside>
              </div>
            </>
          )}

          {step === 1 && (
            <form className="form-card" style={{ maxWidth: 640, margin: "0 auto" }} onSubmit={nextFromData}>
              <h2 className="h-navy">Ingresa tus datos</h2>
              <div className="field">
                <label>RFC</label>
                <input className="uppercase" maxLength={13} value={info.rfc} onChange={(e) => setInfo({ ...info, rfc: e.target.value })} required />
              </div>
              <div className="field">
                <label>Razón social / Nombre</label>
                <input value={info.razonSocial} onChange={(e) => setInfo({ ...info, razonSocial: e.target.value })} required />
              </div>
              <div className="field">
                <label>Correo electrónico</label>
                <input type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} required />
              </div>
              <div className="field">
                <label>Teléfono</label>
                <input value={info.telefono} onChange={(e) => setInfo({ ...info, telefono: e.target.value })} />
              </div>
              {error && <p className="error">{error}</p>}
              <button className="btn btn-navy" type="submit">
                Continuar
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="form-card" style={{ maxWidth: 640, margin: "0 auto" }}>
              <h2 className="h-navy">Elige tu forma de pago</h2>
              {METHODS.map((m) => (
                <label key={m.id} style={{ display: "block", margin: "10px 0" }}>
                  <input type="radio" name="method" checked={method === m.id} onChange={() => setMethod(m.id)} /> {m.label}
                </label>
              ))}
              <p className="bold">Total: ${total.toLocaleString("es-MX")}.00 IVA incluido</p>
              <button className="btn btn-gold" onClick={finish}>
                Pagar y finalizar
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="form-card center" style={{ maxWidth: 640, margin: "0 auto" }}>
              <h2 className="h-navy">Finaliza tu compra</h2>
              <p className="ok">Orden {orderId} registrada.</p>
              <p>
                {selected?.label} · ${total.toLocaleString("es-MX")}.00
              </p>
              <p className="hint">
                {method === "tarjeta" || method === "paypal"
                  ? "Activación inmediata."
                  : "La activación ocurre en 24 a 48 horas al confirmar el depósito o transferencia."}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function ComprarPage() {
  return (
    <Suspense>
      <CheckoutInner />
    </Suspense>
  );
}

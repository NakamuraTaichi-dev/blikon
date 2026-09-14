"use client";

import { FormEvent, useState } from "react";
import { RFC_REGEX } from "@/lib/data";
import { savePvLead } from "@/lib/store";

const BLOCKS = [
  {
    title: "Seguridad y actualizaciones",
    items: [
      ["Seguridad de la información", "El sistema se instala en su equipo por lo que su información queda solamente en su equipo de cómputo sin la vulnerabilidad de tener información en la WEB."],
      ["Copia de seguridad", "No hay límites en la cantidad de copias de seguridad ni tamaño de archivo."],
      ["Cambio de equipo", "Se facilita el cambio de equipo de cómputo llevando toda su información en una copia de seguridad para dar continuidad a su operación."],
      ["Actualizaciones y mejoras", "Sin costo adicional por actualizaciones en catálogos que indique el SAT así como mejoras al sistema al ingresar le informa de la actualización y se realiza en segundos."],
    ],
  },
  {
    title: "Fácil de usar",
    items: [
      ["Compatibilidad con dispositivos", "El sistema opera con los dispositivos ya instalados en su equipo por ejemplo: impresora de ticket, lector de código de barras, caja de efectivo, terminal de cobro con tarjeta."],
      ["Flujo de operación", "Se usan recursos de su equipo de cómputo, lo que garantiza que el sistema no será lento o intermitente."],
      ["Carga masiva de información", "Se permite realizar carga masiva de información de productos y clientes a partir de plantillas."],
      ["Soporte técnico", "Apoyo en instalación del sistema así como atención a dudas sobre el uso del sistema sin límite ni costo adicional."],
      ["Atención de varios clientes al mismo tiempo", "Es posible dejar en espera un ticket para atender a otro cliente y posteriormente regresar al que se dejó pendiente, permitiendo una atención rápida."],
      ["Reportes", "Se pueden obtener reportes en Excel de las ventas realizadas, lista de productos con existencias mínimas y kardex por producto."],
    ],
  },
  {
    title: "Facturas y ventas eficientes",
    items: [
      ["Múltiples cajeros y formas de pago", "El sistema se personaliza de acuerdo a la naturaleza de operación del negocio."],
      ["Factura global", "El sistema concentra los tickets no facturados en individual para mandar a generar la factura global por el periodo que se indique."],
      ["Factura a clientes", "El punto de venta está vinculado al sistema en línea por lo que al realizar la venta es posible mandar a facturar la venta realizada al cliente en específico."],
      ["Producto común", "Al realizar la venta se puede incluir algún producto que no esté en inventario porque sea algo esporádico del que se requiere ticket o factura."],
      ["Verificador de precios", "Para no cancelar productos en el ticket es posible verificar el precio de algún producto para decidir la compra."],
      ["Precio individual y precio de mayoreo", "Al catálogo de productos se le puede configurar dos precios para negocios en los que se maneja ventas al menudeo y mayoreo."],
    ],
  },
];

export default function PuntoVentaPage() {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const rfc = String(fd.get("rfc") || "").toUpperCase();
    if (!RFC_REGEX.test(rfc)) return setErr("Formato inválido de RFC");
    try {
      await savePvLead({
        rfc,
        razonSocial: String(fd.get("razonSocial") || ""),
        telefono: String(fd.get("telefono") || ""),
        email: String(fd.get("email") || ""),
      });
      setErr("");
      setMsg("Registro enviado. Su prueba de 30 días queda habilitada en esta demostración.");
      e.currentTarget.reset();
    } catch (error) {
      setMsg("");
      setErr(error instanceof Error ? error.message : "No se pudo enviar el registro.");
    }
  }

  return (
    <>
      <div className="pv-hero">
        <div className="wrap">
          <div className="PVheader">
            <h1 className="condensed" style={{ fontSize: 36, margin: 0 }}>
              Punto de Venta
            </h1>
            <p>Folios Digitales te da a conocer su nuevo punto de venta</p>
          </div>
          <div className="pv-card">
            <div>
              <div>Regístrate y obtén</div>
              <div className="bold" style={{ color: "var(--blue)", fontSize: 20 }}>
                30 días de prueba ¡Gratis!
              </div>
            </div>
            <a href="#formularioPV" className="btn btn-gold">
              Comienza aquí
            </a>
          </div>
        </div>
      </div>
      <div className="wrap">
        <h2 className="h-navy" style={{ marginTop: 28 }}>
          Ventajas de usar nuestro punto de venta:
        </h2>
        {BLOCKS.map((b) => (
          <section key={b.title} className="pv-block">
            <h3>{b.title}</h3>
            {b.items.map(([t, d]) => (
              <div key={t}>
                <h4>{t}</h4>
                <p>{d}</p>
              </div>
            ))}
          </section>
        ))}
      </div>
      <div className="pv-promo">
        <div>¡Precio de lanzamiento!</div>
        <div className="price">$2,000.00</div>
        <div>licencia anual</div>
        <div style={{ marginTop: 12 }}>
          Precio preferencial <b>$1,500.00</b> licencia anual
        </div>
        <div>Si eres usuario activo de CFDI</div>
      </div>
      <section className="section honey" id="formularioPV">
        <div className="wrap" style={{ maxWidth: 680 }}>
          <form className="form-card" onSubmit={onSubmit}>
            <h2 className="h-navy">Ingrese su información para disfrutar de 30 días de prueba ¡Gratis!</h2>
            <div className="field">
              <label>
                RFC: <span className="req">*</span>
              </label>
              <input name="rfc" className="uppercase" maxLength={13} placeholder="AAAA010203AAA" required />
            </div>
            <div className="field">
              <label>
                Razón Social: <span className="req">*</span>
              </label>
              <input name="razonSocial" placeholder="Ingrese la razón social" required />
            </div>
            <div className="field">
              <label>
                Teléfono: <span className="req">*</span>
              </label>
              <input name="telefono" maxLength={10} placeholder="1234567890" required />
            </div>
            <div className="field">
              <label>
                E-mail: <span className="req">*</span>
              </label>
              <input name="email" placeholder="ejemplo@sucorreo.com" required />
            </div>
            <p className="hint">* Campos obligatorios</p>
            {err && <p className="error">{err}</p>}
            <button className="btn btn-navy" type="submit">
              Aceptar
            </button>
            {msg && <p className="ok">{msg}</p>}
          </form>
        </div>
      </section>
    </>
  );
}

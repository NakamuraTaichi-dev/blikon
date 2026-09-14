"use client";

import { FormEvent, useState } from "react";
import { RFC_REGEX } from "@/lib/data";

export default function DescargaXmlPage() {
  const [msg, setMsg] = useState("");
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const rfc = String(fd.get("rfc") || "").toUpperCase();
    if (!RFC_REGEX.test(rfc)) return setMsg("RFC inválido.");
    setMsg(
      `Consulta demo para ${rfc}. En el sistema original esta herramienta abre la descarga SAT/ToolsFP. Aquí se simula la búsqueda de XML por rango de fechas.`
    );
  }
  return (
    <>
      <div className="page-banner">
        <div className="wrap">
          <h1>Descargue sus XML Gratis</h1>
          <p>Consulta y descarga comprobantes emitidos o recibidos.</p>
        </div>
      </div>
      <section className="section honey">
        <div className="wrap" style={{ maxWidth: 640 }}>
          <form className="form-card" onSubmit={onSubmit}>
            <div className="field">
              <label>RFC</label>
              <input name="rfc" className="uppercase" maxLength={13} required />
            </div>
            <div className="field">
              <label>Fecha inicial</label>
              <input name="desde" type="date" required />
            </div>
            <div className="field">
              <label>Fecha final</label>
              <input name="hasta" type="date" required />
            </div>
            <div className="field">
              <label>Tipo</label>
              <select name="tipo">
                <option>Emitidos</option>
                <option>Recibidos</option>
              </select>
            </div>
            <button className="btn btn-blue" type="submit">
              Buscar XML
            </button>
            {msg && <p>{msg}</p>}
          </form>
        </div>
      </section>
    </>
  );
}

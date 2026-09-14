"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/data";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="soporte-box" onClick={() => setOpen((v) => !v)} type="button">
        Soporte Técnico
      </button>
      {open && (
        <div className="chat-panel">
          <div className="chat-head">Folios Digitales Soporte Técnico</div>
          <div className="chat-body">
            <p>Horario: lunes a viernes, 9:00 a 19:00 horas.</p>
            <p>
              Soporte: <a href={`tel:${SITE.phones.soporteTel}`}>{SITE.phones.soporte}</a>
              <br />
              Ventas: <a href={`tel:${SITE.phones.ventasTel}`}>{SITE.phones.ventas}</a>
            </p>
            <Link href="/soporte" className="btn btn-blue" onClick={() => setOpen(false)}>
              Generar ticket
            </Link>
          </div>
        </div>
      )}
      <button className="chat-btn" onClick={() => setOpen((v) => !v)} type="button">
        {open ? "Cerrar" : "Chat Ventas"}
      </button>
    </>
  );
}

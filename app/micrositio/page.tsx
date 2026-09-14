"use client";

import { FormEvent, useState } from "react";

export default function MicrositioPage() {
  const [msg, setMsg] = useState("");
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const user = String(fd.get("usuario") || "");
    const pass = String(fd.get("password") || "");
    if (user && pass) {
      setMsg(`Bienvenido, distribuidor ${user}. Este micrositio local replica el acceso de socios y recargas.`);
    } else {
      setMsg("Ingrese usuario y contraseña de distribuidor.");
    }
  }
  return (
    <div className="login-shell">
      <div className="login-card">
        <img src="/assets/logos/logo-color.svg" alt="" style={{ height: 40 }} />
        <h1>Micrositio de distribuidores</h1>
        <p className="hint">Acceso para socios, recargas y seguimiento de clientes.</p>
        <form onSubmit={onSubmit}>
          <div className="field">
            <label>Usuario</label>
            <input name="usuario" required />
          </div>
          <div className="field">
            <label>Contraseña</label>
            <input name="password" type="password" required />
          </div>
          <button className="btn btn-blue" type="submit">
            Ingresar
          </button>
        </form>
        {msg && <p className="ok">{msg}</p>}
      </div>
    </div>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { getOrders, getSession, getTickets, loginUser, logoutUser, type User } from "@/lib/store";

export default function SistemaPage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Awaited<ReturnType<typeof getOrders>>>([]);
  const [tickets, setTickets] = useState<Awaited<ReturnType<typeof getTickets>>>([]);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("inicio");

  useEffect(() => {
    getSession().then(setUser);
  }, []);

  useEffect(() => {
    if (!user) return;
    Promise.all([getOrders(), getTickets()]).then(([nextOrders, nextTickets]) => {
      setOrders(nextOrders.filter((o) => o.rfc === user.rfc));
      setTickets(nextTickets.filter((t) => t.rfc === user.rfc));
    });
  }, [user]);

  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      const usuario = String(fd.get("usuario") || "");
      const cuenta = String(fd.get("cuenta") || "");
      const password = String(fd.get("password") || "");
      setUser(await loginUser(usuario || cuenta, password, cuenta));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Usuario, cuenta o contraseña incorrectos.");
    }
  }

  if (!user) {
    return (
      <div className="login-page">
        <div className="login-top">
          <div>
            <div className="login-brand">
              <img src="/assets/logos/logo-color.svg" alt="Folios Digitales PREMIUM" />
              <span className="line" />
              <img src="/assets/logos/blikon-color.svg" alt="blikon" />
            </div>
            <img className="login-welcome" src="/assets/login/bienvenido.svg" alt="Bienvenido a tu sistema de facturación online" />
          </div>
          <form className="login-box" onSubmit={onLogin}>
            <div className="login-field">
              <label className="ph">
                <img src="/assets/login/usuario.svg" alt="" />
                <span>Usuario</span>
              </label>
              <input name="usuario" className="uppercase" maxLength={13} autoComplete="username" />
            </div>
            <div className="login-field">
              <label className="ph">
                <img src="/assets/login/cuenta.svg" alt="" />
                <span>Cuenta</span>
              </label>
              <input name="cuenta" type="password" autoComplete="username" />
            </div>
            <div className="login-field">
              <label className="ph">
                <img src="/assets/login/contrasenia.svg" alt="" />
                <span>Contraseña</span>
              </label>
              <input name="password" type="password" autoComplete="current-password" />
            </div>
            {error && <p className="error">{error}</p>}
            <button className="login-submit" type="submit">
              Iniciar sesión
            </button>
            <div className="login-links">
              <Link href="/soporte" className="forgot">
                ¿Olvidaste tu contraseña?
              </Link>
              <span style={{ color: "#c5c5c5" }}>|</span>
              <Link href="/registro" className="reg">
                Registrar usuario
              </Link>
            </div>
          </form>
        </div>
        <Link href="/registro" className="login-banner">
          <img src="/assets/login/banner.jpg" alt="Si eres usuario nuevo obtén 10 facturas Gratis" />
        </Link>
        <div className="login-copy">Blikon® Todos los derechos reservados. México 2026</div>
      </div>
    );
  }

  return (
    <div className="dash">
      <aside className="dash-side">
        <div className="bold" style={{ marginBottom: 16 }}>
          Sistema OnLine FD
        </div>
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 16 }}>{user.rfc}</div>
        {[
          ["inicio", "Panel principal"],
          ["facturas", "Emitir CFDI"],
          ["consultas", "Consultar comprobantes"],
          ["catalogos", "Catálogos"],
          ["compras", "Mis compras"],
          ["soporte", "Soporte técnico"],
        ].map(([id, label]) => (
          <button key={id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
        <Link href="/">Volver al portal</Link>
        <button
          onClick={async () => {
            await logoutUser();
            setUser(null);
          }}
        >
          Cerrar sesión
        </button>
      </aside>
      <div className="dash-main">
        {tab === "inicio" && (
          <>
            <h2 className="h-navy">Información de cuenta</h2>
            <div className="stat-grid">
              <div className="stat">
                <span>Créditos disponibles</span>
                <b>{user.credits}</b>
              </div>
              <div className="stat">
                <span>Compras</span>
                <b>{orders.length}</b>
              </div>
              <div className="stat">
                <span>Tickets</span>
                <b>{tickets.length}</b>
              </div>
            </div>
            <p style={{ marginTop: 18 }}>
              {user.razonSocial} · {user.email}
            </p>
            <Link href="/comprar" className="btn btn-gold">
              ¿Necesitas más créditos?
            </Link>
          </>
        )}
        {tab === "facturas" && (
          <form
            className="form-card"
            onSubmit={(e) => {
              e.preventDefault();
              alert("CFDI generado en modo demostración.");
            }}
          >
            <h3>Emitir comprobante</h3>
            <div className="field">
              <label>Tipo de CFDI</label>
              <select name="tipo">
                {["Factura", "Nota de crédito", "Recibo de honorarios", "Arrendamiento", "Nómina", "Carta porte", "Pago"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>RFC receptor</label>
              <input name="receptor" className="uppercase" required />
            </div>
            <div className="field">
              <label>Concepto</label>
              <input name="concepto" required />
            </div>
            <div className="field">
              <label>Importe</label>
              <input name="importe" type="number" min="0.01" step="0.01" required />
            </div>
            <button className="btn btn-navy" type="submit">
              Timbrar
            </button>
          </form>
        )}
        {tab === "consultas" && (
          <div className="form-card">
            <h3>Comprobantes emitidos</h3>
            <p className="hint">Hasta 24 consultas diarias sin costo.</p>
          </div>
        )}
        {tab === "catalogos" && (
          <div className="form-card">
            <h3>Catálogos ilimitados</h3>
            <p>Clientes, productos y trabajadores.</p>
            <Link href="/productos/click">Migrar con Click</Link>
          </div>
        )}
        {tab === "compras" && (
          <div className="form-card">
            <h3>Historial de compras</h3>
            {orders.length === 0 && <p className="hint">Sin compras registradas.</p>}
            {orders.map((o) => (
              <p key={o.id}>
                {o.id} · {o.product} · ${o.amount.toLocaleString("es-MX")} · {o.status}
              </p>
            ))}
          </div>
        )}
        {tab === "soporte" && (
          <div className="form-card">
            <h3>Tickets</h3>
            {tickets.map((t) => (
              <p key={t.folio}>
                {t.folio} · {t.status} · {t.tipo}
              </p>
            ))}
            <Link href="/soporte">Nuevo ticket</Link>
          </div>
        )}
      </div>
    </div>
  );
}

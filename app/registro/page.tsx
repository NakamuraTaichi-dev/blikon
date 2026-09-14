"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RFC_REGEX } from "@/lib/data";
import { registerUser } from "@/lib/store";

export default function RegistroPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const rfc = String(fd.get("rfc") || "").toUpperCase();
    if (!RFC_REGEX.test(rfc)) return setError("RFC inválido");
    try {
      await registerUser({
        rfc,
        razonSocial: String(fd.get("razonSocial") || ""),
        email: String(fd.get("email") || ""),
        password: String(fd.get("password") || ""),
        telefono: String(fd.get("telefono") || ""),
      });
      router.push("/sistema");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo registrar");
    }
  }

  return (
    <div className="login-page">
      <div className="login-top">
        <div>
          <div className="login-brand">
            <img src="/assets/logos/logo-color.svg" alt="Folios Digitales PREMIUM" />
            <span className="line" />
            <img src="/assets/logos/blikon-color.svg" alt="blikon" />
          </div>
          <img className="login-welcome" src="/assets/login/bienvenido.svg" alt="Bienvenido" />
          <p style={{ marginTop: 16, maxWidth: 360 }}>
            Regístrate y obtén <b>10 facturas Gratis</b> con vigencia de 3 meses.
          </p>
        </div>
        <form className="login-box" onSubmit={onSubmit}>
          <div className="login-field">
            <label className="ph">
              <span>RFC / Usuario</span>
            </label>
            <input name="rfc" className="uppercase" maxLength={13} required />
          </div>
          <div className="login-field">
            <label className="ph">
              <span>Razón social</span>
            </label>
            <input name="razonSocial" required />
          </div>
          <div className="login-field">
            <label className="ph">
              <span>Correo</span>
            </label>
            <input name="email" type="email" required />
          </div>
          <div className="login-field">
            <label className="ph">
              <span>Teléfono</span>
            </label>
            <input name="telefono" />
          </div>
          <div className="login-field">
            <label className="ph">
              <span>Contraseña</span>
            </label>
            <input name="password" type="password" required />
          </div>
          {error && <p className="error">{error}</p>}
          <button className="login-submit" type="submit">
            Registrar usuario
          </button>
          <div className="login-links">
            <Link href="/sistema" className="reg">
              Ya tengo cuenta
            </Link>
          </div>
        </form>
      </div>
      <div className="login-copy">Blikon® Todos los derechos reservados. México 2026</div>
    </div>
  );
}

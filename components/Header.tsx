"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession, logoutUser } from "@/lib/store";

const NAV = [
  { href: "/correo-seguro", label: "Correo electrónico seguro" },
  { href: "/punto-venta", label: "Punto de Venta", nuevo: true },
  { href: "/productos", label: "Productos" },
  { href: "/soporte", label: "Soporte" },
];

export function Header({ home = false }: { home?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getSession().then((session) => {
      if (active) setUser(session?.razonSocial ?? null);
    });
    return () => {
      active = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!home) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [home]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const light = home && !scrolled;
  const logo = light ? "/assets/logos/logo-white.svg" : "/assets/logos/logo-color.svg";
  const blikon = light ? "/assets/logos/blikon-white-text.svg" : "/assets/logos/blikon-color.svg";

  return (
    <header className={`site-header ${home ? "on-home" : "solid"} ${light ? "light" : "scrolled"}`}>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Folios Digitales Premium">
          <img className="brand-fd" src={logo} alt="Folios Digitales PREMIUM" />
          <span className="brand-divider" />
          <span className={`brand-blikon ${light ? "on-dark" : ""}`}>
            <img src={blikon} alt="blikon" />
          </span>
        </Link>

        <button className="hamburger" aria-label="Menú" onClick={() => setOpen((v) => !v)}>
          <span />
          <span />
          <span />
        </button>

        <Link href="/comprar" className="btn-buy">
          Comprar
        </Link>

        <div className={`nav-wrap ${open ? "open" : ""}`}>
          <nav className="nav-links">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${item.nuevo ? "pv" : ""} ${pathname.startsWith(item.href) ? "active" : ""}`}
              >
                {item.nuevo && (
                  <span className="nuevo-badge">
                    <img src="/assets/general/asterisco.svg" alt="" />
                    Nuevo
                  </span>
                )}
                {item.label}
              </Link>
            ))}
            <Link href="/comprar" className="nav-cta teal">
              Comprar
            </Link>
            <Link href="/micrositio" className="nav-link micrositio">
              Micrositio
            </Link>
          </nav>
          <div className="nav-right">
            {user ? (
              <>
                <span className="already">{user}</span>
                <Link href="/sistema" className="btn-outline">
                  Ingresa al sistema
                </Link>
                <button
                  className="btn-outline"
                  onClick={async () => {
                    await logoutUser();
                    setUser(null);
                    window.location.href = "/";
                  }}
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <span className="already">¿Ya facturas con nosotros?</span>
                <Link href="/sistema" className="btn-outline">
                  Ingresa al sistema
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

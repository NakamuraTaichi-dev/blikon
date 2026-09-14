"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageLoader() {
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<number | null>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setVisible(false), 650);
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const a = target?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
        return;
      }
      if (a.getAttribute("target") === "_blank") return;
      if (href === pathname) return;
      e.preventDefault();
      setVisible(true);
      window.setTimeout(() => router.push(href), 500);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname, router]);

  if (!visible) return null;

  return (
    <div className="page-loader" id="upLoader" role="status" aria-live="polite">
      <div className="page-loader-bg" />
      <div className="page-loader-inner">
        <img src="/assets/logos/logo-blanco.svg" alt="Folios Digitales Premium" />
        <span className="page-loader-text">Cargando...</span>
      </div>
    </div>
  );
}

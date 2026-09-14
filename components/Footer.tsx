import Link from "next/link";
import { SITE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <Link href="/" className="brand footer-brand">
            <img className="brand-fd" src="/assets/logos/logo-white.svg" alt="Folios Digitales Premium" />
            <span className="brand-divider" />
            <img src="/assets/logos/blikon-white.svg" alt="Blikon" />
          </Link>
          <div className="center">
            <div className="footer-label">Aceptamos:</div>
            <div className="pay-logos">
              <Link href="/comprar">
                <img src="/assets/general/mastercard.svg" alt="Mastercard" />
              </Link>
              <Link href="/comprar">
                <img src="/assets/general/visa.svg" alt="Visa" />
              </Link>
            </div>
          </div>
          <div className="footer-oxxo">
            <div className="footer-label">Paga en:</div>
            <img src="/assets/general/oxxo.png" alt="OXXO" />
          </div>
        </div>
        <div className="footer-mid">
          <div className="footer-links">
            <Link href="/aviso-privacidad">Aviso de privacidad</Link>
            <span>|</span>
            <Link href="/terminos">Términos y condiciones</Link>
            <br />
            <Link href="/soporte">Quejas y sugerencias</Link>
          </div>
          <div className="footer-hours">
            Horario de Atención: <b>{SITE.hours}</b>
          </div>
        </div>
        <div className="footer-copy">Todos los derechos reservados ® Blikon 2020</div>
      </div>
    </footer>
  );
}

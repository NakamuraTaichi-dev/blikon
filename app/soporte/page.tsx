"use client";

import { FormEvent, useMemo, useState } from "react";
import { MANUALS_MORE, MANUALS_VISIBLE, RFC_REGEX, TICKET_TYPES } from "@/lib/data";
import { createTicket, findTicket, generateCaptcha } from "@/lib/store";

export default function SoportePage() {
  const [more, setMore] = useState(false);
  const [captcha, setCaptcha] = useState(() => generateCaptcha());
  const [files, setFiles] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [consult, setConsult] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const rfcOk = useMemo(() => RFC_REGEX, []);

  function onAddFile(list: FileList | null) {
    if (!list?.length) return;
    const next = [...files];
    Array.from(list).forEach((f) => {
      if (next.length < 5 && f.size <= 10 * 1024 * 1024) next.push(f.name);
    });
    setFiles(next);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const rfc = String(fd.get("rfc") || "").trim().toUpperCase();
    const razonSocial = String(fd.get("razonSocial") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const telefono = String(fd.get("telefono") || "").trim();
    const comentarios = String(fd.get("comentarios") || "").trim();
    const tipo = String(fd.get("tipo") || TICKET_TYPES[0]);
    const code = String(fd.get("captcha") || "").trim().toUpperCase();
    const nextErrors: Record<string, string> = {};
    if (!rfcOk.test(rfc)) nextErrors.rfc = "Formato inválido";
    if (!razonSocial) nextErrors.razonSocial = "*";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Formato inválido";
    if (!/^\d{10,}$/.test(telefono.replace(/\D/g, ""))) nextErrors.telefono = "Formato inválido";
    if (!comentarios) nextErrors.comentarios = "*";
    if (code !== captcha) nextErrors.captcha = "Código incorrecto";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    try {
      const ticket = await createTicket({
        tipo,
        rfc,
        razonSocial,
        email,
        telefono,
        comentarios,
        files,
      });
      setMessage(`Ticket ${ticket.folio} generado. Te responderemos en menos de 24 hrs a ${email}.`);
      e.currentTarget.reset();
      setFiles([]);
      setCaptcha(generateCaptcha());
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "No se pudo generar el ticket.");
    }
  }

  async function onConsult(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const rfc = String(fd.get("rfcTickets") || "");
    const folio = String(fd.get("folioTickets") || "");
    const found = await findTicket(rfc, folio);
    setConsult(
      found
        ? `Folio ${found.folio} · ${found.status} · ${found.tipo} · ${new Date(found.createdAt).toLocaleString("es-MX")}`
        : "No se encontró un ticket con esos datos."
    );
  }

  return (
    <>
      <div className="page-banner">
        <div className="wrap">
          <h1>Soporte</h1>
          <p>Consulta infografías, genera un ticket o revisa el estatus de tu solicitud.</p>
        </div>
      </div>
      <section className="section honey">
        <div className="wrap support-layout">
          <div>
            <div className="bold" style={{ marginBottom: 8, color: "var(--navy)" }}>
              Consulta nuestras infografías y videos:
            </div>
            {[...MANUALS_VISIBLE, ...(more ? MANUALS_MORE : [])].map((m) => (
              <div key={m.title} className="manual">
                <img src="/assets/general/pdf.svg" alt="" />
                <a href={m.href} target="_blank" rel="noreferrer">
                  {m.title} {"nuevo" in m && m.nuevo ? <span className="nuevo">¡NUEVO!</span> : null}
                </a>
              </div>
            ))}
            <button className="link-more" style={{ marginTop: 12, background: "none", border: 0, cursor: "pointer" }} onClick={() => setMore((v) => !v)}>
              {more ? "Ver menos" : "Ver más documentos"}
            </button>
            <div className="panel" style={{ marginTop: 24 }}>
              <div className="bold">Línea de soporte técnico</div>
              <p className="hint">Horario de atención: Lunes a Viernes 9am - 7pm</p>
              <p>
                T. <a href="tel:2221413900">222 141 3900</a>
              </p>
              <p>
                Escríbenos a nuestro correo:
                <br />
                <a href="mailto:mesadecontrol@foliosdigitales.com.mx">mesadecontrol@foliosdigitales.com.mx</a>
              </p>
            </div>
          </div>

          <div>
            <form className="form-card" onSubmit={onSubmit}>
              <div className="bold" style={{ fontSize: 20, color: "var(--navy)" }}>
                Genera un ticket de soporte
              </div>
              <p className="hint">
                Al usar nuestro sistema de soporte por tickets, contestaremos tu duda en menos de 24 hrs, directo a tu correo electrónico. Evita largas llamadas.
              </p>
              <p className="hint">Todos los campos son obligatorios</p>
              <div className="field">
                <label>Tipo</label>
                <select name="tipo" defaultValue={TICKET_TYPES[0]}>
                  {TICKET_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>
                  RFC: <span className="req">*</span>
                </label>
                <input name="rfc" maxLength={13} className="uppercase" />
                {errors.rfc && <div className="error">{errors.rfc}</div>}
              </div>
              <div className="field">
                <label>
                  Razón social: <span className="req">*</span>
                </label>
                <input name="razonSocial" maxLength={150} />
                {errors.razonSocial && <div className="error">{errors.razonSocial}</div>}
              </div>
              <div className="field">
                <label>
                  Correo: <span className="req">*</span>
                </label>
                <input name="email" maxLength={150} />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="field">
                <label>
                  Teléfono: <span className="req">*</span>
                </label>
                <input name="telefono" maxLength={42} />
                {errors.telefono && <div className="error">{errors.telefono}</div>}
              </div>
              <div className="field">
                <label>
                  Comentarios: <span className="req">*</span>
                </label>
                <textarea name="comentarios" maxLength={500} />
                {errors.comentarios && <div className="error">{errors.comentarios}</div>}
              </div>
              <div className="field">
                <label>Adjuntar archivo</label>
                <input type="file" multiple onChange={(e) => onAddFile(e.target.files)} />
                <div className="hint">
                  jpg, jpeg, png, pdf, doc, docx, txt, xlsx, xml, zip, rar. Máximo 5 archivos, 10 MB c/u.
                </div>
                {files.length > 0 && <div className="hint">{files.join(", ")}</div>}
              </div>
              <div className="field">
                <label>Captcha</label>
                <div className="captcha-row">
                  <div className="captcha-box">{captcha}</div>
                  <button type="button" className="btn-outline" onClick={() => setCaptcha(generateCaptcha())}>
                    Actualizar
                  </button>
                </div>
                <input name="captcha" maxLength={6} placeholder="Ingresar el código" autoComplete="off" style={{ marginTop: 8 }} />
                {errors.captcha && <div className="error">{errors.captcha}</div>}
              </div>
              <button className="btn btn-blue" type="submit">
                Enviar
              </button>
              {message && <p className="ok">{message}</p>}
            </form>

            <form className="form-card" style={{ marginTop: 20 }} onSubmit={onConsult}>
              <div className="bold" style={{ fontSize: 18, color: "var(--navy)" }}>
                Consultar mis tickets
              </div>
              <p className="hint">Si ya generaste un ticket de soporte, consúltalo aquí:</p>
              <div className="field">
                <label>RFC:</label>
                <input name="rfcTickets" maxLength={13} className="uppercase" />
              </div>
              <div className="field">
                <label>Folio:</label>
                <input name="folioTickets" maxLength={10} />
              </div>
              <button className="btn btn-blue" type="submit">
                Consultar
              </button>
              {consult && <p>{consult}</p>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

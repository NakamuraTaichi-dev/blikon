import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "fdp_session";

export type SessionPayload = {
  rfc: string;
  token?: string;
  razonSocial?: string;
  email?: string;
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export function parseSession(raw: string | undefined | null): SessionPayload | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as SessionPayload;
    return data.rfc ? data : null;
  } catch {
    return null;
  }
}

export function getRequestSession(): SessionPayload | null {
  return parseSession(cookies().get(SESSION_COOKIE)?.value);
}

export function applySessionCookie(res: NextResponse, payload: SessionPayload) {
  res.cookies.set(SESSION_COOKIE, JSON.stringify(payload), cookieOptions);
  return res;
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  return res;
}

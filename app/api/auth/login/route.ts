import { NextRequest, NextResponse } from "next/server";
import { backendRequest, isBackendConfigured, jsonError } from "@/lib/api/backend";
import { applySessionCookie } from "@/lib/api/session";
import { getBackendConfig } from "@/lib/config";
import type { User } from "@/lib/store";

export const dynamic = "force-dynamic";

type LoginResponse = {
  user?: User;
  token?: string;
  rfc?: string;
  razonSocial?: string;
  email?: string;
  credits?: number;
};

export async function POST(req: NextRequest) {
  if (!isBackendConfigured()) {
    return NextResponse.json({ error: "Backend no configurado.", code: "NO_BACKEND" }, { status: 503 });
  }

  try {
    const body = await req.json();
    const data = await backendRequest<LoginResponse>(getBackendConfig().paths.login, {
      method: "POST",
      body,
    });
    const user =
      data.user ||
      ({
        rfc: String(data.rfc || body.usuario || "").toUpperCase(),
        razonSocial: data.razonSocial || "",
        email: data.email || "",
        password: "",
        credits: data.credits ?? 0,
        createdAt: new Date().toISOString(),
      } satisfies User);

    const res = NextResponse.json({ user });
    return applySessionCookie(res, {
      rfc: user.rfc,
      token: data.token,
      razonSocial: user.razonSocial,
      email: user.email,
    });
  } catch (error) {
    const { body, status } = jsonError(error);
    return NextResponse.json(body, { status });
  }
}

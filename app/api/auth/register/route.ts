import { NextRequest, NextResponse } from "next/server";
import { backendRequest, isBackendConfigured, jsonError } from "@/lib/api/backend";
import { applySessionCookie } from "@/lib/api/session";
import { getBackendConfig } from "@/lib/config";
import type { User } from "@/lib/store";

export const dynamic = "force-dynamic";

type RegisterResponse = {
  user?: User;
  token?: string;
};

export async function POST(req: NextRequest) {
  if (!isBackendConfigured()) {
    return NextResponse.json({ error: "Backend no configurado.", code: "NO_BACKEND" }, { status: 503 });
  }

  try {
    const body = await req.json();
    const data = await backendRequest<RegisterResponse>(getBackendConfig().paths.register, {
      method: "POST",
      body,
    });
    const user = data.user || {
      ...body,
      rfc: String(body.rfc || "").toUpperCase(),
      credits: 10,
      createdAt: new Date().toISOString(),
      password: "",
    };
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

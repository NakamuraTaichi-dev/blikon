import { NextResponse } from "next/server";
import { backendRequest, isBackendConfigured } from "@/lib/api/backend";
import { getRequestSession } from "@/lib/api/session";
import { getBackendConfig } from "@/lib/config";
import type { User } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = getRequestSession();
  if (!session) return NextResponse.json({ user: null });

  if (isBackendConfigured() && session.token) {
    try {
      const data = await backendRequest<{ user?: User }>(getBackendConfig().paths.session, { session });
      return NextResponse.json({ user: data.user || null });
    } catch {
      return NextResponse.json({ user: null });
    }
  }

  return NextResponse.json({
    user: {
      rfc: session.rfc,
      razonSocial: session.razonSocial || "",
      email: session.email || "",
      password: "",
      credits: 0,
      createdAt: "",
    },
  });
}

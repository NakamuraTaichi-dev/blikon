import { NextResponse } from "next/server";
import { backendRequest, isBackendConfigured } from "@/lib/api/backend";
import { clearSessionCookie, getRequestSession } from "@/lib/api/session";
import { getBackendConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

export async function POST() {
  const session = getRequestSession();
  if (isBackendConfigured() && session?.token) {
    try {
      await backendRequest(getBackendConfig().paths.logout, { method: "POST", session });
    } catch {
      /* still clear the local session */
    }
  }
  return clearSessionCookie(NextResponse.json({ ok: true }));
}

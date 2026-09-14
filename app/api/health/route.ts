import { NextResponse } from "next/server";
import { isBackendConfigured } from "@/lib/config";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "folios-digitales-premium",
    backend: isBackendConfigured() ? "configured" : "not_configured",
  });
}

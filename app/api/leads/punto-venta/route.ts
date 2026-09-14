import { NextRequest, NextResponse } from "next/server";
import { backendRequest, isBackendConfigured, jsonError } from "@/lib/api/backend";
import { getBackendConfig } from "@/lib/config";
import type { PvLead } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!isBackendConfigured()) {
    return NextResponse.json({ error: "Backend no configurado.", code: "NO_BACKEND" }, { status: 503 });
  }
  try {
    const payload = await req.json();
    const data = await backendRequest<{ lead?: PvLead } | PvLead>(getBackendConfig().paths.pvLead, {
      method: "POST",
      body: payload,
    });
    const lead = (data && typeof data === "object" && "lead" in data ? data.lead : data) as PvLead;
    return NextResponse.json({ lead });
  } catch (error) {
    const { body, status } = jsonError(error);
    return NextResponse.json(body, { status });
  }
}

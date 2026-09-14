import { NextRequest, NextResponse } from "next/server";
import { backendRequest, isBackendConfigured, jsonError } from "@/lib/api/backend";
import { getRequestSession } from "@/lib/api/session";
import { getBackendConfig } from "@/lib/config";
import type { Ticket } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isBackendConfigured()) {
    return NextResponse.json({ error: "Backend no configurado.", code: "NO_BACKEND" }, { status: 503 });
  }

  const rfc = req.nextUrl.searchParams.get("rfc") || "";
  const folio = req.nextUrl.searchParams.get("folio") || "";

  try {
    const data = await backendRequest<{ ticket?: Ticket } | Ticket>(getBackendConfig().paths.ticketLookup, {
      session: getRequestSession(),
      query: { rfc, folio },
    });
    const ticket = (data && typeof data === "object" && "ticket" in data ? data.ticket : data) as Ticket | null;
    return NextResponse.json({ ticket: ticket || null });
  } catch (error) {
    const { body, status } = jsonError(error);
    return NextResponse.json(body, { status });
  }
}

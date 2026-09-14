import { NextRequest, NextResponse } from "next/server";
import { backendRequest, isBackendConfigured, jsonError } from "@/lib/api/backend";
import { getRequestSession } from "@/lib/api/session";
import { getBackendConfig } from "@/lib/config";
import type { Ticket } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isBackendConfigured()) {
    return NextResponse.json({ error: "Backend no configurado.", code: "NO_BACKEND" }, { status: 503 });
  }
  try {
    const data = await backendRequest<{ tickets?: Ticket[] } | Ticket[]>(getBackendConfig().paths.tickets, {
      session: getRequestSession(),
    });
    const tickets = Array.isArray(data) ? data : data.tickets || [];
    return NextResponse.json({ tickets });
  } catch (error) {
    const { body, status } = jsonError(error);
    return NextResponse.json(body, { status });
  }
}

export async function POST(req: NextRequest) {
  if (!isBackendConfigured()) {
    return NextResponse.json({ error: "Backend no configurado.", code: "NO_BACKEND" }, { status: 503 });
  }
  try {
    const payload = await req.json();
    const data = await backendRequest<{ ticket?: Ticket } | Ticket>(getBackendConfig().paths.tickets, {
      method: "POST",
      body: payload,
      session: getRequestSession(),
    });
    const ticket = (data && typeof data === "object" && "ticket" in data ? data.ticket : data) as Ticket;
    return NextResponse.json({ ticket });
  } catch (error) {
    const { body, status } = jsonError(error);
    return NextResponse.json(body, { status });
  }
}

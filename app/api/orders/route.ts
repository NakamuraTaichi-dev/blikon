import { NextRequest, NextResponse } from "next/server";
import { backendRequest, isBackendConfigured, jsonError } from "@/lib/api/backend";
import { getRequestSession } from "@/lib/api/session";
import { getBackendConfig } from "@/lib/config";
import type { Order } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isBackendConfigured()) {
    return NextResponse.json({ error: "Backend no configurado.", code: "NO_BACKEND" }, { status: 503 });
  }
  try {
    const data = await backendRequest<{ orders?: Order[] } | Order[]>(getBackendConfig().paths.orders, {
      session: getRequestSession(),
    });
    const orders = Array.isArray(data) ? data : data.orders || [];
    return NextResponse.json({ orders });
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
    const data = await backendRequest<{ order?: Order } | Order>(getBackendConfig().paths.orders, {
      method: "POST",
      body: payload,
      session: getRequestSession(),
    });
    const order = (data && typeof data === "object" && "order" in data ? data.order : data) as Order;
    return NextResponse.json({ order });
  } catch (error) {
    const { body, status } = jsonError(error);
    return NextResponse.json(body, { status });
  }
}

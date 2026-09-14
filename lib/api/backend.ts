import { getBackendConfig, isBackendConfigured } from "@/lib/config";
import type { SessionPayload } from "./session";

export { isBackendConfigured };

export class BackendError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status = 502, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

type BackendOptions = {
  method?: string;
  body?: unknown;
  session?: SessionPayload | null;
  query?: Record<string, string | undefined>;
};

function joinUrl(base: string, prefix: string, path: string) {
  const cleanPrefix = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPrefix}${cleanPath}`;
}

export async function backendRequest<T>(path: string, options: BackendOptions = {}): Promise<T> {
  const config = getBackendConfig();
  if (!config.baseUrl) {
    throw new BackendError("BACKEND_API_URL no está configurada.", 503);
  }

  const url = new URL(joinUrl(config.baseUrl, config.prefix, path));
  if (options.query) {
    Object.entries(options.query).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (options.body !== undefined) headers["Content-Type"] = "application/json";
  if (config.apiKey) headers["X-Api-Key"] = config.apiKey;
  if (options.session?.token) headers.Authorization = `Bearer ${options.session.token}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const res = await fetch(url.toString(), {
      method: options.method || "GET",
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      cache: "no-store",
      signal: controller.signal,
    });

    const text = await res.text();
    let data: unknown = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }
    }

    if (!res.ok) {
      const payload = data && typeof data === "object" ? (data as Record<string, unknown>) : null;
      const message =
        (typeof payload?.message === "string" && payload.message) ||
        (typeof payload?.error === "string" && payload.error) ||
        `Error del backend (${res.status})`;
      throw new BackendError(message, res.status, data);
    }

    return data as T;
  } catch (error) {
    if (error instanceof BackendError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new BackendError("El backend no respondió a tiempo.", 504);
    }
    throw new BackendError(error instanceof Error ? error.message : "No se pudo conectar con el backend.", 502);
  } finally {
    clearTimeout(timer);
  }
}

export function jsonError(error: unknown) {
  if (error instanceof BackendError) {
    return { body: { error: error.message }, status: error.status };
  }
  return { body: { error: "Error interno del servidor." }, status: 500 };
}

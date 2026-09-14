export function isBackendEnabled() {
  return process.env.NEXT_PUBLIC_BACKEND_ENABLED === "true";
}

export function getBackendConfig() {
  const baseUrl = (process.env.BACKEND_API_URL || "").replace(/\/$/, "");
  const prefix = process.env.BACKEND_API_PREFIX || "";
  return {
    baseUrl,
    prefix,
    apiKey: process.env.BACKEND_API_KEY || "",
    timeoutMs: Number(process.env.BACKEND_API_TIMEOUT_MS || 12000),
    paths: {
      login: process.env.BACKEND_PATH_LOGIN || "/auth/login",
      register: process.env.BACKEND_PATH_REGISTER || "/auth/register",
      logout: process.env.BACKEND_PATH_LOGOUT || "/auth/logout",
      session: process.env.BACKEND_PATH_SESSION || "/auth/session",
      tickets: process.env.BACKEND_PATH_TICKETS || "/tickets",
      ticketLookup: process.env.BACKEND_PATH_TICKET_LOOKUP || "/tickets/lookup",
      orders: process.env.BACKEND_PATH_ORDERS || "/orders",
      pvLead: process.env.BACKEND_PATH_PV_LEAD || "/leads/punto-venta",
    },
  };
}

export function isBackendConfigured() {
  return Boolean(getBackendConfig().baseUrl);
}

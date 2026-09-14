declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BACKEND_ENABLED?: string;
    BACKEND_API_URL?: string;
    BACKEND_API_PREFIX?: string;
    BACKEND_API_KEY?: string;
    BACKEND_API_TIMEOUT_MS?: string;
    BACKEND_PATH_LOGIN?: string;
    BACKEND_PATH_REGISTER?: string;
    BACKEND_PATH_LOGOUT?: string;
    BACKEND_PATH_SESSION?: string;
    BACKEND_PATH_TICKETS?: string;
    BACKEND_PATH_TICKET_LOOKUP?: string;
    BACKEND_PATH_ORDERS?: string;
    BACKEND_PATH_PV_LEAD?: string;
  }
}

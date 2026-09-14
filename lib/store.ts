"use client";

import { api } from "@/lib/api/http";
import { isBackendEnabled } from "@/lib/config";

export type User = {
  rfc: string;
  razonSocial: string;
  email: string;
  password: string;
  telefono?: string;
  credits: number;
  createdAt: string;
};

export type Ticket = {
  folio: string;
  tipo: string;
  rfc: string;
  razonSocial: string;
  email: string;
  telefono: string;
  comentarios: string;
  files: string[];
  createdAt: string;
  status: "Abierto" | "En proceso" | "Resuelto";
};

export type Order = {
  id: string;
  product: string;
  amount: number;
  rfc: string;
  razonSocial: string;
  email: string;
  method: string;
  createdAt: string;
  status: "Activado" | "Pendiente de pago";
};

export type PvLead = {
  rfc: string;
  razonSocial: string;
  telefono: string;
  email: string;
  createdAt: string;
};

const KEYS = {
  users: "fdp_users",
  session: "fdp_session",
  tickets: "fdp_tickets",
  orders: "fdp_orders",
  pv: "fdp_pv",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

function localUsers() {
  return read<User[]>(KEYS.users, []);
}

function localTickets() {
  return read<Ticket[]>(KEYS.tickets, []);
}

function localOrders() {
  return read<Order[]>(KEYS.orders, []);
}

export async function registerUser(input: Omit<User, "credits" | "createdAt">): Promise<User> {
  if (isBackendEnabled()) {
    const { user } = await api.post<{ user: User }>("/api/auth/register", input);
    return user;
  }
  const users = localUsers();
  if (users.some((u) => u.rfc.toUpperCase() === input.rfc.toUpperCase())) {
    throw new Error("El RFC ya está registrado.");
  }
  if (users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
    throw new Error("El correo ya está registrado.");
  }
  const user: User = {
    ...input,
    rfc: input.rfc.toUpperCase(),
    credits: 10,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  write(KEYS.users, users);
  write(KEYS.session, user.rfc);
  return user;
}

export async function loginUser(rfcOrEmail: string, password: string, cuenta = ""): Promise<User> {
  if (isBackendEnabled()) {
    const { user } = await api.post<{ user: User }>("/api/auth/login", {
      usuario: rfcOrEmail,
      cuenta,
      password,
    });
    return user;
  }
  const users = localUsers();
  const key = rfcOrEmail.trim().toLowerCase();
  const user = users.find(
    (u) => (u.rfc.toLowerCase() === key || u.email.toLowerCase() === key) && u.password === password
  );
  if (!user) throw new Error("Usuario o contraseña incorrectos.");
  write(KEYS.session, user.rfc);
  return user;
}

export async function logoutUser() {
  if (isBackendEnabled()) {
    await api.post("/api/auth/logout");
    return;
  }
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS.session);
}

export async function getSession(): Promise<User | null> {
  if (isBackendEnabled()) {
    const { user } = await api.get<{ user: User | null }>("/api/auth/session");
    return user;
  }
  const rfc = read<string | null>(KEYS.session, null);
  if (!rfc) return null;
  return localUsers().find((u) => u.rfc === rfc) ?? null;
}

export function addCredits(rfc: string, amount: number) {
  const users = localUsers();
  const idx = users.findIndex((u) => u.rfc === rfc);
  if (idx >= 0) {
    users[idx].credits += amount;
    write(KEYS.users, users);
  }
}

export async function getTickets(): Promise<Ticket[]> {
  if (isBackendEnabled()) {
    const { tickets } = await api.get<{ tickets: Ticket[] }>("/api/tickets");
    return tickets;
  }
  return localTickets();
}

export async function createTicket(input: Omit<Ticket, "folio" | "createdAt" | "status">): Promise<Ticket> {
  if (isBackendEnabled()) {
    const { ticket } = await api.post<{ ticket: Ticket }>("/api/tickets", input);
    return ticket;
  }
  const tickets = localTickets();
  const folio = String(100000 + tickets.length + 1);
  const ticket: Ticket = {
    ...input,
    rfc: input.rfc.toUpperCase(),
    folio,
    createdAt: new Date().toISOString(),
    status: "Abierto",
  };
  tickets.push(ticket);
  write(KEYS.tickets, tickets);
  return ticket;
}

export async function findTicket(rfc: string, folio: string): Promise<Ticket | null> {
  if (isBackendEnabled()) {
    const { ticket } = await api.get<{ ticket: Ticket | null }>(
      `/api/tickets/lookup?rfc=${encodeURIComponent(rfc)}&folio=${encodeURIComponent(folio)}`
    );
    return ticket;
  }
  return (
    localTickets().find((t) => t.rfc.toUpperCase() === rfc.toUpperCase() && t.folio === folio.trim()) ?? null
  );
}

export async function getOrders(): Promise<Order[]> {
  if (isBackendEnabled()) {
    const { orders } = await api.get<{ orders: Order[] }>("/api/orders");
    return orders;
  }
  return localOrders();
}

export async function createOrder(input: Omit<Order, "id" | "createdAt" | "status">): Promise<Order> {
  if (isBackendEnabled()) {
    const { order } = await api.post<{ order: Order }>("/api/orders", input);
    return order;
  }
  const orders = localOrders();
  const instant = ["tarjeta", "paypal"].includes(input.method);
  const order: Order = {
    ...input,
    rfc: input.rfc.toUpperCase(),
    id: `FD-${Date.now().toString().slice(-8)}`,
    createdAt: new Date().toISOString(),
    status: instant ? "Activado" : "Pendiente de pago",
  };
  orders.push(order);
  write(KEYS.orders, orders);
  if (instant && input.rfc) {
    const users = localUsers();
    const user = users.find((u) => u.rfc === order.rfc);
    if (user && input.amount > 0) {
      addCredits(order.rfc, Math.max(50, Math.round(input.amount / 8)));
    }
  }
  return order;
}

export async function savePvLead(input: Omit<PvLead, "createdAt">): Promise<PvLead> {
  if (isBackendEnabled()) {
    const { lead } = await api.post<{ lead: PvLead }>("/api/leads/punto-venta", input);
    return lead;
  }
  const leads = read<PvLead[]>(KEYS.pv, []);
  const lead = { ...input, rfc: input.rfc.toUpperCase(), createdAt: new Date().toISOString() };
  leads.push(lead);
  write(KEYS.pv, leads);
  return lead;
}

export function generateCaptcha(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

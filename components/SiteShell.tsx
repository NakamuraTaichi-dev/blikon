"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ChatWidget } from "./ChatWidget";
import { PageLoader } from "./PageLoader";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isLogin = pathname === "/sistema" || pathname === "/registro";
  if (isLogin) {
    return (
      <>
        <PageLoader />
        <main className="page-login">{children}</main>
      </>
    );
  }
  return (
    <>
      <PageLoader />
      <Header home={isHome} />
      <main className={isHome ? "page home" : "page"}>{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}

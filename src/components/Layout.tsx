import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { StickyBookDemo } from "./StickyBookDemo";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-gradient-navy">
    <Navbar />
    <main>{children}</main>
    <Footer />
    <StickyBookDemo />
  </div>
);

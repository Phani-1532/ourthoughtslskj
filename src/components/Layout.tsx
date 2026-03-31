import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { StickyBookDemo } from "./StickyBookDemo";
import { ChatWidget } from "./ChatWidget";
import { ExitIntentPopup } from "./ExitIntentPopup";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>{children}</main>
    <Footer />
    <StickyBookDemo />
    <ChatWidget />
    <ExitIntentPopup />
  </div>
);

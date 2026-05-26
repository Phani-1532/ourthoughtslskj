import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { StickyBookDemo } from "./StickyBookDemo";
import { ChatWidget } from "./ChatWidget";
import { ExitIntentPopup } from "./ExitIntentPopup";
import { IndustrySelectModal } from "./IndustrySelectModal";
import { IndustrySwitcher } from "./IndustrySwitcher";

export const Layout = ({ children, personalize = false }: { children: ReactNode; personalize?: boolean }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>{children}</main>
    <Footer />
    <StickyBookDemo />
    <ChatWidget />
    <ExitIntentPopup />
    {personalize && <IndustrySelectModal />}
    {personalize && <IndustrySwitcher />}
  </div>
);


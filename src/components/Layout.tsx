import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { StickyBookDemo } from "./StickyBookDemo";
import { ChatWidget } from "./ChatWidget";
import { ExitIntentPopup } from "./ExitIntentPopup";
import { IndustrySelectModal } from "./IndustrySelectModal";
import { IndustrySwitcher } from "./IndustrySwitcher";
import { VersionChecker } from "./VersionChecker";
import { ScrollAIAssistant } from "./ScrollAIAssistant";

export const Layout = ({ children, personalize = false }: { children: ReactNode; personalize?: boolean }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>{children}</main>
    <Footer />
    <StickyBookDemo />
    <ChatWidget />
    <ExitIntentPopup />
    <ScrollAIAssistant />
    {personalize && <IndustrySelectModal />}
    {personalize && <IndustrySwitcher />}
    <VersionChecker />
  </div>
);


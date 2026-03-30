import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";

export const StickyBookDemo = () => (
  <div className="fixed bottom-6 right-6 z-50">
    <Button variant="hero" size="lg" className="rounded-full shadow-elevated gap-2" asChild>
      <Link to="/contact">
        <CalendarCheck className="w-5 h-5" />
        <span className="hidden sm:inline">Book Demo</span>
      </Link>
    </Button>
  </div>
);

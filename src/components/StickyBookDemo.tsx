import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const StickyBookDemo = () => (
  <div className="fixed bottom-6 right-6 z-50">
    <Button size="lg" className="rounded-full shadow-elevated gap-2" asChild>
      <Link to="/contact">
        <span className="hidden sm:inline">Get Started</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </Button>
  </div>
);

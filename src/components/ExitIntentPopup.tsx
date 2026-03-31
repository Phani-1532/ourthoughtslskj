import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Gift, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const shown = sessionStorage.getItem("exitPopupShown");
    if (shown) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY < 10) {
        setShow(true);
        sessionStorage.setItem("exitPopupShown", "true");
        document.removeEventListener("mouseleave", handler);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handler);
    }, 5000);

    return () => { clearTimeout(timer); document.removeEventListener("mouseleave", handler); };
  }, []);

  const handleSubmit = () => {
    if (email) {
      toast({ title: "You're in! 🎉", description: "Check your inbox for the free consultation link." });
      setShow(false);
    }
  };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="bg-card border-primary/20 max-w-md">
        <DialogHeader>
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-display">Wait! Don't Leave Empty-Handed</DialogTitle>
        </DialogHeader>
        <div className="text-center">
          <p className="text-sm text-muted-foreground font-body mb-6">Get a <span className="text-primary font-semibold">free 30-minute consultation</span> with our experts. No strings attached.</p>
          <div className="flex gap-2 mb-4">
            <Input placeholder="Your email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-secondary/50 border-border/50" />
            <Button variant="hero" onClick={handleSubmit}>Claim <ArrowRight className="w-4 h-4" /></Button>
          </div>
          <p className="text-xs text-muted-foreground font-body">Or <Link to="/contact" className="text-primary hover:underline" onClick={() => setShow(false)}>book a demo now</Link></p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

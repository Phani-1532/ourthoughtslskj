import { SectionWrapper } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

export const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    setDone(true);
    toast.success("You're in! Check your inbox.");
    setEmail("");
  };

  return (
    <SectionWrapper>
      <div className="max-w-3xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-12 text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Get the LSKJ Insider — Free
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-xl mx-auto">
          Monthly insights on digital transformation, case studies and free playbooks. No spam, unsubscribe anytime.
        </p>
        {done ? (
          <div className="flex items-center justify-center gap-2 text-primary font-semibold">
            <CheckCircle2 className="w-5 h-5" /> Subscribed successfully
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1"
              required
            />
            <Button type="submit" size="lg">Subscribe</Button>
          </form>
        )}
      </div>
    </SectionWrapper>
  );
};

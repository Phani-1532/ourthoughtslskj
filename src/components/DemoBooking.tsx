import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const generateDates = () => {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      dates.push(d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }));
    }
  }
  return dates;
};

export const DemoBooking = ({ trigger }: { trigger?: React.ReactNode }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [booked, setBooked] = useState(false);
  const { toast } = useToast();
  const dates = generateDates();

  const handleBook = () => {
    if (name && email && date && time) {
      setBooked(true);
      toast({ title: "Demo Booked! 🎉", description: `Confirmed for ${date} at ${time}. Check your email.` });
    }
  };

  return (
    <Dialog onOpenChange={(o) => { if (!o) { setBooked(false); setDate(""); setTime(""); setName(""); setEmail(""); } }}>
      <DialogTrigger asChild>
        {trigger || <Button size="lg"><Calendar className="w-5 h-5 mr-2" />Schedule a Call</Button>}
      </DialogTrigger>
      <DialogContent className="bg-card border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{booked ? "Demo Confirmed!" : "Book a Live Demo"}</DialogTitle>
        </DialogHeader>

        {booked ? (
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-foreground font-display font-semibold text-lg mb-2">{date} at {time}</p>
            <p className="text-sm text-muted-foreground font-body">A confirmation email has been sent to {email}.</p>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            <Input placeholder="Full Name *" value={name} onChange={e => setName(e.target.value)} className="bg-secondary/50 border-border/50" />
            <Input placeholder="Email *" type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-secondary/50 border-border/50" />

            <div>
              <label className="text-sm font-body text-muted-foreground mb-2 block flex items-center gap-1"><Calendar className="w-4 h-4" />Select Date</label>
              <div className="grid grid-cols-3 gap-2">
                {dates.slice(0, 9).map(d => (
                  <button key={d} onClick={() => setDate(d)} className={`text-xs font-body p-2 rounded-lg border transition-colors ${
                    date === d ? "bg-primary text-primary-foreground border-primary" : "bg-secondary/30 border-border/50 text-muted-foreground hover:border-primary/30"
                  }`}>{d}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-body text-muted-foreground mb-2 block flex items-center gap-1"><Clock className="w-4 h-4" />Select Time (IST)</label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map(t => (
                  <button key={t} onClick={() => setTime(t)} className={`text-xs font-body p-2 rounded-lg border transition-colors ${
                    time === t ? "bg-primary text-primary-foreground border-primary" : "bg-secondary/30 border-border/50 text-muted-foreground hover:border-primary/30"
                  }`}>{t}</button>
                ))}
              </div>
            </div>

            <Button variant="hero" className="w-full" onClick={handleBook} disabled={!name || !email || !date || !time}>
              Confirm Booking
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

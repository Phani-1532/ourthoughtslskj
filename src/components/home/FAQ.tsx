import { SectionWrapper } from "@/components/SectionWrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  { q: "What services does Our Thoughts LSKJ offer?", a: "We deliver end-to-end solutions across E-Learning, Healthcare, Hospitality, IT, Consulting and BPM — including custom product development, HRMS, and digital transformation." },
  { q: "How long does a typical project take?", a: "MVPs ship in 4–6 weeks, full products in 2–4 months. We share a precise timeline after a free scoping call." },
  { q: "Do you offer post-launch support?", a: "Yes. Every engagement includes warranty, monitoring, and optional managed support plans with SLAs." },
  { q: "How is pricing structured?", a: "We offer fixed-scope, retainer, and dedicated-team models. Get a free custom quote tailored to your project." },
  { q: "Can you work with our existing team?", a: "Absolutely. We integrate with your engineering, product, and design teams via Slack, Jira, and shared sprints." },
  { q: "Is my data secure with you?", a: "We follow ISO 27001 aligned practices, GDPR/HIPAA where applicable, signed NDAs, and encrypted infrastructure by default." },
];

export const FAQ = () => (
  <SectionWrapper className="py-16">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold">
          <HelpCircle className="w-4 h-4" /> FAQ
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">Frequently asked questions</h2>
        <p className="text-muted-foreground mt-3">Everything you need to know before getting started.</p>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border border-border/60 rounded-xl px-4 bg-card/40">
            <AccordionTrigger className="text-left hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </SectionWrapper>
);

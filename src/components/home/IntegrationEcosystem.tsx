import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { motion } from "framer-motion";

const integrations = [
  "AWS", "Azure", "Google Cloud", "Stripe", "Twilio", "Slack",
  "Salesforce", "HubSpot", "Zapier", "Microsoft 365", "Shopify", "SAP",
  "Zoom", "WhatsApp", "OpenAI", "MongoDB",
];

export const IntegrationEcosystem = () => (
  <SectionWrapper className="bg-muted/20">
    <SectionHeader
      badge="Integration Ecosystem"
      title="Plays Well with Your Stack"
      subtitle="Native integrations with the platforms you already use — and APIs for everything else."
    />
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {integrations.map((name, i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04 }}
          className="aspect-square bg-card border border-border rounded-2xl flex items-center justify-center text-center px-2 hover:border-primary/40 hover:shadow-card hover:bg-primary/5 transition-all duration-300"
        >
          <span className="text-xs md:text-sm font-semibold text-foreground">{name}</span>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

import { Layout } from "@/components/Layout";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Award, Users, Zap, HeartHandshake, ArrowRight } from "lucide-react";

const reasons = [
  { icon: Users, title: "Employee-First Culture", description: "Claimed to be the World's First Organisation Focused on Employee Growth to the Fullest." },
  { icon: Zap, title: "Multi-Domain Expertise", description: "Solutions spanning E-Learning, Healthcare, Hospitality, IT, Consulting, and BPM." },
  { icon: Shield, title: "Enterprise-Grade Security", description: "HTTPS, input validation, CAPTCHA, rate limiting, and firewall protection." },
  { icon: Award, title: "Proven Track Record", description: "50+ clients served, 120+ projects delivered with 98% satisfaction rate." },
  { icon: HeartHandshake, title: "Women Empowerment", description: "We empower aspiring entrepreneurs, especially women, with tools and opportunities." },
  { icon: CheckCircle, title: "End-to-End Solutions", description: "From strategy to deployment — we handle everything so you can focus on growth." },
];

const WhyChooseUs = () => (
  <Layout>
    <div className="pt-24">
      <SectionWrapper>
        <SectionHeader
          badge="Why Choose Us"
          title="Why Our Thoughts LSKJ?"
          subtitle="We don't just deliver solutions — we transform how organizations think, operate, and grow."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-gradient-card border-border/30 hover:border-primary/30 h-full group transition-all hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <r.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">{r.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{r.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">Partner With Us <ArrowRight className="w-5 h-5" /></Link>
          </Button>
        </div>
      </SectionWrapper>
    </div>
  </Layout>
);

export default WhyChooseUs;

import { Layout } from "@/components/Layout";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target, Eye, Heart, Users, Award, Globe, Rocket, ArrowRight,
} from "lucide-react";

const values = [
  { icon: Heart, title: "People First", description: "We prioritize human growth — employees, clients, and communities." },
  { icon: Rocket, title: "Innovation", description: "We challenge conventions and build solutions that redefine industries." },
  { icon: Users, title: "Empowerment", description: "Empowering women entrepreneurs and underrepresented founders." },
  { icon: Award, title: "Excellence", description: "We deliver world-class quality in everything we do." },
  { icon: Globe, title: "Global Impact", description: "Building technology that creates positive change worldwide." },
  { icon: Target, title: "Integrity", description: "Transparent, honest, and accountable in every interaction." },
];

const timeline = [
  { year: "2020", event: "Founded with a vision to empower aspiring entrepreneurs" },
  { year: "2021", event: "Launched first HRMS beta and healthcare consulting division" },
  { year: "2022", event: "Expanded to E-Commerce and Hospitality verticals" },
  { year: "2023", event: "50+ clients served, E-Learning platform launched" },
  { year: "2024", event: "AI division established, multi-domain expertise solidified" },
  { year: "2025", event: "Global expansion and product portfolio growth" },
];

const About = () => (
  <Layout>
      <div className="pt-24 bg-background">
      {/* Hero */}
      <SectionWrapper>
        <div className="text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-medium mb-6">About Us</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">Transforming Dreams Into <span className="text-gradient-gold">Reality</span></h1>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              At Our Thoughts LSKJ, we're dedicated to empowering aspiring entrepreneurs — especially women — by providing cutting-edge technology and opportunities to pursue their passions.
            </p>
          </motion.div>
        </div>
        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-10 rounded-3xl overflow-hidden border border-border shadow-elevated group"
        >
          <img
            src="https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Business professionals collaborating"
            loading="lazy"
            className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </SectionWrapper>

      {/* Mission & Vision */}
      <SectionWrapper>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { icon: Target, title: "Our Mission", text: "To empower businesses and individuals with innovative technology solutions that drive growth, efficiency, and transformation across industries.", image: "https://images.pexels.com/photos/7794059/pexels-photo-7794059.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
            { icon: Eye, title: "Our Vision", text: "To be the world's most trusted multi-domain innovation partner — where every entrepreneur, regardless of background, has the tools to succeed.", image: "https://images.pexels.com/photos/9034729/pexels-photo-9034729.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-card/80 border-primary/20 h-full shadow-card overflow-hidden group">
                <div className="relative h-44 overflow-hidden">
                  <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center backdrop-blur-sm border border-white/10"><item.icon className="w-6 h-6 text-primary" /></div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper>
        <SectionHeader badge="Values" title="What Drives Us" subtitle="Our core values shape every decision and interaction." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card className="bg-card/80 border-border/30 hover:border-primary/50 h-full transition-all hover:-translate-y-1 shadow-card">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><v.icon className="w-6 h-6 text-primary" /></div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{v.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper>
        <SectionHeader badge="Journey" title="Our Story" subtitle="From a bold idea to a multi-domain innovation company." />
        <div className="max-w-2xl mx-auto space-y-6">
          {timeline.map((t, i) => (
            <motion.div key={t.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex gap-6 items-start">
              <div className="w-16 text-right flex-shrink-0">
                <span className="text-xl font-display font-bold text-primary">{t.year}</span>
              </div>
              <div className="w-3 h-3 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground font-body">{t.event}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
          <div className="text-center bg-card/80 border border-primary/20 p-12 shadow-card">
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">Ready to Build Something Together?</h2>
          <p className="text-muted-foreground font-body mb-8 max-w-xl mx-auto">Let's discuss how Our Thoughts LSKJ can transform your business.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="xl" asChild><Link to="/contact">Get in Touch <ArrowRight className="w-5 h-5" /></Link></Button>
            <Button variant="outline" size="xl" asChild><Link to="/careers">Join Our Team</Link></Button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  </Layout>
);

export default About;

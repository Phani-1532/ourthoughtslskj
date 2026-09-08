import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Metric = { label: string; value: string };

type CaseStudy = {
  id: string;
  title: string;
  client: string;
  industry: string | null;
  problem: string | null;
  solution: string | null;
  metrics: Metric[];
};

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("case_studies")
      .select("id, title, client, industry, problem, solution, metrics")
      .eq("published", true)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        setCaseStudies(
          (data || []).map((d: any) => ({ ...d, metrics: Array.isArray(d.metrics) ? d.metrics : [] }))
        );
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div className="pt-24 bg-background">
        <SectionWrapper>
          <SectionHeader
            badge="Case Studies"
            title="Real Impact, Proven Results"
            subtitle="See how our solutions have transformed businesses across industries with measurable outcomes."
          />

          {loading ? (
            <p className="text-center text-muted-foreground font-body py-16">Loading case studies…</p>
          ) : caseStudies.length === 0 ? (
            <p className="text-center text-muted-foreground font-body py-16">Case studies coming soon.</p>
          ) : (
            <div className="space-y-12">
              {caseStudies.map((cs) => {
                const [headline, ...rest] = cs.metrics;
                return (
                  <motion.article
                    key={cs.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl border border-border/50 bg-card/60 overflow-hidden"
                  >
                    <div className="p-8 md:p-10">
                      {/* Header */}
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        {cs.industry && (
                          <span className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full border border-primary/30 font-body">
                            {cs.industry}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground font-body">{cs.client}</span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">{cs.title}</h3>

                      {/* Metrics */}
                      {cs.metrics.length > 0 && (
                        <div className="flex flex-wrap items-end gap-x-10 gap-y-4 mb-10 pb-8 border-b border-border/40">
                          {headline && (
                            <div className="flex items-center gap-4">
                              <div className="text-5xl md:text-6xl font-display font-bold text-primary leading-none">
                                {headline.value}
                              </div>
                              <p className="text-primary/80 font-body font-medium max-w-[10rem]">{headline.label}</p>
                            </div>
                          )}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-3">
                            {rest.map((m) => (
                              <div key={m.label}>
                                <p className="text-lg font-display font-bold text-foreground">{m.value}</p>
                                <p className="text-xs text-muted-foreground font-body">{m.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-destructive" /> The Problem
                          </h4>
                          <p className="text-sm text-muted-foreground font-body leading-relaxed">{cs.problem}</p>
                        </div>
                        <div>
                          <h4 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" /> Our Solution
                          </h4>
                          <p className="text-sm text-muted-foreground font-body leading-relaxed">{cs.solution}</p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-16">
            <CheckCircle className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">Ready to Be Our Next Success Story?</h3>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Book Free Consultation <ArrowRight className="w-5 h-5" /></Link>
            </Button>
          </div>
        </SectionWrapper>
      </div>
    </Layout>
  );
};

export default CaseStudies;

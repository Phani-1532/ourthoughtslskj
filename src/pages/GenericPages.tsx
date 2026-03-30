import { Layout } from "@/components/Layout";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const pages: Record<string, { title: string; badge: string; content: string }> = {
  insights: { title: "Insights & Blog", badge: "Insights", content: "Industry insights, thought leadership, and latest updates coming soon." },
  careers: { title: "Careers at Our Thoughts LSKJ", badge: "Careers", content: "Join a team that's chasing dreams. Career opportunities coming soon." },
  about: { title: "About Our Thoughts LSKJ", badge: "Who We Are", content: "At Our Thoughts LSKJ, we're dedicated to transforming dreams into reality. We empower aspiring entrepreneurs, especially women, by providing opportunities to pursue their passions and achieve their goals." },
  contact: { title: "Get in Touch", badge: "Contact", content: "Ready to transform your business? Reach out for a free consultation." },
};

const GenericPage = ({ pageKey }: { pageKey: string }) => {
  const page = pages[pageKey];
  return (
    <Layout>
      <div className="pt-24">
        <SectionWrapper>
          <SectionHeader badge={page.badge} title={page.title} subtitle={page.content} />
          <div className="text-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Get Started <ArrowRight className="w-5 h-5" /></Link>
            </Button>
          </div>
        </SectionWrapper>
      </div>
    </Layout>
  );
};

export const InsightsPage = () => <GenericPage pageKey="insights" />;
export const CareersPage = () => <GenericPage pageKey="careers" />;
export const AboutPage = () => <GenericPage pageKey="about" />;
export const ContactPage = () => <GenericPage pageKey="contact" />;

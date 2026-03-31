import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { HeroSection } from "@/components/home/HeroSection";
import { ClientLogos } from "@/components/home/ClientLogos";
import { ProductHighlights } from "@/components/home/ProductHighlights";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { IndustryPreview } from "@/components/home/IndustryPreview";
import { CaseStudiesPreview } from "@/components/home/CaseStudiesPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { StatsCounter } from "@/components/home/StatsCounter";
import { CTABlock } from "@/components/home/CTABlock";

const Index = () => (
  <Layout>
    <SEOHead
      title="Home"
      description="Our Thoughts LSKJ — Multi-domain innovation leader across E-Learning, Healthcare, Hospitality, IT, Consulting & BPM."
      path="/"
    />
    <HeroSection />
    <ClientLogos />
    <ProductHighlights />
    <ServicesGrid />
    <IndustryPreview />
    <CaseStudiesPreview />
    <Testimonials />
    <StatsCounter />
    <CTABlock />
  </Layout>
);

export default Index;

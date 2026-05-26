import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { HeroSection } from "@/components/home/HeroSection";
import { ClientLogos } from "@/components/home/ClientLogos";
import { TrustBar } from "@/components/home/TrustBar";
import { ProductHighlights } from "@/components/home/ProductHighlights";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TechProjects } from "@/components/home/TechProjects";
import { IndustryPreview } from "@/components/home/IndustryPreview";
import { CaseStudiesPreview } from "@/components/home/CaseStudiesPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { StatsCounter } from "@/components/home/StatsCounter";
import { TeamSection } from "@/components/home/TeamSection";
import { FAQ } from "@/components/home/FAQ";
import { CTABlock } from "@/components/home/CTABlock";

const Index = () => (
  <Layout personalize>
    <SEOHead
      title="Home"
      description="Our Thoughts LSKJ — Multi-domain innovation leader across E-Learning, Healthcare, Hospitality, IT, Consulting & BPM."
      path="/"
    />
    <HeroSection />
    <ClientLogos />
    <TrustBar />
    <ProductHighlights />
    <ServicesGrid />
    <TechProjects />
    <IndustryPreview />
    <CaseStudiesPreview />
    <Testimonials />
    <StatsCounter />
    <TeamSection />
    <FAQ />
    <CTABlock />
  </Layout>
);

export default Index;

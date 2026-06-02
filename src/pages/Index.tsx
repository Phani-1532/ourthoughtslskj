import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { HeroSection } from "@/components/home/HeroSection";
import { ClientLogos } from "@/components/home/ClientLogos";
import { TrustBar } from "@/components/home/TrustBar";
import { ProductHighlights } from "@/components/home/ProductHighlights";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { TechProjects } from "@/components/home/TechProjects";
import { IndustryPreview } from "@/components/home/IndustryPreview";
import { WhyUsComparison } from "@/components/home/WhyUsComparison";
import { CaseStudiesPreview } from "@/components/home/CaseStudiesPreview";
import { VideoSection } from "@/components/home/VideoSection";
import { Testimonials } from "@/components/home/Testimonials";
import { StatsCounter } from "@/components/home/StatsCounter";
import { TechStack } from "@/components/home/TechStack";
import { IntegrationEcosystem } from "@/components/home/IntegrationEcosystem";
import { Awards } from "@/components/home/Awards";
import { TeamSection } from "@/components/home/TeamSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FAQ } from "@/components/home/FAQ";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";
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
    <ProcessSteps />
    <TechProjects />
    <IndustryPreview />
    <WhyUsComparison />
    <CaseStudiesPreview />
    <VideoSection />
    <Testimonials />
    <StatsCounter />
    <TechStack />
    <IntegrationEcosystem />
    <Awards />
    <TeamSection />
    <BlogPreview />
    <FAQ />
    <NewsletterCTA />
    <CTABlock />
  </Layout>
);

export default Index;

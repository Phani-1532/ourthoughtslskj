import { IndustryKey } from "@/contexts/IndustryContext";

export interface HeroSlide {
  id: string;
  title: string;
  highlight: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  badge: string;
  image_url: string;
}

export interface IndustryContent {
  hero: HeroSlide[];
  productsHeader: { badge: string; title: string; subtitle: string };
  servicesHeader: { badge: string; title: string; subtitle: string };
  cta: { title: string; subtitle: string };
}

const map: Partial<Record<IndustryKey, IndustryContent>> = {
  elearning: {
    hero: [
      {
        id: "el-1",
        title: "Next-Gen E-Learning Experiences",
        highlight: "E-Learning",
        subtitle: "Interactive courses, live classes, and AI-powered learning paths designed for every learner.",
        cta_text: "Explore Courses",
        cta_link: "/e-learning",
        badge: "EdTech Revolution",
        image_url: "/hero-elearning.jpg",
      },
      {
        id: "el-2",
        title: "Live Classrooms that Engage Every Student",
        highlight: "Engage",
        subtitle: "Real-time collaboration, gamified lessons and instructor-led training at scale.",
        cta_text: "See Live Classes",
        cta_link: "/e-learning",
        badge: "Live & Interactive",
        image_url: "/hero-elearning.jpg",
      },
    ],
    productsHeader: { badge: "Learning Products", title: "Platforms Built for Modern Learners", subtitle: "From K-12 to enterprise upskilling — tools that scale with you." },
    servicesHeader: { badge: "Learning Services", title: "End-to-End EdTech Solutions", subtitle: "Course authoring, LMS, assessments, analytics — we cover the full stack." },
    cta: { title: "Ready to Transform Learning?", subtitle: "Book a free EdTech consultation and see how we can power your learning programs." },
  },
  healthcare: {
    hero: [
      {
        id: "hc-1",
        title: "Building the Future of Digital Healthcare",
        highlight: "Healthcare",
        subtitle: "AI-powered telemedicine, smart hospital management and patient engagement platforms.",
        cta_text: "Explore Healthcare",
        cta_link: "/industries/healthcare",
        badge: "Healthcare Innovation",
        image_url: "/hero-healthcare.jpg",
      },
    ],
    productsHeader: { badge: "Health Products", title: "Care Platforms Built for Outcomes", subtitle: "HIPAA-ready solutions for hospitals, clinics and pharmacies." },
    servicesHeader: { badge: "Health Services", title: "Clinical & Operational Excellence", subtitle: "From EHR to revenue cycle — engineered for care providers." },
    cta: { title: "Ready to Modernize Patient Care?", subtitle: "Talk to our healthcare experts about your digital transformation." },
  },
  hospitality: {
    hero: [
      {
        id: "hp-1",
        title: "Elevating Guest Experiences in Hospitality",
        highlight: "Hospitality",
        subtitle: "Property management, F&B operations, and reputation systems that delight guests.",
        cta_text: "Explore Hospitality",
        cta_link: "/industries/hospitality",
        badge: "Guest-First Tech",
        image_url: "/hero-innovation.jpg",
      },
    ],
    productsHeader: { badge: "Hospitality Suite", title: "Tools That Run Properties at Scale", subtitle: "PMS, POS, bookings, loyalty — all in one stack." },
    servicesHeader: { badge: "Hospitality Services", title: "From Sales to Sustainability", subtitle: "Hotels, restaurants and resorts — modernized end to end." },
    cta: { title: "Ready to Delight More Guests?", subtitle: "Let's design a digital guest journey for your property." },
  },
  it: {
    hero: [
      {
        id: "it-1",
        title: "Engineering Excellence for Modern IT",
        highlight: "IT",
        subtitle: "Cloud, DevOps, custom software and platform engineering for ambitious teams.",
        cta_text: "Explore IT Services",
        cta_link: "/industries/technology",
        badge: "Built by Engineers",
        image_url: "/hero-innovation.jpg",
      },
    ],
    productsHeader: { badge: "Engineering Products", title: "Platforms Powering Digital Teams", subtitle: "Developer tools, internal platforms and AI-ready stacks." },
    servicesHeader: { badge: "IT Services", title: "Full-Stack Engineering Services", subtitle: "From cloud architecture to MLOps — we ship what works." },
    cta: { title: "Ready to Ship Faster?", subtitle: "Talk to our engineering leaders about your roadmap." },
  },
  consulting: {
    hero: [
      {
        id: "co-1",
        title: "Strategic Consulting that Delivers Outcomes",
        highlight: "Consulting",
        subtitle: "Transformation strategy, operating models and execution support — tailored to you.",
        cta_text: "Talk to a Consultant",
        cta_link: "/contact",
        badge: "Strategy + Execution",
        image_url: "/hero-innovation.jpg",
      },
    ],
    productsHeader: { badge: "Advisory Toolkits", title: "Frameworks That Drive Decisions", subtitle: "Templated playbooks for transformation and growth." },
    servicesHeader: { badge: "Consulting Services", title: "From Strategy to Implementation", subtitle: "We don't just advise — we partner through delivery." },
    cta: { title: "Ready for Real Transformation?", subtitle: "Book a free strategy session with our consulting partners." },
  },
  bpm: {
    hero: [
      {
        id: "bpm-1",
        title: "Smarter Business Process Management",
        highlight: "Process",
        subtitle: "Automate, optimize and scale every workflow — backed by analytics and AI.",
        cta_text: "Explore BPM",
        cta_link: "/services",
        badge: "Operational Excellence",
        image_url: "/hero-innovation.jpg",
      },
    ],
    productsHeader: { badge: "BPM Products", title: "Automation that Runs the Business", subtitle: "Workflow engines, RPA bots, and process analytics." },
    servicesHeader: { badge: "BPM Services", title: "Re-Engineer How Work Gets Done", subtitle: "Process design, automation, and continuous improvement." },
    cta: { title: "Ready to Automate Your Operations?", subtitle: "Let's map your processes and unlock efficiency together." },
  },
};

export const getIndustryContent = (key: IndustryKey): IndustryContent | null =>
  map[key] || null;

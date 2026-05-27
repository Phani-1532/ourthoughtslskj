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
        image_url: "/hero-elearning-2.jpg",
      },
      {
        id: "el-3",
        title: "AI-Powered Personalized Learning Paths",
        highlight: "AI-Powered",
        subtitle: "Adaptive assessments, smart recommendations and analytics that boost outcomes.",
        cta_text: "Try the Platform",
        cta_link: "/e-learning",
        badge: "Smart Learning",
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
      {
        id: "hc-2",
        title: "Telemedicine that Connects Doctors & Patients",
        highlight: "Telemedicine",
        subtitle: "Secure video consults, e-prescriptions and patient records — HIPAA-ready.",
        cta_text: "See Telemedicine",
        cta_link: "/industries/healthcare",
        badge: "Connected Care",
        image_url: "/hero-healthcare-2.jpg",
      },
      {
        id: "hc-3",
        title: "Smart Hospital Management Systems",
        highlight: "Smart Hospital",
        subtitle: "OPD, IPD, pharmacy, billing and analytics in one unified platform.",
        cta_text: "Explore HMS",
        cta_link: "/industries/healthcare",
        badge: "Operational Excellence",
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
        subtitle: "Property management, F&B operations and reputation systems that delight guests.",
        cta_text: "Explore Hospitality",
        cta_link: "/industries/hospitality",
        badge: "Guest-First Tech",
        image_url: "/hero-hospitality.jpg",
      },
      {
        id: "hp-2",
        title: "Modern F&B Operations, Reimagined",
        highlight: "F&B",
        subtitle: "POS, KOT, inventory and table management — built for restaurants that scale.",
        cta_text: "See Restaurant Suite",
        cta_link: "/industries/hospitality",
        badge: "Restaurant Tech",
        image_url: "/hero-hospitality-2.jpg",
      },
      {
        id: "hp-3",
        title: "Bookings, Loyalty & Guest Journeys",
        highlight: "Guest Journeys",
        subtitle: "Direct bookings, loyalty programs and personalized stays that drive repeat revenue.",
        cta_text: "Talk to Sales",
        cta_link: "/contact",
        badge: "Revenue Growth",
        image_url: "/hero-hospitality.jpg",
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
        image_url: "/hero-it.jpg",
      },
      {
        id: "it-2",
        title: "Custom Software Built to Ship",
        highlight: "Custom Software",
        subtitle: "Product engineering teams that ship reliably — web, mobile and backend.",
        cta_text: "See Engineering",
        cta_link: "/industries/technology",
        badge: "Product Engineering",
        image_url: "/hero-it-2.jpg",
      },
      {
        id: "it-3",
        title: "Cloud & DevOps at Enterprise Scale",
        highlight: "Cloud & DevOps",
        subtitle: "AWS, Azure, GCP — Kubernetes, CI/CD and observability done right.",
        cta_text: "Talk to Cloud Team",
        cta_link: "/contact",
        badge: "Cloud Native",
        image_url: "/hero-it.jpg",
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
        image_url: "/hero-consulting.jpg",
      },
      {
        id: "co-2",
        title: "From Insight to Measurable Impact",
        highlight: "Measurable Impact",
        subtitle: "Data-driven advisory backed by dashboards, KPIs and execution accountability.",
        cta_text: "See Our Approach",
        cta_link: "/services",
        badge: "Data-Driven",
        image_url: "/hero-consulting-2.jpg",
      },
      {
        id: "co-3",
        title: "Digital Transformation, End to End",
        highlight: "Transformation",
        subtitle: "Operating model design, change management and tech enablement under one roof.",
        cta_text: "Book a Strategy Call",
        cta_link: "/contact",
        badge: "End-to-End",
        image_url: "/hero-consulting.jpg",
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
        image_url: "/hero-bpm.jpg",
      },
      {
        id: "bpm-2",
        title: "RPA Bots that Run Your Back Office",
        highlight: "RPA",
        subtitle: "Robotic process automation for finance, HR and operations — 24/7 reliability.",
        cta_text: "See Automation",
        cta_link: "/services",
        badge: "Automation",
        image_url: "/hero-bpm-2.jpg",
      },
      {
        id: "bpm-3",
        title: "Process Analytics that Reveal What Matters",
        highlight: "Process Analytics",
        subtitle: "Real-time dashboards, bottleneck detection and continuous improvement loops.",
        cta_text: "Get a Process Audit",
        cta_link: "/contact",
        badge: "Insights at Scale",
        image_url: "/hero-bpm.jpg",
      },
    ],
    productsHeader: { badge: "BPM Products", title: "Automation that Runs the Business", subtitle: "Workflow engines, RPA bots, and process analytics." },
    servicesHeader: { badge: "BPM Services", title: "Re-Engineer How Work Gets Done", subtitle: "Process design, automation, and continuous improvement." },
    cta: { title: "Ready to Automate Your Operations?", subtitle: "Let's map your processes and unlock efficiency together." },
  },
};

export const getIndustryContent = (key: IndustryKey): IndustryContent | null =>
  map[key] || null;

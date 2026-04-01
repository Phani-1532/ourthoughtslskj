
-- Leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  industry TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'New',
  score INTEGER DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  reading_time INTEGER DEFAULT 5,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Case studies table
CREATE TABLE public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  client TEXT NOT NULL,
  industry TEXT,
  problem TEXT,
  solution TEXT,
  metrics JSONB DEFAULT '[]',
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Job listings table
CREATE TABLE public.job_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT,
  location TEXT,
  type TEXT DEFAULT 'Full-time',
  description TEXT,
  requirements TEXT[],
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  image_url TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT,
  description TEXT,
  features JSONB DEFAULT '[]',
  benefits JSONB DEFAULT '[]',
  status TEXT DEFAULT 'Live',
  image_url TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Hero slides table
CREATE TABLE public.hero_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  highlight TEXT,
  subtitle TEXT,
  cta_text TEXT DEFAULT 'Get Started',
  cta_link TEXT DEFAULT '/contact',
  badge TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read published blog posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public can read published case studies" ON public.case_studies FOR SELECT USING (published = true);
CREATE POLICY "Public can read published job listings" ON public.job_listings FOR SELECT USING (published = true);
CREATE POLICY "Public can read published testimonials" ON public.testimonials FOR SELECT USING (published = true);
CREATE POLICY "Public can read published products" ON public.products FOR SELECT USING (published = true);
CREATE POLICY "Public can read published hero slides" ON public.hero_slides FOR SELECT USING (published = true);

-- Anyone can insert leads (contact form)
CREATE POLICY "Anyone can submit leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Authenticated users can manage all content (admin)
CREATE POLICY "Authenticated users can manage blog posts" ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage case studies" ON public.case_studies FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage job listings" ON public.job_listings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage hero slides" ON public.hero_slides FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage leads" ON public.leads FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insert seed data for hero slides
INSERT INTO public.hero_slides (title, highlight, subtitle, badge, sort_order) VALUES
('Empowering Innovation Across Industries', 'Innovation', 'E-Learning · Healthcare · Hospitality · IT · Consulting · BPM — Claimed to be the World''s First Organisation Focused on Employee Growth to the Fullest.', 'Chasing Dreams', 0),
('Building the Future of Digital Healthcare', 'Healthcare', 'Transforming patient care with AI-powered solutions, telemedicine platforms, and smart hospital management systems.', 'Healthcare Innovation', 1),
('Next-Gen E-Learning Experiences', 'E-Learning', 'Interactive courses, live classes, and AI-powered learning paths that adapt to every student''s journey.', 'EdTech Revolution', 2);

-- Insert seed testimonials
INSERT INTO public.testimonials (name, role, company, content, rating) VALUES
('Rajesh Kumar', 'CTO', 'TechVista Solutions', 'Our Thoughts LSKJ transformed our digital infrastructure completely. The HRMS platform alone saved us 200+ hours monthly.', 5),
('Dr. Priya Menon', 'Director', 'City Care Hospital', 'The healthcare app they built streamlined our patient management. We saw a 40% improvement in appointment efficiency.', 5),
('Aditya Shah', 'Founder', 'ShopEasy', 'Their e-commerce solutions helped us scale from 100 to 10,000 daily orders within 6 months. Exceptional team!', 5);

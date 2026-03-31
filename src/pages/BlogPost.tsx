import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SectionWrapper } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User, Calendar, Share2 } from "lucide-react";

const postsContent: Record<string, { title: string; category: string; author: string; date: string; readTime: string; content: string; tags: string[] }> = {
  "ai-business-2025": {
    title: "How AI is Reshaping Business Operations in 2025",
    category: "Technology", author: "Rahul Sharma", date: "Mar 28, 2025", readTime: "8 min",
    tags: ["AI", "Business", "Automation"],
    content: `Artificial Intelligence has moved from buzzword to boardroom essential. In 2025, businesses that haven't adopted AI-driven workflows are already falling behind.\n\n## The State of Enterprise AI\n\nFrom automated customer support to predictive supply chain management, AI is transforming every department. At Our Thoughts LSKJ, we've helped 50+ organizations integrate AI into their core operations.\n\n## Key Trends\n\n**1. Predictive Analytics** — Companies are using AI to forecast demand, predict churn, and optimize pricing in real-time.\n\n**2. Process Automation** — RPA combined with AI is eliminating manual data entry, reducing errors by up to 95%.\n\n**3. Intelligent Customer Experience** — AI-powered chatbots and recommendation engines are delivering personalized experiences at scale.\n\n## The ROI of AI Adoption\n\nOur clients have seen an average 40% reduction in operational costs and 60% improvement in process efficiency after implementing AI solutions.\n\n## Getting Started\n\nThe key is to start small — identify one high-impact process, implement AI, measure results, and scale. Our Thoughts LSKJ can guide you through every step.`,
  },
  "hrms-implementation": {
    title: "HRMS Implementation: A Complete Guide for Growing Companies",
    category: "Products", author: "Priya Patel", date: "Mar 22, 2025", readTime: "12 min",
    tags: ["HRMS", "HR Tech", "Implementation"],
    content: `Implementing an HRMS is one of the most impactful decisions a growing company can make. Done right, it transforms HR from a cost center into a strategic advantage.\n\n## Why HRMS Matters\n\nManual HR processes break at 50 employees. By 200, they're a liability. An HRMS automates payroll, leave management, performance reviews, and compliance — freeing your HR team to focus on what matters: people.\n\n## Our Approach\n\nAt Our Thoughts LSKJ, we've developed a 4-phase implementation methodology:\n\n**Phase 1: Discovery** — Understand current pain points and requirements\n**Phase 2: Configuration** — Customize the platform to your workflows\n**Phase 3: Migration** — Safely transfer existing data\n**Phase 4: Adoption** — Train teams and ensure smooth transition\n\n## Common Pitfalls\n\n- Trying to automate everything at once\n- Ignoring change management\n- Choosing features over usability\n\n## Results\n\nCompanies using our HRMS have reduced hiring time by 40%, cut payroll errors by 90%, and improved employee satisfaction scores by 35%.`,
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? postsContent[slug] : null;

  if (!post) {
    return (
      <Layout>
        <div className="pt-24 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Article Not Found</h2>
            <Button variant="hero" asChild><Link to="/blog"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link></Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-24">
        <SectionWrapper>
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary font-body mb-8 hover:gap-3 transition-all"><ArrowLeft className="w-4 h-4" />Back to Blog</Link>
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary font-body">{post.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-body mb-8 pb-8 border-b border-border/30">
              <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime} read</span>
              <button className="ml-auto flex items-center gap-1 text-primary hover:text-primary/80"><Share2 className="w-4 h-4" />Share</button>
            </div>
            <div className="prose prose-invert max-w-none font-body text-muted-foreground leading-relaxed">
              {post.content.split("\n\n").map((para, i) => {
                if (para.startsWith("## ")) return <h2 key={i} className="text-2xl font-display font-bold text-foreground mt-8 mb-4">{para.replace("## ", "")}</h2>;
                if (para.startsWith("**")) return <p key={i} className="mb-4" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/- /g, "• ") }} />;
                return <p key={i} className="mb-4">{para}</p>;
              })}
            </div>
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border/30">
              {post.tags.map(tag => <Badge key={tag} variant="outline" className="border-border/50 text-muted-foreground font-body">{tag}</Badge>)}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </Layout>
  );
};

export default BlogPost;

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, User, ArrowRight, Search, TrendingUp, Calendar } from "lucide-react";

const posts = [
  { id: "ai-business-2025", title: "How AI is Reshaping Business Operations in 2025", excerpt: "From predictive analytics to automated workflows, AI is no longer optional—it's the backbone of modern enterprise.", category: "Technology", author: "Rahul Sharma", date: "Mar 28, 2025", readTime: "8 min", featured: true, tags: ["AI", "Business", "Automation"] },
  { id: "hrms-implementation", title: "HRMS Implementation: A Complete Guide for Growing Companies", excerpt: "Step-by-step blueprint for deploying an HRMS that actually gets adopted by your team.", category: "Products", author: "Priya Patel", date: "Mar 22, 2025", readTime: "12 min", featured: true, tags: ["HRMS", "HR Tech", "Implementation"] },
  { id: "healthcare-digital", title: "Digital Transformation in Healthcare: Beyond EHR", excerpt: "Healthcare's next wave isn't about records—it's about connected, intelligent care ecosystems.", category: "Healthcare", author: "Dr. Meera Joshi", date: "Mar 15, 2025", readTime: "6 min", featured: false, tags: ["Healthcare", "Digital", "Innovation"] },
  { id: "ecommerce-trends", title: "E-Commerce Trends That Will Define the Next Decade", excerpt: "Voice commerce, social selling, and hyper-personalization—the retail landscape is evolving fast.", category: "E-Commerce", author: "Vikram Desai", date: "Mar 10, 2025", readTime: "7 min", featured: false, tags: ["E-Commerce", "Retail", "Trends"] },
  { id: "hospitality-tech", title: "Smart Hotels: Technology That Guests Actually Want", excerpt: "Forget gimmicks—here's what high-tech hospitality looks like when done right.", category: "Hospitality", author: "Ananya Rao", date: "Mar 5, 2025", readTime: "5 min", featured: false, tags: ["Hospitality", "Hotels", "Tech"] },
  { id: "women-entrepreneurship", title: "Empowering Women Entrepreneurs in India's Tech Ecosystem", excerpt: "How Our Thoughts LSKJ is bridging the gender gap in technology and business leadership.", category: "Culture", author: "Sneha Reddy", date: "Feb 28, 2025", readTime: "9 min", featured: false, tags: ["Women", "Entrepreneurship", "Empowerment"] },
];

const categories = ["All", "Technology", "Products", "Healthcare", "E-Commerce", "Hospitality", "Culture"];
const trendingTags = ["AI", "HRMS", "Healthcare", "E-Commerce", "Digital Transformation", "Women Empowerment"];

const Blog = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = posts.filter(p => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const featured = posts.filter(p => p.featured);

  return (
    <Layout>
      <div className="pt-24">
        <SectionWrapper>
          <SectionHeader badge="Insights" title="Insights & Blog" subtitle="Thought leadership, industry insights, and latest updates from Our Thoughts LSKJ." />

          {/* Search + Tags */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-secondary/50 border-border/50" />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <TrendingUp className="w-4 h-4 text-primary mt-1" />
              {trendingTags.map(tag => (
                <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors text-muted-foreground border-border/50 font-body" onClick={() => setSearch(tag)}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map(cat => (
              <Button key={cat} variant={activeCategory === cat ? "default" : "ghost"} size="sm" onClick={() => setActiveCategory(cat)} className="font-body">{cat}</Button>
            ))}
          </div>

          {/* Featured */}
          {activeCategory === "All" && !search && (
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {featured.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/blog/${post.id}`}>
                    <Card className="bg-gradient-card border-primary/20 hover:border-primary/40 group h-full transition-all hover:-translate-y-1">
                      <CardContent className="p-8">
                        <Badge className="mb-4 bg-primary/10 text-primary border-0 font-body">Featured</Badge>
                        <h2 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                        <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
                          <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} read</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* All Posts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Link to={`/blog/${post.id}`}>
                  <Card className="bg-gradient-card border-border/30 hover:border-primary/30 group h-full transition-all hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs border-primary/30 text-primary font-body">{post.category}</Badge>
                        <span className="text-xs text-muted-foreground font-body flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-body">{post.author} · {post.date}</span>
                        <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-body text-lg">No articles found. Try a different search.</p>
            </div>
          )}
        </SectionWrapper>
      </div>
    </Layout>
  );
};

export default Blog;

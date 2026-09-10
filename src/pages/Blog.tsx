import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, User, ArrowRight, Search, TrendingUp, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Post = { id: string; slug: string; title: string; excerpt: string | null; category: string | null; tags: string[] | null; featured: boolean | null; reading_time: number | null; created_at: string };

const heroImage = "https://images.pexels.com/photos/4160094/pexels-photo-4160094.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";

const fallbackImages = [
  "https://images.pexels.com/photos/6356/hands-woman-laptop-working.jpg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/15635241/pexels-photo-15635241.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/5407260/pexels-photo-5407260.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/6466490/pexels-photo-6466490.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
];

const Blog = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: posts = [], isLoading, isError } = useQuery<Post[]>({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("id, slug, title, excerpt, category, tags, featured, reading_time, created_at").eq("published", true).order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map(p => p.category).filter(Boolean) as string[]))], [posts]);
  const trendingTags = useMemo(() => Array.from(new Set(posts.flatMap(p => p.tags ?? []))).slice(0, 6), [posts]);

  const filtered = posts.filter(p => {
    const query = search.toLowerCase();
    const matchSearch = !query || p.title.toLowerCase().includes(query) || (p.excerpt ?? "").toLowerCase().includes(query) || (p.tags ?? []).some(t => t.toLowerCase().includes(query));
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const featured = posts.filter(p => p.featured);

  return (
    <Layout>
      <div className="pt-24">
        <SectionWrapper>
          <SectionHeader badge="Insights" title="Insights & Blog" subtitle="Thought leadership, industry insights, and latest updates from Our Thoughts LSKJ." />

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-12 rounded-3xl overflow-hidden border border-border shadow-elevated group"
          >
            <img
              src={heroImage}
              alt="Blog and insights"
              loading="lazy"
              className="w-full h-[220px] md:h-[320px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

           {isLoading && <div className="py-16 text-center text-muted-foreground">Loading the latest posts…</div>}
           {isError && <div className="py-16 text-center text-muted-foreground">We couldn't load the blog right now.</div>}
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
                   <Link to={`/blog/${post.slug}`}>
                     <Card className="bg-card/80 border-primary/20 hover:border-primary/60 group h-full transition-all hover:-translate-y-1 shadow-card overflow-hidden">
                      <div className="relative h-40 overflow-hidden">
                        <img src={fallbackImages[i % fallbackImages.length]} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                        <Badge className="absolute top-3 left-3 bg-primary/10 text-primary border-0 font-body backdrop-blur-sm">Featured</Badge>
                      </div>
                      <CardContent className="p-8">
                        <h2 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                        <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
                           <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.created_at).toLocaleDateString()}</span>
                           <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.reading_time ?? 5} min read</span>
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
                 <Link to={`/blog/${post.slug}`}>
                   <Card className="bg-card/80 border-border/30 hover:border-primary/50 group h-full transition-all hover:-translate-y-1 shadow-card overflow-hidden">
                    <div className="relative h-32 overflow-hidden">
                      <img src={fallbackImages[i % fallbackImages.length]} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                         <Badge variant="outline" className="text-xs border-primary/30 text-primary font-body">{post.category ?? "Insights"}</Badge>
                         <span className="text-xs text-muted-foreground font-body flex items-center gap-1"><Clock className="w-3 h-3" />{post.reading_time ?? 5} min</span>
                      </div>
                      <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                       <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2">{post.excerpt ?? "Read the latest from Our Thoughts LSKJ."}</p>
                      <div className="flex items-center justify-between">
                         <span className="text-xs text-muted-foreground font-body">{new Date(post.created_at).toLocaleDateString()}</span>
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

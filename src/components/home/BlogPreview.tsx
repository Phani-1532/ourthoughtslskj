import { SectionWrapper } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  tags: string[] | null;
  reading_time: number | null;
  image_url: string | null;
  created_at: string;
};

export const BlogPreview = () => {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["blog-preview-posts"],
    queryFn: async (): Promise<Post[]> => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, category, tags, reading_time, image_url, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <SectionWrapper>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
        <div>
          <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/5 rounded-full border border-primary/10">
            Insights & Blog
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Latest from Our Team
          </h2>
        </div>
        <Button variant="outline" asChild>
          <Link to="/blog">
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center py-16 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}

      {isError && (
        <div className="text-center py-12 text-sm text-muted-foreground">
          Couldn't load latest posts right now. Please check back soon.
        </div>
      )}

      {posts && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => {
            const date = new Date(p.created_at).toLocaleDateString(undefined, {
              month: "short",
              year: "numeric",
            });
            return (
              <motion.a
                key={p.id}
                href={`/blog/${p.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition cursor-pointer flex flex-col"
              >
                {p.image_url && (
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={p.image_url}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4 text-xs">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                      {p.category ?? "Insights"}
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {p.reading_time ?? 5} min read
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {p.excerpt ?? "Read the latest from Our Thoughts LSKJ."}
                  </p>
                  <div className="text-xs text-muted-foreground">{date}</div>
                </div>
              </motion.a>
            );
          })}
        </div>
      )}
    </SectionWrapper>
  );
};

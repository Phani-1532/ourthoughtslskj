import { SectionWrapper } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const FEED_URL =
  "https://techcrunch.com/wp-json/wp/v2/posts?_embed&per_page=3&_fields=id,date,link,title,excerpt,_links,_embedded";

type WPPost = {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    "wp:term"?: Array<Array<{ name: string }>>;
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
};

const stripHtml = (html: string) =>
  html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

const readingTime = (text: string) =>
  `${Math.max(1, Math.round(stripHtml(text).split(" ").length / 200))} min read`;

const fetchPosts = async (): Promise<WPPost[]> => {
  const res = await fetch(FEED_URL);
  if (!res.ok) throw new Error("Failed to load posts");
  return res.json();
};

export const BlogPreview = () => {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["blog-preview-feed"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 30,
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

      {posts && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => {
            const tag = p._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Insights";
            const image = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
            const excerpt = stripHtml(p.excerpt.rendered).slice(0, 140) + "…";
            const date = new Date(p.date).toLocaleDateString(undefined, {
              month: "short",
              year: "numeric",
            });
            return (
              <motion.a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition cursor-pointer flex flex-col"
              >
                {image && (
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={image}
                      alt={stripHtml(p.title.rendered)}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4 text-xs">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                      {tag}
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {readingTime(p.excerpt.rendered)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition line-clamp-2">
                    {stripHtml(p.title.rendered)}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {excerpt}
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

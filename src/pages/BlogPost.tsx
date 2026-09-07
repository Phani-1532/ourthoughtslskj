import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SectionWrapper } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, Share2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Post = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  tags: string[] | null;
  reading_time: number | null;
  image_url: string | null;
  created_at: string;
};

const renderContent = (content: string) =>
  content.split("\n\n").map((paragraph, index) => {
    if (paragraph.startsWith("## ")) {
      return <h2 key={index} className="text-2xl font-display font-bold text-foreground mt-8 mb-4">{paragraph.replace("## ", "")}</h2>;
    }
    if (paragraph.startsWith("**")) {
      return <p key={index} className="mb-4 whitespace-pre-line">{paragraph}</p>;
    }
    return <p key={index} className="mb-4 whitespace-pre-line">{paragraph}</p>;
  });

const BlogPost = () => {
  const { slug } = useParams();
  const { data: post, isLoading, isError } = useQuery<Post | null>({
    queryKey: ["blog-post", slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("title, slug, excerpt, content, category, tags, reading_time, image_url, created_at")
        .eq("slug", slug as string)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <Layout><div className="pt-24 min-h-[60vh] flex items-center justify-center"><Loader2 className="w-7 h-7 animate-spin text-primary" /></div></Layout>;
  }

  if (isError || !post) {
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

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: post.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Layout>
      <div className="pt-24">
        <SectionWrapper>
          <article className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary font-body mb-8 hover:gap-3 transition-all"><ArrowLeft className="w-4 h-4" />Back to Blog</Link>
            {post.image_url && <img src={post.image_url} alt={post.title} className="w-full aspect-video object-cover border border-border mb-8" />}
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary font-body">{post.category ?? "Insights"}</Badge>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">{post.title}</h1>
            {post.excerpt && <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-body mb-8 pb-8 border-b border-border/30">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.created_at).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.reading_time ?? 5} min read</span>
              <Button variant="ghost" size="sm" className="ml-auto text-primary" onClick={share}><Share2 className="w-4 h-4" />Share</Button>
            </div>
            <div className="font-body text-muted-foreground leading-relaxed">
              {renderContent(post.content ?? post.excerpt ?? "Read the latest from Our Thoughts LSKJ.")}
            </div>
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border/30">
              {(post.tags ?? []).map(tag => <Badge key={tag} variant="outline" className="border-border/50 text-muted-foreground font-body">{tag}</Badge>)}
            </div>
          </article>
        </SectionWrapper>
      </div>
    </Layout>
  );
};

export default BlogPost;
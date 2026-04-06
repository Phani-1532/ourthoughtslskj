import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { SectionWrapper } from "@/components/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import {
  BarChart3, Users, FileText, Eye, TrendingUp, Mail,
  LogOut, Shield, Clock, Plus, Pencil, Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-yellow-100 text-yellow-700",
  Qualified: "bg-green-100 text-green-700",
  "Demo Booked": "bg-primary/10 text-primary",
  Closed: "bg-muted text-muted-foreground",
};

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [tab, setTab] = useState("leads");
  const { toast } = useToast();

  const [leads, setLeads] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [heroSlides, setHeroSlides] = useState<any[]>([]);

  const [editOpen, setEditOpen] = useState(false);
  const [editType, setEditType] = useState("");
  const [editItem, setEditItem] = useState<any>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, sess) => {
      setSession(sess);
      if (sess?.user) {
        await checkAdmin(sess.user.id);
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });
    supabase.auth.getSession().then(async ({ data: { session: sess } }) => {
      setSession(sess);
      if (sess?.user) {
        await checkAdmin(sess.user.id);
      } else {
        setLoading(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const checkAdmin = async (uid: string) => {
    try {
      const { data } = await supabase.rpc("has_role", { _user_id: uid, _role: "admin" as any });
      setIsAdmin(!!data);
    } catch {
      setIsAdmin(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchAll();
  }, [isAdmin]);

  const fetchAll = async () => {
    const [l, b, c, j, t, p, h] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
      supabase.from("case_studies").select("*").order("created_at", { ascending: false }),
      supabase.from("job_listings").select("*").order("created_at", { ascending: false }),
      supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("hero_slides").select("*").order("sort_order"),
    ]);
    setLeads(l.data || []);
    setBlogs(b.data || []);
    setCaseStudies(c.data || []);
    setJobs(j.data || []);
    setTestimonials(t.data || []);
    setProducts(p.data || []);
    setHeroSlides(h.data || []);
  };

  const handleAuth = async () => {
    if (!email || !password) {
      toast({ title: "Missing fields", description: "Please enter email and password.", variant: "destructive" });
      return;
    }
    setAuthLoading(true);
    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (data.user) {
          // Assign admin role (only works for first user via security definer)
          await supabase.rpc("assign_admin_role", { _user_id: data.user.id });
          // Re-check admin status
          await checkAdmin(data.user.id);
          toast({ title: "Account created!", description: "You are now logged in as admin." });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Signed in successfully!" });
      }
    } catch (err: any) {
      toast({ title: isSignup ? "Signup Failed" : "Login Failed", description: err.message, variant: "destructive" });
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  };

  // Generic CRUD
  const openCreate = (type: string) => {
    setEditType(type);
    setEditItem(null);
    setFormData(getDefaultForm(type));
    setEditOpen(true);
  };

  const openEdit = (type: string, item: any) => {
    setEditType(type);
    setEditItem(item);
    setFormData({ ...item });
    setEditOpen(true);
  };

  const handleSave = async () => {
    const table = getTable(editType) as any;
    const saveData = { ...formData };
    delete saveData.id;
    delete saveData.created_at;
    delete saveData.updated_at;

    if (editItem) {
      const { error } = await supabase.from(table).update(saveData as any).eq("id", editItem.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Updated!" });
    } else {
      const { error } = await supabase.from(table).insert(saveData as any);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Created!" });
    }
    setEditOpen(false);
    fetchAll();
  };

  const handleDelete = async (type: string, id: string) => {
    const table = getTable(type) as any;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Deleted!" });
    fetchAll();
  };

  const getTable = (type: string) => {
    const map: Record<string, string> = {
      blogs: "blog_posts", cases: "case_studies", jobs: "job_listings",
      testimonials: "testimonials", products: "products", hero: "hero_slides", leads: "leads"
    };
    return map[type] || type;
  };

  const getDefaultForm = (type: string): Record<string, any> => {
    switch (type) {
      case "blogs": return { title: "", slug: "", excerpt: "", content: "", category: "", featured: false, reading_time: 5, published: false, image_url: "" };
      case "cases": return { title: "", slug: "", client: "", industry: "", problem: "", solution: "", metrics: [], published: false, image_url: "" };
      case "jobs": return { title: "", department: "", location: "", type: "Full-time", description: "", requirements: [], published: true };
      case "testimonials": return { name: "", role: "", company: "", content: "", rating: 5, published: true };
      case "products": return { name: "", slug: "", tagline: "", description: "", features: [], benefits: [], status: "Live", published: true, image_url: "" };
      case "hero": return { title: "", highlight: "", subtitle: "", cta_text: "Get Started", cta_link: "/contact", badge: "", sort_order: 0, published: true, image_url: "" };
      default: return {};
    }
  };

  const getFields = (type: string): { key: string; label: string; type: string }[] => {
    switch (type) {
      case "blogs": return [
        { key: "title", label: "Title", type: "text" }, { key: "slug", label: "Slug", type: "text" },
        { key: "excerpt", label: "Excerpt", type: "textarea" }, { key: "content", label: "Content", type: "textarea" },
        { key: "category", label: "Category", type: "text" }, { key: "reading_time", label: "Reading Time (min)", type: "number" },
        { key: "image_url", label: "Image URL", type: "text" }, { key: "featured", label: "Featured", type: "checkbox" },
        { key: "published", label: "Published", type: "checkbox" },
      ];
      case "cases": return [
        { key: "title", label: "Title", type: "text" }, { key: "slug", label: "Slug", type: "text" },
        { key: "client", label: "Client", type: "text" }, { key: "industry", label: "Industry", type: "text" },
        { key: "problem", label: "Problem", type: "textarea" }, { key: "solution", label: "Solution", type: "textarea" },
        { key: "image_url", label: "Image URL", type: "text" }, { key: "published", label: "Published", type: "checkbox" },
      ];
      case "jobs": return [
        { key: "title", label: "Title", type: "text" }, { key: "department", label: "Department", type: "text" },
        { key: "location", label: "Location", type: "text" }, { key: "type", label: "Type", type: "text" },
        { key: "description", label: "Description", type: "textarea" }, { key: "published", label: "Published", type: "checkbox" },
      ];
      case "testimonials": return [
        { key: "name", label: "Name", type: "text" }, { key: "role", label: "Role", type: "text" },
        { key: "company", label: "Company", type: "text" }, { key: "content", label: "Content", type: "textarea" },
        { key: "rating", label: "Rating (1-5)", type: "number" }, { key: "published", label: "Published", type: "checkbox" },
      ];
      case "products": return [
        { key: "name", label: "Name", type: "text" }, { key: "slug", label: "Slug", type: "text" },
        { key: "tagline", label: "Tagline", type: "text" }, { key: "description", label: "Description", type: "textarea" },
        { key: "status", label: "Status", type: "text" }, { key: "image_url", label: "Image URL", type: "text" },
        { key: "published", label: "Published", type: "checkbox" },
      ];
      case "hero": return [
        { key: "title", label: "Title", type: "text" }, { key: "highlight", label: "Highlight Word", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" }, { key: "badge", label: "Badge Text", type: "text" },
        { key: "cta_text", label: "CTA Text", type: "text" }, { key: "cta_link", label: "CTA Link", type: "text" },
        { key: "image_url", label: "Image URL", type: "text" },
        { key: "sort_order", label: "Sort Order", type: "number" }, { key: "published", label: "Published", type: "checkbox" },
      ];
      default: return [];
    }
  };

  if (loading) return <Layout><div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div></Layout>;

  // Login form
  if (!session || !isAdmin) {
    return (
      <Layout>
        <div className="pt-24 min-h-[70vh] flex items-center justify-center px-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">{isSignup ? "Create Admin Account" : "Admin Login"}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {isSignup ? "First user becomes the admin" : "Access the content management dashboard"}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              <Input placeholder="Password (min 6 chars)" type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAuth()} />
              <Button className="w-full" onClick={handleAuth} disabled={authLoading}>
                {authLoading ? "Please wait..." : (isSignup ? "Create Account" : "Sign In")}
              </Button>
              <button
                type="button"
                className="w-full text-sm text-primary hover:underline text-center"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Already have an account? Sign in" : "First time? Create admin account"}
              </button>
              {session && !isAdmin && <p className="text-sm text-destructive text-center">You don't have admin access. Only the first registered user becomes admin.</p>}
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Dashboard
  const sections = [
    { key: "leads", label: "Leads", count: leads.length, icon: Mail },
    { key: "hero", label: "Hero Slides", count: heroSlides.length, icon: Eye },
    { key: "blogs", label: "Blog Posts", count: blogs.length, icon: FileText },
    { key: "cases", label: "Case Studies", count: caseStudies.length, icon: TrendingUp },
    { key: "jobs", label: "Job Listings", count: jobs.length, icon: Users },
    { key: "testimonials", label: "Testimonials", count: testimonials.length, icon: BarChart3 },
    { key: "products", label: "Products", count: products.length, icon: Clock },
  ];

  const getItems = (key: string) => {
    switch (key) {
      case "leads": return leads;
      case "hero": return heroSlides;
      case "blogs": return blogs;
      case "cases": return caseStudies;
      case "jobs": return jobs;
      case "testimonials": return testimonials;
      case "products": return products;
      default: return [];
    }
  };

  const getItemLabel = (key: string, item: any) => {
    if (key === "leads") return item.name + " — " + item.email;
    return item.title || item.name || "Untitled";
  };

  const getItemSub = (key: string, item: any) => {
    if (key === "leads") return `${item.company || "N/A"} · ${item.industry || "N/A"} · Score: ${item.score}`;
    if (key === "blogs") return `${item.category || "No category"} · ${item.reading_time}m read`;
    if (key === "cases") return `${item.client} · ${item.industry || "N/A"}`;
    if (key === "jobs") return `${item.department || ""} · ${item.location || ""} · ${item.type}`;
    if (key === "testimonials") return `${item.role || ""} at ${item.company || ""}`;
    if (key === "products") return `${item.tagline || ""} · ${item.status}`;
    if (key === "hero") return `Order: ${item.sort_order} · Badge: ${item.badge || "None"}`;
    return "";
  };

  return (
    <Layout>
      <div className="pt-24 pb-12">
        <SectionWrapper>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage all website content</p>
            </div>
            <Button variant="ghost" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Logout</Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: "Leads", value: leads.length, icon: Mail },
              { label: "Blog Posts", value: blogs.length, icon: FileText },
              { label: "Products", value: products.length, icon: Clock },
              { label: "Case Studies", value: caseStudies.length, icon: TrendingUp },
            ].map(s => (
              <Card key={s.label}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <s.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="flex-wrap h-auto gap-1 mb-6">
              {sections.map(s => (
                <TabsTrigger key={s.key} value={s.key} className="text-xs">
                  {s.label} ({s.count})
                </TabsTrigger>
              ))}
            </TabsList>

            {sections.map(s => (
              <TabsContent key={s.key} value={s.key}>
                <Card>
                  <CardHeader className="flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-lg">{s.label}</CardTitle>
                    {s.key !== "leads" && (
                      <Button size="sm" onClick={() => openCreate(s.key)}><Plus className="w-4 h-4 mr-1" />Add New</Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    {getItems(s.key).length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">No items yet. Click "Add New" to create one.</p>
                    ) : (
                      <div className="space-y-2">
                        {getItems(s.key).map((item: any) => (
                          <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-medium text-foreground truncate">{getItemLabel(s.key, item)}</p>
                                {item.published !== undefined && (
                                  <Badge variant={item.published ? "default" : "secondary"} className="text-[10px]">
                                    {item.published ? "Published" : "Draft"}
                                  </Badge>
                                )}
                                {item.status && s.key === "leads" && (
                                  <Badge className={`text-[10px] border-0 ${statusColors[item.status] || ""}`}>{item.status}</Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground truncate">{getItemSub(s.key, item)}</p>
                            </div>
                            <div className="flex items-center gap-1 ml-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(s.key, item)}>
                                <Pencil className="w-3.5 h-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(s.key, item.id)}>
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </SectionWrapper>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit" : "Create"} {editType}</DialogTitle>
            <DialogDescription>Fill in the fields below and save.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {getFields(editType).map(field => (
              <div key={field.key}>
                <label className="text-sm font-medium text-foreground mb-1 block">{field.label}</label>
                {field.type === "textarea" ? (
                  <Textarea
                    value={formData[field.key] || ""}
                    onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                    rows={3}
                  />
                ) : field.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    checked={!!formData[field.key]}
                    onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.checked }))}
                    className="h-4 w-4"
                  />
                ) : field.type === "number" ? (
                  <Input
                    type="number"
                    value={formData[field.key] ?? ""}
                    onChange={e => setFormData(p => ({ ...p, [field.key]: parseInt(e.target.value) || 0 }))}
                  />
                ) : (
                  <Input
                    value={formData[field.key] || ""}
                    onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editItem ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;

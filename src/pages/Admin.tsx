import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SectionWrapper } from "@/components/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3, Users, FileText, Eye, TrendingUp, Mail, Phone, Building2,
  LogOut, Shield, Clock, ArrowUpRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Demo credentials for preview only — NOT secure for production
const ADMIN_EMAIL = "admin@ourthoughtslskj.com";
const ADMIN_PASSWORD = "OT@admin2025";

const mockLeads = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh@company.com", company: "TechCorp", industry: "IT & Technology", status: "New", date: "Mar 30, 2025", score: 85 },
  { id: 2, name: "Priya Menon", email: "priya@hospital.in", company: "City Hospital", industry: "Healthcare", status: "Contacted", date: "Mar 29, 2025", score: 72 },
  { id: 3, name: "Aditya Shah", email: "aditya@ecom.co", company: "ShopEasy", industry: "E-Commerce", status: "Qualified", date: "Mar 28, 2025", score: 91 },
  { id: 4, name: "Kavita Rao", email: "kavita@resort.com", company: "Sunset Resort", industry: "Hospitality", status: "New", date: "Mar 27, 2025", score: 65 },
  { id: 5, name: "Mohammed Ali", email: "ali@lawfirm.in", company: "Ali & Associates", industry: "Law", status: "Demo Booked", date: "Mar 26, 2025", score: 95 },
];

const mockStats = {
  totalVisits: 12450, totalLeads: 342, conversionRate: 2.74, avgTimeOnSite: "3:42",
  topPages: [
    { page: "Homepage", views: 4200 },
    { page: "Services", views: 2100 },
    { page: "Products", views: 1800 },
    { page: "Contact", views: 1500 },
    { page: "Case Studies", views: 980 },
  ],
  trafficSources: [
    { source: "Organic Search", pct: 45 },
    { source: "Direct", pct: 25 },
    { source: "Social Media", pct: 18 },
    { source: "Referrals", pct: 12 },
  ],
};

const statusColor: Record<string, string> = {
  "New": "bg-blue-500/10 text-blue-400",
  "Contacted": "bg-yellow-500/10 text-yellow-400",
  "Qualified": "bg-green-500/10 text-green-400",
  "Demo Booked": "bg-primary/10 text-primary",
};

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      toast({ title: "Welcome, Admin!", description: "You now have full access to the dashboard." });
    } else {
      toast({ title: "Login Failed", description: "Invalid credentials. Please try again.", variant: "destructive" });
    }
  };

  if (!loggedIn) {
    return (
      <Layout>
        <div className="pt-24 min-h-[70vh] flex items-center justify-center">
          <Card className="w-full max-w-md bg-gradient-card border-border/30">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <p className="text-sm text-muted-foreground font-body mt-2">Access the content management dashboard</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-secondary/50 border-border/50" />
              <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-secondary/50 border-border/50"
                onKeyDown={e => e.key === "Enter" && handleLogin()} />
              <Button variant="hero" className="w-full" onClick={handleLogin}>Sign In</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-24">
        <SectionWrapper>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground font-body mt-1">Full content management and analytics</p>
            </div>
            <Button variant="ghost" onClick={() => setLoggedIn(false)}><LogOut className="w-4 h-4 mr-2" />Logout</Button>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Eye, label: "Total Visits", value: mockStats.totalVisits.toLocaleString(), change: "+12%" },
              { icon: Users, label: "Total Leads", value: mockStats.totalLeads.toString(), change: "+8%" },
              { icon: TrendingUp, label: "Conversion Rate", value: `${mockStats.conversionRate}%`, change: "+0.3%" },
              { icon: Clock, label: "Avg. Time on Site", value: mockStats.avgTimeOnSite, change: "+15s" },
            ].map(s => (
              <Card key={s.label} className="bg-gradient-card border-border/30">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <s.icon className="w-5 h-5 text-primary" />
                    <span className="text-xs text-green-400 font-body flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" />{s.change}</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground font-body mt-1">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="leads" className="w-full">
            <TabsList className="bg-secondary/50 mb-6">
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            {/* Leads Tab */}
            <TabsContent value="leads">
              <Card className="bg-gradient-card border-border/30">
                <CardHeader><CardTitle className="text-lg">Lead Management</CardTitle></CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm font-body">
                      <thead><tr className="border-b border-border/30 text-muted-foreground">
                        <th className="text-left py-3 px-2">Name</th><th className="text-left py-3 px-2">Company</th>
                        <th className="text-left py-3 px-2">Industry</th><th className="text-left py-3 px-2">Status</th>
                        <th className="text-left py-3 px-2">Score</th><th className="text-left py-3 px-2">Date</th>
                      </tr></thead>
                      <tbody>{mockLeads.map(l => (
                        <tr key={l.id} className="border-b border-border/20 hover:bg-secondary/20">
                          <td className="py-3 px-2"><div className="text-foreground font-medium">{l.name}</div><div className="text-xs text-muted-foreground">{l.email}</div></td>
                          <td className="py-3 px-2 text-muted-foreground">{l.company}</td>
                          <td className="py-3 px-2 text-muted-foreground">{l.industry}</td>
                          <td className="py-3 px-2"><Badge className={`${statusColor[l.status]} border-0 font-normal`}>{l.status}</Badge></td>
                          <td className="py-3 px-2"><span className={`font-semibold ${l.score >= 80 ? "text-green-400" : l.score >= 60 ? "text-yellow-400" : "text-muted-foreground"}`}>{l.score}</span></td>
                          <td className="py-3 px-2 text-muted-foreground">{l.date}</td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-card border-border/30">
                  <CardHeader><CardTitle className="text-lg">Top Pages</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {mockStats.topPages.map(p => (
                      <div key={p.page} className="flex items-center justify-between">
                        <span className="text-sm text-foreground font-body">{p.page}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-secondary/50 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${(p.views / 4200) * 100}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground font-body w-12 text-right">{p.views.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card className="bg-gradient-card border-border/30">
                  <CardHeader><CardTitle className="text-lg">Traffic Sources</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {mockStats.trafficSources.map(s => (
                      <div key={s.source} className="flex items-center justify-between">
                        <span className="text-sm text-foreground font-body">{s.source}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-secondary/50 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${s.pct}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground font-body w-10 text-right">{s.pct}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content">
              <Card className="bg-gradient-card border-border/30">
                <CardHeader><CardTitle className="text-lg">Content Management</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Blog Posts", "Case Studies", "Job Listings", "Testimonials", "Products"].map(section => (
                      <div key={section} className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border/20">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <span className="text-foreground font-body font-medium">{section}</span>
                        </div>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground font-body text-center mt-4">
                      Full CMS functionality requires Lovable Cloud backend. Currently displaying demo data.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </SectionWrapper>
      </div>
    </Layout>
  );
};

export default Admin;

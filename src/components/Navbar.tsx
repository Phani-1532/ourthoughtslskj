import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/components/GlobalSearch";
import {
  ChevronDown, Menu, X, Heart, ShoppingCart, Hotel, Cpu, BarChart3,
  Utensils, Scale, Brain, Users, Briefcase, Globe, Smartphone,
  GraduationCap, Stethoscope, Tractor, ShoppingBag
} from "lucide-react";

const megaMenuItems = {
  columns: [
    {
      heading: "Services",
      items: [
        { label: "Business Segments", path: "/services/business-segments", icon: Briefcase },
        { label: "Marketing & Web Design", path: "/services/web-design", icon: Globe },
        { label: "Applications", path: "/services/applications", icon: Smartphone },
      ],
    },
    {
      heading: "Industries",
      items: [
        { label: "Healthcare", path: "/industries/healthcare", icon: Heart },
        { label: "E-Commerce", path: "/industries/ecommerce", icon: ShoppingCart },
        { label: "Hospitality", path: "/industries/hospitality", icon: Hotel },
        { label: "IT & Technology", path: "/industries/technology", icon: Cpu },
        { label: "HR & Finance", path: "/industries/hr-finance", icon: BarChart3 },
        { label: "Food Services", path: "/industries/food-services", icon: Utensils },
        { label: "Law Management", path: "/industries/law", icon: Scale },
        { label: "AI in ALL", path: "/industries/ai", icon: Brain },
        { label: "Professional Services", path: "/industries/professional", icon: Users },
      ],
    },
    {
      heading: "Products",
      items: [
        { label: "HRMS Platform", path: "/products", icon: Users },
        { label: "E-Learning", path: "/e-learning", icon: GraduationCap },
        { label: "Healthcare Apps", path: "/products", icon: Stethoscope },
        { label: "Smart Farming", path: "/products", icon: Tractor },
        { label: "E-Kirana", path: "/products", icon: ShoppingBag },
      ],
    },
  ],
};

const navItems = [
  { label: "Home", path: "/" },
  { label: "What We Serve", path: "/services", mega: true },
  { label: "Why Choose Us", path: "/why-choose-us" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Insights", path: "/blog" },
  { label: "Careers", path: "/careers" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-glass-strong border-b border-border shadow-card"
          : "bg-gradient-to-b from-background/80 to-transparent border-b border-transparent"
      }`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-primary group-hover:scale-105 transition-transform">
                <span className="text-primary-foreground font-extrabold text-sm">OT</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-foreground font-bold text-base tracking-tight">Our Thoughts</span>
                <span className="text-primary text-sm ml-1 font-extrabold">LSKJ</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.mega && setMegaOpen(true)}
                  onMouseLeave={() => item.mega && setMegaOpen(false)}
                >
                  <Link
                    to={item.path}
                    className={`px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 flex items-center gap-1 ${
                      location.pathname === item.path || (item.mega && (location.pathname.startsWith("/services") || location.pathname.startsWith("/industries") || location.pathname.startsWith("/products")))
                        ? "text-primary bg-primary/10" : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                    }`}
                  >
                    {item.label}
                    {item.mega && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />}
                  </Link>

                  <AnimatePresence>
                    {item.mega && megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[740px] bg-glass-strong rounded-2xl shadow-elevated p-7 border border-border/60"
                      >
                        <div className="grid grid-cols-3 gap-6">
                          {megaMenuItems.columns.map((col) => (
                            <div key={col.heading}>
                              <h4 className="editorial-kicker mb-4">{col.heading}</h4>
                              <div className="space-y-1">
                                {col.items.map((child) => (
                                  <Link
                                    key={child.label}
                                    to={child.path}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground/60 hover:text-foreground hover:bg-primary/10 transition-all duration-200 group/item"
                                  >
                                     <child.icon className="w-4 h-4 text-primary/70 group-hover/item:text-primary flex-shrink-0 transition-colors" />
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <GlobalSearch />
              <Button size="sm" className="hidden md:inline-flex" asChild>
                <Link to="/contact">Get Started</Link>
              </Button>
                <button onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"} className="lg:hidden p-2 text-foreground hover:text-primary transition-colors">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-background pt-20 text-foreground overflow-y-auto lg:hidden"
          >
            <div className="container px-6 py-6 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link to={item.path} className="block px-4 py-3.5 text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                    {item.label}
                  </Link>
                  {item.mega && (
                    <div className="pl-4 space-y-3 mt-1 mb-3">
                      {megaMenuItems.columns.map((col) => (
                        <div key={col.heading}>
                           <p className="editorial-kicker px-4 mb-2">{col.heading}</p>
                          <div className="space-y-0.5">
                            {col.items.map((child) => (
                               <Link key={child.label} to={child.path} className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground/60 hover:text-foreground hover:bg-primary/10 rounded-lg transition-colors">
                                <child.icon className="w-4 h-4 text-primary" />
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 px-4">
                <Button size="lg" className="w-full" asChild>
                  <Link to="/contact">Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

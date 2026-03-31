import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronDown, Menu, X, Heart, ShoppingCart, Hotel, Cpu, BarChart3,
  Utensils, Scale, Brain, Users, Briefcase, Globe, Smartphone,
  Monitor, GraduationCap, Stethoscope, Tractor, ShoppingBag
} from "lucide-react";

const megaMenuItems = {
  label: "What We Serve",
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
  { label: "Products", path: "/products" },
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-elevated" : "bg-transparent"
      }`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                <span className="text-primary-foreground font-bold font-display text-sm">OT</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-foreground font-display font-bold text-lg">Our Thoughts</span>
                <span className="text-primary font-display text-sm ml-1">LSKJ</span>
              </div>
            </Link>

            {/* Desktop Nav */}
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
                    className={`px-3 py-2 text-sm font-body font-medium rounded-md transition-colors flex items-center gap-1 ${
                      location.pathname === item.path || (item.mega && (location.pathname.startsWith("/services") || location.pathname.startsWith("/industries")))
                        ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    {item.mega && <ChevronDown className={`w-3 h-3 transition-transform ${megaOpen ? "rotate-180" : ""}`} />}
                  </Link>

                  {/* 3-Column Mega Menu */}
                  <AnimatePresence>
                    {item.mega && megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[700px] bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-elevated p-6"
                      >
                        <div className="grid grid-cols-3 gap-6">
                          {megaMenuItems.columns.map((col) => (
                            <div key={col.heading}>
                              <h4 className="text-xs font-body font-semibold text-primary uppercase tracking-wider mb-3">{col.heading}</h4>
                              <div className="space-y-1">
                                {col.items.map((child) => (
                                  <Link
                                    key={child.label}
                                    to={child.path}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-body text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                                  >
                                    <child.icon className="w-4 h-4 text-primary flex-shrink-0" />
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

            {/* CTA + Mobile */}
            <div className="flex items-center gap-3">
              <Button variant="hero" size="sm" className="hidden md:inline-flex" asChild>
                <Link to="/contact">Book Demo</Link>
              </Button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-foreground">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl pt-20 overflow-y-auto lg:hidden"
          >
            <div className="container px-6 py-8 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link to={item.path} className="block px-4 py-3 text-lg font-display text-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                  {item.mega && (
                    <div className="pl-4 space-y-4 mt-2">
                      {megaMenuItems.columns.map((col) => (
                        <div key={col.heading}>
                          <p className="text-xs font-body font-semibold text-primary uppercase tracking-wider px-4 mb-2">{col.heading}</p>
                          <div className="space-y-1">
                            {col.items.map((child) => (
                              <Link key={child.label} to={child.path} className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground font-body">
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
              <div className="pt-6">
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link to="/contact">Book Demo</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

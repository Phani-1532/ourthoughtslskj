import { Link } from "react-router-dom";
import { Linkedin, Instagram, Youtube, Twitter, Facebook } from "lucide-react";

const footerLinks = {
  "What We Serve": [
    { label: "Business Segments", path: "/services/business-segments" },
    { label: "Website Design", path: "/services/web-design" },
    { label: "Applications", path: "/services/applications" },
  ],
  Industries: [
    { label: "Healthcare", path: "/industries/healthcare" },
    { label: "E-Commerce", path: "/industries/ecommerce" },
    { label: "AI in ALL", path: "/industries/ai" },
    { label: "Hospitality", path: "/industries/hospitality" },
  ],
  Company: [
    { label: "About Us", path: "/about" },
    { label: "Careers", path: "/careers" },
    { label: "Case Studies", path: "/case-studies" },
    { label: "Contact", path: "/contact" },
  ],
  Support: [
    { label: "Blog", path: "/insights" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Disclaimer", path: "/disclaimer" },
  ],
};

const socials = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

export const Footer = () => (
  <footer className="bg-navy text-sidebar-foreground border-t border-sidebar-border">
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-sm bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">OT</span>
            </div>
             <span className="text-sidebar-foreground font-bold">LSKJ</span>
          </div>
           <p className="text-sm text-sidebar-foreground/65 mb-6">Chasing Dreams — Empowering innovation across E-Learning, Healthcare, Hospitality, IT, Consulting & BPM.</p>
          <div className="flex gap-2">
            {socials.map((s) => (
             <a key={s.label} href={s.href} aria-label={s.label} className="w-9 h-9 rounded-sm bg-sidebar-accent flex items-center justify-center text-sidebar-foreground/65 hover:text-primary hover:bg-primary/10 transition-colors">
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
             <h4 className="font-semibold text-sidebar-foreground mb-4 text-sm">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                   <Link to={link.path} className="text-sm text-sidebar-foreground/65 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

       <div className="mt-12 pt-8 border-t border-sidebar-border text-center">
         <p className="text-xs text-sidebar-foreground/50">© 2026 Our Thoughts LSKJ. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

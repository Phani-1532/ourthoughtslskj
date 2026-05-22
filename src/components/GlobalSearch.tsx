import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Search, Home, Briefcase, Package, Building2, BookOpen, Users, Phone, FileText, GraduationCap, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  { group: "Pages", entries: [
    { label: "Home", to: "/", icon: Home },
    { label: "Services", to: "/services", icon: Briefcase },
    { label: "Products", to: "/products", icon: Package },
    { label: "Industries", to: "/industries", icon: Building2 },
    { label: "Case Studies", to: "/case-studies", icon: FileText },
    { label: "Why Choose Us", to: "/why-choose-us", icon: Star },
    { label: "E-Learning", to: "/e-learning", icon: GraduationCap },
    { label: "Blog", to: "/blog", icon: BookOpen },
    { label: "About", to: "/about", icon: Users },
    { label: "Careers", to: "/careers", icon: Briefcase },
    { label: "Contact", to: "/contact", icon: Phone },
  ]},
  { group: "Quick Actions", entries: [
    { label: "Book a Demo", to: "/contact", icon: Calendar },
    { label: "Get a Quote", to: "/contact", icon: FileText },
  ]},
];

export const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (to: string) => { setOpen(false); navigate(to); };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex items-center gap-2 text-muted-foreground"
      >
        <Search className="w-4 h-4" />
        <span className="text-xs">Search…</span>
        <kbd className="ml-2 hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </Button>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="md:hidden p-2 text-muted-foreground hover:text-foreground"
      >
        <Search className="w-5 h-5" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, products, services…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {items.map((g, gi) => (
            <div key={g.group}>
              {gi > 0 && <CommandSeparator />}
              <CommandGroup heading={g.group}>
                {g.entries.map(e => (
                  <CommandItem key={e.label + e.to} onSelect={() => go(e.to)}>
                    <e.icon className="w-4 h-4 mr-2" />
                    {e.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

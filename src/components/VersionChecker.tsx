import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Polls index.html for a changed build asset hash. When detected, prompts user to refresh.
const POLL_INTERVAL = 60_000; // 1 minute

const extractAssetSignature = (html: string): string => {
  // Vite emits hashed assets like /assets/index-XXXX.js — use those as a fingerprint.
  const matches = html.match(/\/assets\/[A-Za-z0-9_\-.]+\.(?:js|css)/g);
  return matches ? matches.sort().join("|") : html.length.toString();
};

export const VersionChecker = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const initialSignature = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        const res = await fetch(`/index.html?_=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) return;
        const html = await res.text();
        const sig = extractAssetSignature(html);
        if (cancelled) return;
        if (initialSignature.current === null) {
          initialSignature.current = sig;
        } else if (sig !== initialSignature.current) {
          setUpdateAvailable(true);
        }
      } catch {
        // network errors — ignore
      }
    };

    check();
    const interval = setInterval(check, POLL_INTERVAL);
    const onFocus = () => check();
    window.addEventListener("focus", onFocus);

    return () => {
      cancelled = true;
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const reload = () => {
    window.location.reload();
  };

  const show = updateAvailable && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[calc(100%-2rem)]"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-background/95 backdrop-blur-md p-4 shadow-2xl">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">New version available</p>
              <p className="text-xs text-muted-foreground">Refresh to get the latest updates.</p>
            </div>
            <Button size="sm" onClick={reload} className="shrink-0">
              Refresh
            </Button>
            <button
              onClick={() => setDismissed(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const notFoundImage = "https://images.pexels.com/photos/9820925/pexels-photo-9820925.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl overflow-hidden border border-border shadow-elevated mb-8 group"
        >
          <img
            src={notFoundImage}
            alt="Lost on a winding road"
            loading="lazy"
            className="w-full h-[200px] md:h-[300px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oops! The page you're looking for seems to have taken a wrong turn.</p>
        <a href="/" className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

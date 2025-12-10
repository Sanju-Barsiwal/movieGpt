import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Logo from "@/components/Logo";
import BackgroundEffects from "@/components/BackgroundEffects";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <BackgroundEffects />
      
      <div className="text-center animate-scale-in">
        <Logo size="lg" />
        
        <div className="mt-12 mb-8">
          <h1 className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="gradient" size="lg" asChild>
            <Link to="/browse" className="gap-2">
              <Home className="w-5 h-5" />
              Go to Browse
            </Link>
          </Button>
          <Button variant="glass" size="lg" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

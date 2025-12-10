import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function Navigation() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="American Liberty Order" className="h-12 w-12" />
          <span className="text-xl font-bold text-foreground">American Liberty Order</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="/#about" className="text-foreground/80 hover:text-foreground transition-colors">About</a>
          <Link to="/policies" className="text-foreground/80 hover:text-foreground transition-colors">Policies</Link>
          <Link to="/programs" className="text-foreground/80 hover:text-foreground transition-colors">Programs</Link>
          <a href="/#get-involved" className="text-foreground/80 hover:text-foreground transition-colors">Get Involved</a>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}

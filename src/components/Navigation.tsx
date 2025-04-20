import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  return (
    <nav className="flex items-center space-x-4 p-4 bg-[hsl(var(--background))] border-b border-[hsl(var(--border))]">
      <Link to="/" className="font-semibold">
        Home
      </Link>
      <Link to="/about" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
        About
      </Link>
      <div className="ml-auto flex items-center space-x-2">
        <Link to="/login">
          <Button variant="outline" size="sm">
            Login
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="default" size="sm">
            Dashboard
          </Button>
        </Link>
      </div>
    </nav>
  );
} 
import { Link } from "react-router-dom";
import { Button } from "@/components/UI/button";

export default function Navigation() {
  return (
    <nav className="flex items-center space-x-4 p-4 bg-[hsl(var(--background))] border-b border-[hsl(var(--border))]">
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
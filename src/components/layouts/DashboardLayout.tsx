import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Settings, 
  User, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const handleLogout = () => {
    // TODO: Implement actual logout logic
    console.log("Logging out...");
    
    // For now, just navigate to the login page
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Header */}
      <header className="border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] sticky top-0 z-10">
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <h2 className="text-lg font-semibold gradient-text">Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User size={20} />
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="gap-2">
              <LogOut size={18} />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-64 border-r border-[hsl(var(--border))] min-h-[calc(100vh-4rem)] bg-[hsl(var(--background))] transition-all duration-300`}>
          <nav className="space-y-1 p-4">
            <Button 
              variant="ghost" 
              className={`sidebar-item w-full justify-start ${isActive('/dashboard') ? 'active' : ''}`}
              onClick={() => navigate('/dashboard')}
            >
              <BarChart3 size={18} />
              <span>Overview</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`sidebar-item w-full justify-start ${isActive('/dashboard/analytics') ? 'active' : ''}`}
              onClick={() => navigate('/dashboard/analytics')}
            >
              <BarChart3 size={18} />
              <span>Analytics</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`sidebar-item w-full justify-start ${isActive('/dashboard/settings') ? 'active' : ''}`}
              onClick={() => navigate('/dashboard/settings')}
            >
              <Settings size={18} />
              <span>Settings</span>
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'md:ml-0' : 'md:ml-64'}`}>
          {children}
        </main>
      </div>
    </div>
  );
} 
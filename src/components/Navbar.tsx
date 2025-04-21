import { Button } from '@/components/UI/button';
import { LogOut } from 'lucide-react';
import { authService } from '@/services/auth.service';

interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  const user = authService.getCurrentUser();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between py-4 sm:h-16">
          <div className="flex items-center mb-4 sm:mb-0">
            <h1 className="text-xl font-semibold">Task Management Dashboard</h1>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-sm sm:text-base">Welcome, {user?.name || 'User'}</span>
            <Button
              onClick={onLogout}
              variant="destructive"
              size="sm"
              className="gap-2"
            >
              <LogOut size={16} />
            
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
} 
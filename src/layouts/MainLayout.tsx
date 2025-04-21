import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Navigation />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout; 
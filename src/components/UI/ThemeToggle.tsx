import React from 'react';
import { useUIStore, Theme } from '../../store';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useUIStore();
  
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    
    // Apply theme to document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  return (
    <div className="theme-toggle">
      <h3>Theme</h3>
      <div className="theme-options">
        <button 
          className={theme === 'light' ? 'active' : ''} 
          onClick={() => handleThemeChange('light')}
        >
          Light
        </button>
        <button 
          className={theme === 'dark' ? 'active' : ''} 
          onClick={() => handleThemeChange('dark')}
        >
          Dark
        </button>
        <button 
          className={theme === 'system' ? 'active' : ''} 
          onClick={() => handleThemeChange('system')}
        >
          System
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle; 
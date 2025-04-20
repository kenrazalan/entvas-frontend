import React from 'react';
import { useUIStore } from '../../store';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  
  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>Entvas</h2>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarOpen ? '&times;' : '&#9776;'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 
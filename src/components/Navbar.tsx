import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-4xl mx-auto px-4">
        <ul className="flex space-x-8 py-4">
          <li>
            <Link to={ROUTES.HOME} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Home
            </Link>
          </li>
          <li>
            <Link to={ROUTES.ABOUT} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 
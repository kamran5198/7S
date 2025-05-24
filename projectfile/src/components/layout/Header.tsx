import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Activity, BarChart3, User, Settings } from 'lucide-react';
import { useSimulationStore } from '../../store/simulationStore';

export const Header: React.FC = () => {
  const location = useLocation();
  const { simulation } = useSimulationStore();
  
  return (
    <header className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">7S Simulator</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <NavItem href="/" active={location.pathname === '/'}>
              Home
            </NavItem>
            <NavItem 
              href="/profile" 
              active={location.pathname === '/profile'}
              disabled={!simulation.company}
            >
              Company Profile
            </NavItem>
            <NavItem 
              href="/simulation" 
              active={location.pathname === '/simulation'}
              disabled={!simulation.company}
            >
              7S Model
            </NavItem>
            <NavItem 
              href="/decisions" 
              active={location.pathname === '/decisions'}
              disabled={!simulation.company}
            >
              Decisions
            </NavItem>
            <NavItem 
              href="/results" 
              active={location.pathname === '/results'}
              disabled={!simulation.company}
            >
              Results
            </NavItem>
          </nav>
          
          <div className="flex items-center space-x-4">
            {simulation.company && (
              <div className="hidden md:flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  <User className="h-4 w-4" />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {simulation.company.name}
                </span>
              </div>
            )}
            <button className="rounded-full h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavItemProps {
  href: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ 
  href, 
  active = false, 
  disabled = false, 
  children 
}) => {
  if (disabled) {
    return (
      <span className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-400 cursor-not-allowed">
        {children}
      </span>
    );
  }
  
  return (
    <Link
      to={href}
      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
        active
          ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
};
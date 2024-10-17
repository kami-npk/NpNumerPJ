import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../nav-items';

const Navbar = () => {
  return (
    <nav className="bg-discord-dark-secondary">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center pl-0">
              <span className="text-xl font-bold text-discord-interactive-active">Home</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-discord-text-normal hover:text-discord-interactive-active px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
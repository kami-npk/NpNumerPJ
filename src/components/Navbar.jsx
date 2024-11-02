import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-discord-dark-secondary">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center pl-0">
              <div className="flex flex-col items-center leading-none text-xl font-light text-discord-interactive-active relative hover:text-blue-500 transition-colors p-4">
                <span className="mb-1 transform -translate-x-1">N</span>
                <span className="absolute top-1/2 -translate-y-1/2 rotate-45 text-2xl transform translate-x-0.5">/</span>
                <span className="mt-1 transform translate-x-1">P</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-discord-dark-secondary">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center pl-0">
              <span className="text-2xl font-extrabold text-discord-interactive-active tracking-tighter">N/P</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
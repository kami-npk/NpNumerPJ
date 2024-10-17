import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-discord-dark-secondary">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center pl-0">
              <span className="text-xl font-bold text-discord-interactive-active">Home</span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/root-of-equations" className="text-discord-interactive-normal hover:text-discord-interactive-active">Root of Equations</Link>
            <Link to="/linear-algebra" className="text-discord-interactive-normal hover:text-discord-interactive-active">Linear Algebra</Link>
            <Link to="/interpolation" className="text-discord-interactive-normal hover:text-discord-interactive-active">Interpolation</Link>
            <Link to="/extrapolation" className="text-discord-interactive-normal hover:text-discord-interactive-active">Extrapolation</Link>
            <Link to="/integration" className="text-discord-interactive-normal hover:text-discord-interactive-active">Integration</Link>
            <Link to="/differential" className="text-discord-interactive-normal hover:text-discord-interactive-active">Differential</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
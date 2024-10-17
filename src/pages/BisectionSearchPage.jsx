import React from 'react';
import BisectionSearch from '../components/BisectionSearch';

const BisectionSearchPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-discord-interactive-active">Root of Equations - Bisection Search</h1>
      <BisectionSearch />
    </div>
  );
};

export default BisectionSearchPage;
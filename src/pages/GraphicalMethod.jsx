import React from 'react';
import { useParams } from 'react-router-dom';
import BisectionSearch from '../components/BisectionSearch';

const GraphicalMethod = () => {
  const { method } = useParams();

  const renderMethod = () => {
    switch (method) {
      case 'bisection':
        return <BisectionSearch />;
      // Add other methods here as they are implemented
      default:
        return <div>Select a method from the menu</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Root of Equations - {method}</h1>
      {renderMethod()}
    </div>
  );
};

export default GraphicalMethod;
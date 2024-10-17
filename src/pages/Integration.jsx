import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EquationNavDropdown from '../components/EquationNavDropdown';

const items = [
  { title: "Single Trapezoidal Rule", path: "single-trapezoidal" },
  { title: "Composite Trapezoidal Rule", path: "composite-trapezoidal" },
  { title: "Single Simpson's Rule", path: "single-simpson" },
  { title: "Composite Simpson's Rule", path: "composite-simpson" },
];

const Integration = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Integration Equations</h1>
      <EquationNavDropdown title="Select Method" items={items} basePath="/integration" />
      <Routes>
        {items.map((item, index) => (
          <Route 
            key={index} 
            path={item.path} 
            element={<div>Content for {item.title}</div>} 
          />
        ))}
      </Routes>
    </div>
  );
};

export default Integration;
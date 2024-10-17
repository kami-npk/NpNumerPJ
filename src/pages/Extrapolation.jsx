import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EquationNavDropdown from '../components/EquationNavDropdown';

const items = [
  { title: "Simple Regression Extrapolation", path: "simple-regression" },
  { title: "Multiple Regression Extrapolation", path: "multiple-regression" },
];

const Extrapolation = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Extrapolation Equations</h1>
      <EquationNavDropdown title="Select Method" items={items} basePath="/extrapolation" />
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

export default Extrapolation;
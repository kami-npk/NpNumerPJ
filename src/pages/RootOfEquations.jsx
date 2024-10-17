import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EquationNavDropdown from '../components/EquationNavDropdown';

const items = [
  { title: "Graphical Methods", path: "graphical" },
  { title: "Bisection Search", path: "bisection" },
  { title: "False-position Methods", path: "false-position" },
  { title: "One-point Iteration Methods", path: "one-point-iteration" },
  { title: "Newton-Raphson Methods", path: "newton-raphson" },
  { title: "Secant Methods", path: "secant" },
];

const RootOfEquations = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Root of Equations</h1>
      <EquationNavDropdown title="Select Method" items={items} basePath="/root-of-equations" />
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

export default RootOfEquations;
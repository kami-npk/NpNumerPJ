import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EquationNavDropdown from '../components/EquationNavDropdown';

const items = [
  { title: "Newton's Divided Difference", path: "newtons-divided-difference" },
  { title: "Lagrange Interpolation", path: "lagrange" },
  { title: "Spline Interpolation", path: "spline" },
];

const Interpolation = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Interpolation Equations</h1>
      <EquationNavDropdown title="Select Method" items={items} basePath="/interpolation" />
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

export default Interpolation;
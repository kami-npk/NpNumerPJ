import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EquationNavDropdown from '../components/EquationNavDropdown';

const items = [
  { title: "Cramer's Rule", path: "cramers-rule" },
  { title: "Gauss Elimination Methods", path: "gauss-elimination" },
  { title: "Gauss Jordan Methods", path: "gauss-jordan" },
  { title: "Matrix Inversion", path: "matrix-inversion" },
  { title: "LU Decomposition Method", path: "lu-decomposition" },
  { title: "Jacobi Iteration Method", path: "jacobi-iteration" },
  { title: "Conjugate Gradient Method", path: "conjugate-gradient" },
];

const LinearAlgebra = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Linear Algebra Equations</h1>
      <EquationNavDropdown title="Select Method" items={items} basePath="/linear-algebra" />
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

export default LinearAlgebra;
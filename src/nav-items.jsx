import React from 'react';
import { FunctionSquareIcon, GridIcon, TrendingUpIcon, ArrowRightLeftIcon, PercentIcon, DivideIcon } from "lucide-react";

// Placeholder component for missing pages
export const PlaceholderComponent = ({ title }) => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p>This is a placeholder for the {title} page.</p>
  </div>
);

export const navItems = [
  {
    title: "Root of Equations",
    to: "/root-of-equations",
    icon: <FunctionSquareIcon className="h-4 w-4" />,
    page: <PlaceholderComponent title="Root of Equations" />,
    subItems: [
      { title: "Graphical Methods", to: "/root-of-equations/graphical" },
      { title: "Bisection Search", to: "/root-of-equations/bisection" },
      { title: "False-position Methods", to: "/root-of-equations/false-position" },
      { title: "One-point Iteration Methods", to: "/root-of-equations/one-point-iteration" },
      { title: "Newton-Raphson Methods", to: "/root-of-equations/newton-raphson" },
      { title: "Secant Methods", to: "/root-of-equations/secant" },
    ],
  },
  {
    title: "Linear Algebra Equations",
    to: "/linear-algebra",
    icon: <GridIcon className="h-4 w-4" />,
    page: <PlaceholderComponent title="Linear Algebra Equations" />,
    subItems: [
      { title: "Cramer's Rule", to: "/linear-algebra/cramers-rule" },
      { title: "Gauss Elimination Methods", to: "/linear-algebra/gauss-elimination" },
      { title: "Gauss Jordan Methods", to: "/linear-algebra/gauss-jordan" },
      { title: "Matrix Inversion", to: "/linear-algebra/matrix-inversion" },
      { title: "LU Decomposition Method", to: "/linear-algebra/lu-decomposition" },
      { title: "Jacobi Iteration Method", to: "/linear-algebra/jacobi-iteration" },
      { title: "Conjugate Gradient Method", to: "/linear-algebra/conjugate-gradient" },
    ],
  },
  {
    title: "Interpolation Equations",
    to: "/interpolation",
    icon: <TrendingUpIcon className="h-4 w-4" />,
    page: <PlaceholderComponent title="Interpolation Equations" />,
    subItems: [
      { title: "Newton's Divided Difference", to: "/interpolation/newtons-divided-difference" },
      { title: "Lagrange Interpolation", to: "/interpolation/lagrange" },
      { title: "Spline Interpolation", to: "/interpolation/spline" },
    ],
  },
  {
    title: "Extrapolation Equations",
    to: "/extrapolation",
    icon: <ArrowRightLeftIcon className="h-4 w-4" />,
    page: <PlaceholderComponent title="Extrapolation Equations" />,
    subItems: [
      { title: "Simple Regression Extrapolation", to: "/extrapolation/simple-regression" },
      { title: "Multiple Regression Extrapolation", to: "/extrapolation/multiple-regression" },
    ],
  },
  {
    title: "Integration Equations",
    to: "/integration",
    icon: <PercentIcon className="h-4 w-4" />,
    page: <PlaceholderComponent title="Integration Equations" />,
    subItems: [
      { title: "Single Trapezoidal Rule", to: "/integration/single-trapezoidal" },
      { title: "Composite Trapezoidal Rule", to: "/integration/composite-trapezoidal" },
      { title: "Single Simpson's Rule", to: "/integration/single-simpson" },
      { title: "Composite Simpson's Rule", to: "/integration/composite-simpson" },
    ],
  },
  {
    title: "Differential Equations",
    to: "/differential",
    icon: <DivideIcon className="h-4 w-4" />,
    page: <PlaceholderComponent title="Differential Equations" />,
    subItems: [
      { title: "Numerical Differentiation", to: "/differential/numerical-differentiation" },
    ],
  },
];
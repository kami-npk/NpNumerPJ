import React from 'react';
import { FunctionSquareIcon, GridIcon, TrendingUpIcon, ArrowRightLeftIcon, PercentIcon, DivideIcon } from "lucide-react";

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
    icon: <FunctionSquareIcon />,
    page: <PlaceholderComponent title="Root of Equations" />,
    description: "Methods for finding roots of equations",
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
    icon: <GridIcon />,
    page: <PlaceholderComponent title="Linear Algebra Equations" />,
    description: "Techniques for solving systems of linear equations",
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
    icon: <TrendingUpIcon />,
    page: <PlaceholderComponent title="Interpolation Equations" />,
    description: "Methods for estimating values between known data points",
    subItems: [
      { title: "Newton's Divided Difference", to: "/interpolation/newtons-divided-difference" },
      { title: "Lagrange Interpolation", to: "/interpolation/lagrange" },
      { title: "Spline Interpolation", to: "/interpolation/spline" },
    ],
  },
  {
    title: "Extrapolation Equations",
    to: "/extrapolation",
    icon: <ArrowRightLeftIcon />,
    page: <PlaceholderComponent title="Extrapolation Equations" />,
    description: "Techniques for estimating values beyond known data points",
    subItems: [
      { title: "Simple Regression Extrapolation", to: "/extrapolation/simple-regression" },
      { title: "Multiple Regression Extrapolation", to: "/extrapolation/multiple-regression" },
    ],
  },
  {
    title: "Integration Equations",
    to: "/integration",
    icon: <PercentIcon />,
    page: <PlaceholderComponent title="Integration Equations" />,
    description: "Methods for numerical integration",
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
    icon: <DivideIcon />,
    page: <PlaceholderComponent title="Differential Equations" />,
    description: "Techniques for solving differential equations numerically",
    subItems: [
      { title: "Numerical Differentiation", to: "/differential/numerical-differentiation" },
    ],
  },
];
import React from 'react';
import { FunctionSquareIcon, GridIcon, TrendingUpIcon, ArrowRightLeftIcon, PercentIcon, DivideIcon } from "lucide-react";
import GraphicalMethods from "./pages/root-of-equations/GraphicalMethods";
import BisectionMethods from "./pages/root-of-equations/BisectionMethods";
import FalsePositionMethods from "./pages/root-of-equations/FalsePositionMethods";
import OnePointMethods from "./pages/root-of-equations/OnePointMethods";
import NewtonRaphsonMethods from "./pages/root-of-equations/NewtonRaphsonMethods";

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
      { title: "Graphical Methods", to: "/root-of-equations/graphical", page: <GraphicalMethods /> },
      { title: "Bisection Search", to: "/root-of-equations/bisection", page: <BisectionMethods /> },
      { title: "False-position Methods", to: "/root-of-equations/false-position", page: <FalsePositionMethods /> },
      { title: "One-point Iteration Methods", to: "/root-of-equations/one-point-iteration", page: <OnePointMethods /> },
      { title: "Newton-Raphson Methods", to: "/root-of-equations/newton-raphson", page: <NewtonRaphsonMethods /> },
      { title: "Secant Methods", to: "/root-of-equations/secant", page: <PlaceholderComponent title="Secant Methods" /> },
    ],
  },
  {
    title: "Linear Algebra Equations",
    to: "/linear-algebra",
    icon: <GridIcon />,
    page: <PlaceholderComponent title="Linear Algebra Equations" />,
    description: "Techniques for solving systems of linear equations",
    subItems: [
      { title: "Cramer's Rule", to: "/linear-algebra/cramers-rule", page: <PlaceholderComponent title="Cramer's Rule" /> },
      { title: "Gauss Elimination Methods", to: "/linear-algebra/gauss-elimination", page: <PlaceholderComponent title="Gauss Elimination Methods" /> },
      { title: "Gauss Jordan Methods", to: "/linear-algebra/gauss-jordan", page: <PlaceholderComponent title="Gauss Jordan Methods" /> },
      { title: "Matrix Inversion", to: "/linear-algebra/matrix-inversion", page: <PlaceholderComponent title="Matrix Inversion" /> },
      { title: "LU Decomposition Method", to: "/linear-algebra/lu-decomposition", page: <PlaceholderComponent title="LU Decomposition Method" /> },
      { title: "Jacobi Iteration Method", to: "/linear-algebra/jacobi-iteration", page: <PlaceholderComponent title="Jacobi Iteration Method" /> },
      { title: "Conjugate Gradient Method", to: "/linear-algebra/conjugate-gradient", page: <PlaceholderComponent title="Conjugate Gradient Method" /> },
    ],
  },
  {
    title: "Interpolation Equations",
    to: "/interpolation",
    icon: <TrendingUpIcon />,
    page: <PlaceholderComponent title="Interpolation Equations" />,
    description: "Methods for estimating values between known data points",
    subItems: [
      { title: "Newton's Divided Difference", to: "/interpolation/newtons-divided-difference", page: <PlaceholderComponent title="Newton's Divided Difference" /> },
      { title: "Lagrange Interpolation", to: "/interpolation/lagrange", page: <PlaceholderComponent title="Lagrange Interpolation" /> },
      { title: "Spline Interpolation", to: "/interpolation/spline", page: <PlaceholderComponent title="Spline Interpolation" /> },
    ],
  },
  {
    title: "Extrapolation Equations",
    to: "/extrapolation",
    icon: <ArrowRightLeftIcon />,
    page: <PlaceholderComponent title="Extrapolation Equations" />,
    description: "Techniques for estimating values beyond known data points",
    subItems: [
      { title: "Simple Regression Extrapolation", to: "/extrapolation/simple-regression", page: <PlaceholderComponent title="Simple Regression Extrapolation" /> },
      { title: "Multiple Regression Extrapolation", to: "/extrapolation/multiple-regression", page: <PlaceholderComponent title="Multiple Regression Extrapolation" /> },
    ],
  },
  {
    title: "Integration Equations",
    to: "/integration",
    icon: <PercentIcon />,
    page: <PlaceholderComponent title="Integration Equations" />,
    description: "Methods for numerical integration",
    subItems: [
      { title: "Single Trapezoidal Rule", to: "/integration/single-trapezoidal", page: <PlaceholderComponent title="Single Trapezoidal Rule" /> },
      { title: "Composite Trapezoidal Rule", to: "/integration/composite-trapezoidal", page: <PlaceholderComponent title="Composite Trapezoidal Rule" /> },
      { title: "Single Simpson's Rule", to: "/integration/single-simpson", page: <PlaceholderComponent title="Single Simpson's Rule" /> },
      { title: "Composite Simpson's Rule", to: "/integration/composite-simpson", page: <PlaceholderComponent title="Composite Simpson's Rule" /> },
    ],
  },
  {
    title: "Differential Equations",
    to: "/differential",
    icon: <DivideIcon />,
    page: <PlaceholderComponent title="Differential Equations" />,
    description: "Techniques for solving differential equations numerically",
    subItems: [
      { title: "Numerical Differentiation", to: "/differential/numerical-differentiation", page: <PlaceholderComponent title="Numerical Differentiation" /> },
    ],
  },
];

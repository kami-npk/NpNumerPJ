import React from 'react';
import { FunctionSquareIcon, GridIcon, TrendingUpIcon, ArrowRightLeftIcon, PercentIcon, DivideIcon } from "lucide-react";
import GraphicalMethods from "./pages/root-of-equations/GraphicalMethods";
import BisectionMethods from "./pages/root-of-equations/BisectionMethods";
import FalsePositionMethods from "./pages/root-of-equations/FalsePositionMethods";
import OnePointMethods from "./pages/root-of-equations/OnePointMethods";
import NewtonRaphsonMethods from "./pages/root-of-equations/NewtonRaphsonMethods";
import SecantMethods from "./pages/root-of-equations/SecantMethods";
import CramersRule from "./pages/linear-algebra/CramersRule";
import GaussEliminationMethods from "./pages/linear-algebra/GaussEliminationMethods";
import GaussJordanMethods from "./pages/linear-algebra/GaussJordanMethods";
import MatrixInversionMethods from "./pages/linear-algebra/MatrixInversionMethods";
import LUDecompositionMethods from "./pages/linear-algebra/LUDecompositionMethods";
import CholeskyDecompositionMethods from "./pages/linear-algebra/CholeskyDecompositionMethods";
import JacobiIterationMethods from "./pages/linear-algebra/JacobiIterationMethods";
import GaussSeidelMethods from "./pages/linear-algebra/GaussSeidelMethods";
import ConjugateGradientMethods from "./pages/linear-algebra/ConjugateGradientMethods";
import NewtonDividedDifference from "./pages/interpolation/NewtonDividedDifference";
import LagrangeInterpolation from "./pages/interpolation/LagrangeInterpolation";
import SplineInterpolation from "./pages/interpolation/SplineInterpolation";
import LinearRegression from "./pages/extrapolation/LinearRegression";
import MultipleRegression from "./pages/extrapolation/MultipleRegression";
import PolynomialRegression from "./pages/extrapolation/PolynomialRegression";
import TrapezoidalRule from "./pages/integration/TrapezoidalRule";
import SimpsonRule from "./pages/integration/SimpsonRule";
import NumericalDifferentiation from "./pages/differential/NumericalDifferentiation";
import AccurateNumericalDifferentiation from "./pages/differential/AccurateNumericalDifferentiation";

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
      { title: "Secant Methods", to: "/root-of-equations/secant", page: <SecantMethods /> },
    ],
  },
  {
    title: "Linear Algebra Equations",
    to: "/linear-algebra",
    icon: <GridIcon />,
    page: <PlaceholderComponent title="Linear Algebra Equations" />,
    description: "Techniques for solving systems of linear equations",
    subItems: [
      { title: "Cramer's Rule", to: "/linear-algebra/cramers-rule", page: <CramersRule /> },
      { title: "Gauss Elimination Methods", to: "/linear-algebra/gauss-elimination", page: <GaussEliminationMethods /> },
      { title: "Gauss-Jordan Methods", to: "/linear-algebra/gauss-jordan", page: <GaussJordanMethods /> },
      { title: "Matrix Inversion", to: "/linear-algebra/matrix-inversion", page: <MatrixInversionMethods /> },
      { title: "LU Decomposition", to: "/linear-algebra/lu-decomposition", page: <LUDecompositionMethods /> },
      { title: "Cholesky Decomposition", to: "/linear-algebra/cholesky-decomposition", page: <CholeskyDecompositionMethods /> },
      { title: "Jacobi Iteration Method", to: "/linear-algebra/jacobi-iteration", page: <JacobiIterationMethods /> },
      { title: "Gauss-Seidel Method", to: "/linear-algebra/gauss-seidel", page: <GaussSeidelMethods /> },
      { title: "Conjugate Gradient Method", to: "/linear-algebra/conjugate-gradient", page: <ConjugateGradientMethods /> },
    ],
  },
  {
    title: "Interpolation Equations",
    to: "/interpolation",
    icon: <TrendingUpIcon />,
    page: <PlaceholderComponent title="Interpolation Equations" />,
    description: "Methods for estimating values between known data points",
    subItems: [
      { 
        title: "Newton's Divided Difference", 
        to: "/interpolation/newtons-divided-difference", 
        page: <NewtonDividedDifference /> 
      },
      { 
        title: "Lagrange Interpolation", 
        to: "/interpolation/lagrange", 
        page: <LagrangeInterpolation /> 
      },
      { 
        title: "Spline Interpolation", 
        to: "/interpolation/spline", 
        page: <SplineInterpolation /> 
      },
    ],
  },
  {
    title: "Extrapolation Equations",
    to: "/extrapolation",
    icon: <ArrowRightLeftIcon />,
    page: <PlaceholderComponent title="Extrapolation Equations" />,
    description: "Techniques for estimating values beyond known data points",
    subItems: [
      { 
        title: "Linear Regression", 
        to: "/extrapolation/linear-regression", 
        page: <LinearRegression /> 
      },
      { 
        title: "Multiple Regression", 
        to: "/extrapolation/multiple-regression", 
        page: <MultipleRegression /> 
      },
      { 
        title: "Polynomial Regression", 
        to: "/extrapolation/polynomial-regression", 
        page: <PolynomialRegression /> 
      },
    ],
  },
  {
    title: "Integration Equations",
    to: "/integration",
    icon: <PercentIcon />,
    page: <PlaceholderComponent title="Integration Equations" />,
    description: "Methods for numerical integration",
    subItems: [
      { 
        title: "Trapezoidal Rule", 
        to: "/integration/trapezoidal", 
        page: <TrapezoidalRule /> 
      },
      { 
        title: "Simpson's Rule", 
        to: "/integration/simpson", 
        page: <SimpsonRule /> 
      }
    ],
  },
  {
    title: "Differential Equations",
    to: "/differential",
    icon: <DivideIcon />,
    page: <PlaceholderComponent title="Differential Equations" />,
    description: "Techniques for solving differential equations numerically",
    subItems: [
      { 
        title: "Numerical Differentiation", 
        to: "/differential/numerical-differentiation", 
        page: <NumericalDifferentiation /> 
      },
      { 
        title: "Accurate Numerical Differentiation", 
        to: "/differential/accurate-numerical-differentiation", 
        page: <AccurateNumericalDifferentiation /> 
      },
    ],
  },
];

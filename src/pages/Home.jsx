import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FunctionSquareIcon, GridIcon, TrendingUpIcon, ArrowRightLeftIcon, PercentIcon, DivideIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const sections = [
  {
    title: "Root of Equations",
    icon: FunctionSquareIcon,
    to: "/root-of-equations",
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
    icon: GridIcon,
    to: "/linear-algebra",
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
    icon: TrendingUpIcon,
    to: "/interpolation",
    description: "Methods for estimating values between known data points",
    subItems: [
      { title: "Newton's Divided Difference", to: "/interpolation/newtons-divided-difference" },
      { title: "Lagrange Interpolation", to: "/interpolation/lagrange" },
      { title: "Spline Interpolation", to: "/interpolation/spline" },
    ],
  },
  {
    title: "Extrapolation Equations",
    icon: ArrowRightLeftIcon,
    to: "/extrapolation",
    description: "Techniques for estimating values beyond known data points",
    subItems: [
      { title: "Simple Regression Extrapolation", to: "/extrapolation/simple-regression" },
      { title: "Multiple Regression Extrapolation", to: "/extrapolation/multiple-regression" },
    ],
  },
  {
    title: "Integration Equations",
    icon: PercentIcon,
    to: "/integration",
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
    icon: DivideIcon,
    to: "/differential",
    description: "Techniques for solving differential equations numerically",
    subItems: [
      { title: "Numerical Differentiation", to: "/differential/numerical-differentiation" },
    ],
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 bg-discord-dark-primary">
      <h1 className="text-4xl font-bold text-center mb-2 text-discord-interactive-active">Numerical Methods</h1>
      <p className="text-xl text-center text-discord-text-muted mb-8">Explore various numerical methods and algorithms</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Popover key={section.to}>
            <PopoverTrigger asChild>
              <Card 
                className="bg-discord-dark-secondary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer border-discord-dark-tertiary"
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl text-discord-interactive-active">
                    <section.icon className="h-8 w-8 mr-3 text-discord-text-link" />
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-discord-text-muted">{section.description}</CardDescription>
                </CardHeader>
              </Card>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-discord-dark-tertiary border-discord-dark-secondary">
              <div className="grid gap-4">
                <h4 className="font-medium leading-none text-discord-interactive-active">{section.title}</h4>
                {section.subItems.map((subItem) => (
                  <button
                    key={subItem.to}
                    className="text-sm text-discord-text-normal hover:text-discord-interactive-active"
                    onClick={() => navigate(subItem.to)}
                  >
                    {subItem.title}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
};

export default Home;
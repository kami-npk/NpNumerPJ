import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FunctionSquareIcon, GridIcon, TrendingUpIcon, ArrowRightLeftIcon, PercentIcon, DivideIcon } from "lucide-react";

const sections = [
  {
    title: "Root of Equations",
    icon: FunctionSquareIcon,
    to: "/root-of-equations",
    description: "Methods for finding roots of equations",
  },
  {
    title: "Linear Algebra Equations",
    icon: GridIcon,
    to: "/linear-algebra",
    description: "Techniques for solving systems of linear equations",
  },
  {
    title: "Interpolation Equations",
    icon: TrendingUpIcon,
    to: "/interpolation",
    description: "Methods for estimating values between known data points",
  },
  {
    title: "Extrapolation Equations",
    icon: ArrowRightLeftIcon,
    to: "/extrapolation",
    description: "Techniques for estimating values beyond known data points",
  },
  {
    title: "Integration Equations",
    icon: PercentIcon,
    to: "/integration",
    description: "Methods for numerical integration",
  },
  {
    title: "Differential Equations",
    icon: DivideIcon,
    to: "/differential",
    description: "Techniques for solving differential equations numerically",
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
          <Card 
            key={section.to} 
            className="bg-discord-dark-secondary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer border-discord-dark-tertiary"
            onClick={() => navigate(section.to)}
          >
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-discord-interactive-active">
                <section.icon className="h-8 w-8 mr-3 text-discord-text-link" />
                {section.title}
              </CardTitle>
              <CardDescription className="text-lg text-discord-text-muted">{section.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
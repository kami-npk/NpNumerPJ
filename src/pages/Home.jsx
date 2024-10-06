import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FunctionSquareIcon, GridIcon, TrendingUpIcon, ArrowRightLeftIcon, PercentIcon, FractionIcon } from "lucide-react";

const sections = [
  { title: "Root of Equations", icon: FunctionSquareIcon, to: "/root-of-equations", description: "Methods for finding roots of equations" },
  { title: "Linear Algebra Equations", icon: GridIcon, to: "/linear-algebra", description: "Techniques for solving systems of linear equations" },
  { title: "Interpolation Equations", icon: TrendingUpIcon, to: "/interpolation", description: "Methods for estimating values between known data points" },
  { title: "Extrapolation Equations", icon: ArrowRightLeftIcon, to: "/extrapolation", description: "Techniques for estimating values beyond known data points" },
  { title: "Integration Equations", icon: PercentIcon, to: "/integration", description: "Methods for numerical integration" },
  { title: "Differential Equations", icon: FractionIcon, to: "/differential", description: "Techniques for solving differential equations numerically" },
];

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-2">Numerical Methods</h1>
      <p className="text-xl text-center text-gray-600 mb-8">Explore various numerical methods and algorithms</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link key={section.to} to={section.to}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <section.icon className="h-6 w-6 mr-2" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{section.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
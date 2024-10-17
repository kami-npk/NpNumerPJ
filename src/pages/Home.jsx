import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { navItems } from '../nav-items';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 bg-discord-dark-primary">
      <h1 className="text-4xl font-bold text-center mb-2 text-discord-interactive-active">Numerical Methods</h1>
      <p className="text-xl text-center text-discord-text-muted mb-8">Explore various numerical methods and algorithms</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {navItems.map((section) => (
          <Card 
            key={section.to}
            className="bg-discord-dark-secondary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer border-discord-dark-tertiary"
            onClick={() => navigate(section.to)}
          >
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-discord-interactive-active">
                {React.cloneElement(section.icon, { className: "w-8 h-8 mr-3 text-blue-500" })}
                <span>{section.title}</span>
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
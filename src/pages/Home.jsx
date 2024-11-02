import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { navItems } from '../nav-items';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 bg-discord-dark-primary">
      <h1 className="text-4xl font-bold text-center mb-2 text-discord-interactive-active">Numerical Methods</h1>
      <p className="text-xl text-center text-discord-text-muted mb-8">Explore various numerical methods and algorithms</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navItems.map((section) => (
          <Popover key={section.to}>
            <PopoverTrigger asChild>
              <Card 
                className="bg-discord-dark-secondary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer border-discord-dark-tertiary"
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl text-discord-interactive-active">
                    {React.cloneElement(section.icon, { className: "w-8 h-8 mr-3 text-blue-500" })}
                    <span>{section.title}</span>
                  </CardTitle>
                  <CardDescription className="text-lg text-discord-text-muted">{section.description}</CardDescription>
                </CardHeader>
              </Card>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-discord-dark-tertiary border-discord-dark-secondary p-0">
              <div className="py-2">
                <h4 className="font-medium leading-none text-discord-interactive-active px-4 py-2 text-lg">{section.title}</h4>
                {section.subItems.map((subItem) => (
                  <Button
                    key={subItem.to}
                    variant="ghost"
                    className="w-full justify-start text-discord-text-normal hover:text-discord-interactive-active hover:bg-discord-dark-secondary px-4 py-2 text-sm"
                    onClick={() => navigate(subItem.to)}
                  >
                    {subItem.title}
                  </Button>
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
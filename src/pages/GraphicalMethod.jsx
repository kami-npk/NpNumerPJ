import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const GraphicalMethod = () => {
  const [equation, setEquation] = useState('');
  const [xMin, setXMin] = useState('');
  const [xMax, setXMax] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we would implement the actual graphical method calculation
    // For now, we'll just set a placeholder result
    setResult(`Roots found in the range [${xMin}, ${xMax}] for equation: ${equation}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-discord-dark-primary">
      <h1 className="text-3xl font-bold text-center mb-6 text-discord-interactive-active">Graphical Method</h1>
      <Card className="bg-discord-dark-secondary border-discord-dark-tertiary">
        <CardHeader>
          <CardTitle className="text-2xl text-discord-interactive-active">Graphical Method Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="equation" className="text-discord-text-normal">Equation (e.g., x^2 - 4)</Label>
              <Input id="equation" value={equation} onChange={(e) => setEquation(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xMin" className="text-discord-text-normal">X Minimum</Label>
              <Input id="xMin" type="number" value={xMin} onChange={(e) => setXMin(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xMax" className="text-discord-text-normal">X Maximum</Label>
              <Input id="xMax" type="number" value={xMax} onChange={(e) => setXMax(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full bg-discord-brand hover:bg-discord-brand-hover">Calculate</Button>
          </form>
          {result && (
            <div className="mt-4 p-4 bg-discord-dark-tertiary rounded-md">
              <h3 className="text-xl font-semibold text-discord-interactive-active mb-2">Result:</h3>
              <p className="text-discord-text-normal">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphicalMethod;
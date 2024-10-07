import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GraphicalMethod = () => {
  const [method, setMethod] = useState('');
  const [equation, setEquation] = useState('');
  const [xl, setXl] = useState('');
  const [xr, setXr] = useState('');
  const [precision, setPrecision] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we would implement the actual calculation methods
    // For now, we'll just set a placeholder result
    setResult(`Calculated root using ${method} method: ${(parseFloat(xl) + parseFloat(xr)) / 2}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-discord-dark-primary">
      <h1 className="text-3xl font-bold text-center mb-6 text-discord-interactive-active">Numerical Methods Calculator</h1>
      <Card className="bg-discord-dark-secondary border-discord-dark-tertiary">
        <CardHeader>
          <CardTitle className="text-2xl text-discord-interactive-active">Root Finding Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="method" className="text-discord-text-normal">Method</Label>
              <Select onValueChange={setMethod} required>
                <SelectTrigger id="method">
                  <SelectValue placeholder="Select a method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="graphical">Graphical Method</SelectItem>
                  <SelectItem value="bisection">Bisection Search</SelectItem>
                  <SelectItem value="falsePosition">False Position Method</SelectItem>
                  <SelectItem value="onePoint">One-point Iteration Method</SelectItem>
                  <SelectItem value="newtonRaphson">Newton-Raphson Method</SelectItem>
                  <SelectItem value="secant">Secant Method</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="equation" className="text-discord-text-normal">Equation (e.g., x^2 - 4)</Label>
              <Input id="equation" value={equation} onChange={(e) => setEquation(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xl" className="text-discord-text-normal">X Left (XL)</Label>
              <Input id="xl" type="number" value={xl} onChange={(e) => setXl(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xr" className="text-discord-text-normal">X Right (XR)</Label>
              <Input id="xr" type="number" value={xr} onChange={(e) => setXr(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="precision" className="text-discord-text-normal">Precision</Label>
              <Input id="precision" type="number" value={precision} onChange={(e) => setPrecision(e.target.value)} required />
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
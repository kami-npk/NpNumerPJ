import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useCalculation } from './hooks/useOnePointCalculation';
import { EquationGraph } from './components/EquationGraph';
import { ErrorGraph } from './components/ErrorGraph';
import { IterationTable } from './components/IterationTable';

const OnePointMethods = () => {
  const [equation, setEquation] = useState("x^2 - 4");
  const [initialX, setInitialX] = useState("0");
  const { result, iterations, graphData, errorData, calculateRoot } = useCalculation();

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateRoot(equation, parseFloat(initialX));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">One-point Iteration Method</h1>
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="equation">Equation f(x)</Label>
              <Input
                id="equation"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="e.g., x^2 - 4"
              />
            </div>
            <div>
              <Label htmlFor="initialX">Initial X</Label>
              <Input
                id="initialX"
                type="number"
                value={initialX}
                onChange={(e) => setInitialX(e.target.value)}
                placeholder="e.g., 0"
              />
            </div>
            <Button type="submit">Solve</Button>
          </form>
        </CardContent>
      </Card>

      {result !== null && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Root approximation: {result.toPrecision(7)}</p>
          </CardContent>
        </Card>
      )}

      {graphData.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Equation Graph</CardTitle>
          </CardHeader>
          <CardContent>
            <EquationGraph data={graphData} equation={equation} />
          </CardContent>
        </Card>
      )}

      {errorData.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Error Graph</CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorGraph data={errorData} />
          </CardContent>
        </Card>
      )}

      {iterations.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Iteration Table</CardTitle>
          </CardHeader>
          <CardContent>
            <IterationTable data={iterations} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OnePointMethods;
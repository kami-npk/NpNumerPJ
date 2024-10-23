import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EquationGraph } from './components/EquationGraph';
import { ErrorGraph } from './components/ErrorGraph';
import { IterationTable } from './components/IterationTable';
import { calculateSecant } from './components/SecantCalculation';

const SecantMethods = () => {
  const [equation, setEquation] = useState("x^2 - 4");
  const [x0, setX0] = useState("0");
  const [x1, setX1] = useState("1");
  const [result, setResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [errorData, setErrorData] = useState([]);

  const calculateRoot = () => {
    const results = calculateSecant(equation, parseFloat(x0), parseFloat(x1));
    setResult(results.result);
    
    const iterationData = results.iterations.map((iter, index) => ({
      iteration: iter,
      x: results.xNew[index],
      error: results.errors[index]
    }));
    setIterations(iterationData);
    setErrorData(results.errors.map((err, i) => ({ iteration: i + 1, error: err })));

    // Generate equation graph data with proper error handling
    const graphData = [];
    const step = 0.1;
    for (let x = -10; x <= 10; x += step) {
      try {
        const y = evaluate(equation, { x });
        if (!isNaN(y) && isFinite(y)) {
          graphData.push({ x, y });
        }
      } catch (error) {
        console.error('Error evaluating equation:', error);
      }
    }
    setGraphData(graphData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Secant Method</h1>
      <div className="space-y-6">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="equation">Input Equation f(x)</Label>
                <Input
                  id="equation"
                  value={equation}
                  onChange={(e) => setEquation(e.target.value)}
                  placeholder="e.g., x^2 - 4"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="x0">Input X₀ (first initial value)</Label>
                <Input
                  id="x0"
                  type="number"
                  value={x0}
                  onChange={(e) => setX0(e.target.value)}
                  placeholder="e.g., 0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="x1">Input X₁ (second initial value)</Label>
                <Input
                  id="x1"
                  type="number"
                  value={x1}
                  onChange={(e) => setX1(e.target.value)}
                  placeholder="e.g., 1"
                />
              </div>
              <Button onClick={calculateRoot} className="w-full">Solve</Button>
              {result !== null && (
                <div className="text-center mt-4">
                  <p className="font-semibold">Answer: {result.toPrecision(7)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {result !== null && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Equation Graph</CardTitle>
              </CardHeader>
              <CardContent>
                <EquationGraph data={graphData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Graph</CardTitle>
              </CardHeader>
              <CardContent>
                <ErrorGraph data={errorData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Iteration Table</CardTitle>
              </CardHeader>
              <CardContent>
                <IterationTable data={iterations} />
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default SecantMethods;
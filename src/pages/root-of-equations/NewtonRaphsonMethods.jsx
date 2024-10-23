import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputForm } from './components/InputForm';
import { EquationGraph } from './components/EquationGraph';
import { ErrorGraph } from './components/ErrorGraph';
import { IterationTable } from './components/IterationTable';
import { error, calculateNewtonRaphson } from './components/CalculationUtils';

const NewtonRaphsonMethods = () => {
  const [equation, setEquation] = useState("");
  const [initialX, setInitialX] = useState("");
  const [result, setResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [errorData, setErrorData] = useState([]);

  const getEquationApi = async () => {
    try {
      const response = await fetch("https://pj-numer-api.onrender.com/rootOfEquationData/filter?data_id=3");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data) {
        setEquation(data.fx);
        setInitialX(parseFloat(data.initial_x).toFixed(4));
      }
    } catch (error) {
      console.error("Failed to fetch equation data:", error);
    }
  };

  const calculateRoot = () => {
    let x = parseFloat(initialX);
    let iter = 0;
    const MAX_ITER = 50;
    const EPSILON = 0.000001;
    const newIterations = [];
    const newErrorData = [];

    do {
      const xNew = calculateNewtonRaphson(x, equation);
      const err = error(x, xNew);
      
      iter++;
      newIterations.push({ iteration: iter, x: xNew, error: err });
      newErrorData.push({ iteration: iter, error: err });
      
      if (Math.abs(xNew - x) < EPSILON) {
        setResult(xNew);
        break;
      }
      
      x = xNew;
    } while (iter < MAX_ITER);

    setIterations(newIterations);
    setErrorData(newErrorData);

    // Generate equation graph data
    const graphData = [];
    const step = 0.1;
    for (let x = -5; x <= 5; x += step) {
      try {
        graphData.push({
          x,
          y: evaluate(equation, { x })
        });
      } catch (error) {
        console.error(`Error evaluating equation at x=${x}:`, error);
      }
    }
    setGraphData(graphData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Newton-Raphson Method</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <InputForm
            equation={equation}
            initialX={initialX}
            onEquationChange={setEquation}
            onInitialXChange={setInitialX}
            onGetEquation={getEquationApi}
            onCalculate={calculateRoot}
            result={result}
          />
        </div>
        <div className="md:col-span-2 space-y-6">
          {graphData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Equation Graph</CardTitle>
              </CardHeader>
              <CardContent>
                <EquationGraph data={graphData} />
              </CardContent>
            </Card>
          )}
          
          {errorData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Error Graph</CardTitle>
              </CardHeader>
              <CardContent>
                <ErrorGraph data={errorData} />
              </CardContent>
            </Card>
          )}
          
          {iterations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Iteration Table</CardTitle>
              </CardHeader>
              <CardContent>
                <IterationTable data={iterations} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewtonRaphsonMethods;
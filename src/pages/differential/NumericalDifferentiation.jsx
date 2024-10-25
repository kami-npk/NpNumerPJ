import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { evaluate, derivative } from 'mathjs';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { NumericalDifferentiationForm } from './components/NumericalDifferentiationForm';

const NumericalDifferentiation = () => {
  const [equation, setEquation] = useState("");
  const [x, setX] = useState("");
  const [h, setH] = useState("");
  const [result, setResult] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState("1");
  const [selectedDirection, setSelectedDirection] = useState("1");
  const [solution, setSolution] = useState(null);

  const f = (x) => {
    return evaluate(equation, { x });
  };

  const calculateDifferentiation = () => {
    const xNum = parseFloat(x);
    const hNum = parseFloat(h);
    let calculatedResult;
    let solutionLatex = '';

    try {
      switch (selectedDirection) {
        case "1": // Forward
          calculatedResult = calculateForward(xNum, hNum);
          break;
        case "2": // Backward
          calculatedResult = calculateBackward(xNum, hNum);
          break;
        case "3": // Central
          calculatedResult = calculateCentral(xNum, hNum);
          break;
      }

      // Calculate exact derivative for comparison
      let diffEquation = equation;
      for (let i = 0; i < parseInt(selectedOrder); i++) {
        diffEquation = derivative(diffEquation, 'x').toString();
      }
      const exactResult = evaluate(diffEquation, { x: xNum });
      const error = Math.abs((calculatedResult - exactResult) / exactResult) * 100;

      solutionLatex = `\\begin{aligned}
        &\\text{Order: ${getOrderText(selectedOrder)}} \\\\
        &\\text{Direction: ${getDirectionText(selectedDirection)}} \\\\
        &f(x) = ${equation} \\\\
        &f^{(${selectedOrder})}(x) = ${diffEquation} \\\\
        &\\text{Numerical result: } ${calculatedResult.toFixed(6)} \\\\
        &\\text{Exact result: } ${exactResult.toFixed(6)} \\\\
        &\\text{Error: } ${error.toFixed(2)}\\%
      \\end{aligned}`;

      setResult(calculatedResult);
      setSolution(katex.renderToString(solutionLatex, { displayMode: true }));
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  const getOrderText = (order) => {
    const orders = { "1": "First", "2": "Second", "3": "Third", "4": "Fourth" };
    return orders[order] || order;
  };

  const getDirectionText = (direction) => {
    const directions = { "1": "Forward", "2": "Backward", "3": "Central" };
    return directions[direction] || direction;
  };

  const calculateForward = (x, h) => {
    let fxip1 = f(x + h);
    let fxi = f(x);
    return (fxip1 - fxi) / h;
  };

  const calculateBackward = (x, h) => {
    let fxi = f(x);
    let fxim1 = f(x - h);
    return (fxi - fxim1) / h;
  };

  const calculateCentral = (x, h) => {
    let fxip1 = f(x + h);
    let fxim1 = f(x - h);
    return (fxip1 - fxim1) / (2 * h);
  };

  const getEquationFromApi = async () => {
    try {
      const response = await fetch("https://pj-numer-api.onrender.com/differentiateData/random");
      const data = await response.json();
      if (data) {
        setEquation(data.fx);
        setX(data.x.toString());
        setH(data.h.toString());
      }
    } catch (error) {
      console.error('Failed to fetch equation:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Numerical Differentiation</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NumericalDifferentiationForm
          equation={equation}
          x={x}
          h={h}
          selectedOrder={selectedOrder}
          selectedDirection={selectedDirection}
          onEquationChange={setEquation}
          onXChange={setX}
          onHChange={setH}
          onOrderChange={setSelectedOrder}
          onDirectionChange={setSelectedDirection}
          onCalculate={calculateDifferentiation}
          onGetEquation={getEquationFromApi}
          result={result}
        />

        {solution && (
          <Card>
            <CardHeader>
              <CardTitle>Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: solution }} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NumericalDifferentiation;

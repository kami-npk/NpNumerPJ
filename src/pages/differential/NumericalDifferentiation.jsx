import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { evaluate, derivative } from 'mathjs';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const NumericalDifferentiation = () => {
  const [equation, setEquation] = useState("");
  const [x, setX] = useState("");
  const [h, setH] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("1");
  const [selectedDirection, setSelectedDirection] = useState("1");
  const [solution, setSolution] = useState(null);
  const [result, setResult] = useState(null);

  const f = (x) => {
    return evaluate(equation, { x });
  };

  const forwardCalculate = (x, h) => {
    let fxip1 = f(x + h);
    let fxi = f(x);
    return {
      result: (fxip1 - fxi) / h,
      formula: `f'(x) = [ f(x_{i+1}) - f(x_{i}) ] / h`
    };
  };

  const backwardCalculate = (x, h) => {
    let fxi = f(x);
    let fxim1 = f(x - h);
    return {
      result: (fxi - fxim1) / h,
      formula: `f'(x) = [ f(x_{i}) - f(x_{i-1}) ] / h`
    };
  };

  const centerCalculate = (x, h) => {
    let fxip1 = f(x + h);
    let fxim1 = f(x - h);
    return {
      result: (fxip1 - fxim1) / (2 * h),
      formula: `f'(x) = [ f(x_{i+1}) - f(x_{i-1}) ] / 2h`
    };
  };

  const calculateDifferentiation = () => {
    if (!equation || !x || !h) return;

    const xNum = parseFloat(x);
    const hNum = parseFloat(h);
    let titleLatex = '';
    let formulaLatex = '';
    let resultValue = 0;

    switch (selectedOrder) {
      case "1":
        titleLatex = "First ";
        break;
      case "2":
        titleLatex = "Second ";
        break;
      case "3":
        titleLatex = "Third ";
        break;
      case "4":
        titleLatex = "Fourth ";
        break;
    }

    let method;
    switch (selectedDirection) {
      case "1":
        titleLatex += "Forward Divided-Differences ; O(h)";
        method = forwardCalculate;
        break;
      case "2":
        titleLatex += "Backward Divided-Differences ; O(h)";
        method = backwardCalculate;
        break;
      case "3":
        titleLatex += "Central Divided-Differences ; O(h^2)";
        method = centerCalculate;
        break;
    }

    const { result: numericalResult, formula } = method(xNum, hNum);
    resultValue = numericalResult;

    let diffEquation = equation;
    let exactDiffLatex = `Exact Differentiation of f(x) = ${equation}\\\\`;
    let symbol = "'";
    
    for (let i = 1; i <= parseInt(selectedOrder); i++) {
      diffEquation = derivative(diffEquation, 'x').toString();
      exactDiffLatex += `f${symbol}(x) = ${diffEquation}\\\\`;
      symbol += "'";
    }

    const exactValue = evaluate(diffEquation, { x: xNum });
    exactDiffLatex += `At\\ x = ${xNum}\\ ;\\ f${symbol}(${xNum}) = ${exactValue}`;

    const error = Math.abs((resultValue - exactValue) / exactValue) * 100;
    const errorLatex = `\\displaystyle error = \\left|\\frac{f${symbol}(x)_{numerical} - f${symbol}(x)_{true}}{f${symbol}(x)_{true}}\\right| \\times 100\\% = ${error.toFixed(4)}\\%`;

    const solutionLatex = `
      ${titleLatex}\\\\
      ${formula}\\\\
      ${exactDiffLatex}\\\\
      ${errorLatex}
    `;

    const renderedSolution = katex.renderToString(solutionLatex, {
      displayMode: true,
      throwOnError: false,
    });

    setSolution(renderedSolution);
    setResult(resultValue);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Numerical Differentiation</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Order</Label>
              <Select value={selectedOrder} onValueChange={setSelectedOrder}>
                <SelectTrigger>
                  <SelectValue placeholder="Select order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">First</SelectItem>
                  <SelectItem value="2">Second</SelectItem>
                  <SelectItem value="3">Third</SelectItem>
                  <SelectItem value="4">Fourth</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Direction</Label>
              <Select value={selectedDirection} onValueChange={setSelectedDirection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Forward</SelectItem>
                  <SelectItem value="2">Backward</SelectItem>
                  <SelectItem value="3">Central</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Input Equation f(x)</Label>
            <Input
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="e.g., x^2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Input x</Label>
              <Input
                type="number"
                value={x}
                onChange={(e) => setX(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Input h</Label>
              <Input
                type="number"
                value={h}
                onChange={(e) => setH(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={calculateDifferentiation} className="w-full">
            Solve
          </Button>

          {result !== null && (
            <div className="text-center font-semibold">
              Result: {result}
            </div>
          )}
        </CardContent>
      </Card>

      {solution && (
        <Card>
          <CardHeader>
            <CardTitle>Solution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="katex-solution" dangerouslySetInnerHTML={{ __html: solution }} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NumericalDifferentiation;

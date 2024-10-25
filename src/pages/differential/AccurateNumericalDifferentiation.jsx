import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { evaluate, derivative } from 'mathjs';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { SolutionDisplay } from './components/SolutionDisplay';

const AccurateNumericalDifferentiation = () => {
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
    const fxip5 = f(x+(5*h));
    const fxip4 = f(x+(4*h));
    const fxip3 = f(x+(3*h));
    const fxip2 = f(x+(2*h));
    const fxip1 = f(x+(1*h));
    const fxi = f(x);

    let result, formulaLatex, subFormulaLatex;

    switch (selectedOrder) {
      case "1":
        result = ((-1*fxip2)+(4*fxip1)+(-3*fxi))/(2*h);
        formulaLatex = `f'(x) = [ -f(x_{i+2}) + 4f(x_{i+1}) - 3f(x_{i}) ] / 2h`;
        subFormulaLatex = `f'(${x}) = [ (${-1*fxip2}) + (${4*fxip1}) - (${3*fxi}) ] / (${2*h}) = ${result}`;
        break;
      case "2":
        result = ((-1*fxip3)+(4*fxip2)-(5*fxip1)+(2*fxi))/(h**2);
        formulaLatex = `f''(x) = [ -f(x_{i+3}) + 4f(x_{i+2}) - 5f(x_{i+1}) + 2f(x_{i}) ] / h^2`;
        subFormulaLatex = `f''(${x}) = [ (${-1*fxip3}) + (${4*fxip2}) - (${5*fxip1}) + (${2*fxi}) ] / (${h**2}) = ${result}`;
        break;
      case "3":
        result = ((-3*fxip4)+(14*fxip3)-(24*fxip2)+(18*fxip1)-(5*fxi))/(2*(h**3));
        formulaLatex = `f'''(x) = [ -3f(x_{i+4}) + 14f(x_{i+3}) - 24f(x_{i+2}) + 18f(x_{i+1}) - 5f(x_{i})] / 2h^3`;
        subFormulaLatex = `f'''(${x}) = [ (${-3*fxip4}) + (${14*fxip3}) - (${24*fxip2}) + (${18*fxip1}) - (${5*fxi}) ] / (${2*(h**3)}) = ${result}`;
        break;
      case "4":
        result = ((-2*fxip5)+(11*fxip4)-(24*fxip3)+(26*fxip2)-(14*fxip1)+(3*fxi))/((h**4));
        formulaLatex = `f''''(x) = [ -2f(x_{i+5}) + 11f(x_{i+4}) - 24f(x_{i+3}) + 26f(x_{i+2}) - 14f(x_{i+1}) + 3f(x_{i})] / h^4`;
        subFormulaLatex = `f''''(${x}) = [ (${-2*fxip5}) + (${11*fxip4}) - (${24*fxip3}) + (${26*fxip2}) - (${14*fxip1}) + (${3*fxi}) ] / (${(h**4)}) = ${result}`;
        break;
    }
    
    return { result, formulaLatex, subFormulaLatex };
  };

  const backwardCalculate = (x, h) => {
    const fxi = f(x);
    const fxim1 = f(x-(1*h));
    const fxim2 = f(x-(2*h));
    const fxim3 = f(x-(3*h));
    const fxim4 = f(x-(4*h));
    const fxim5 = f(x-(5*h));

    let result, formulaLatex, subFormulaLatex;

    switch (selectedOrder) {
      case "1":
        result = ((3*fxi)-(4*fxim1)+(fxim2))/(2*h);
        formulaLatex = `f'(x) = [ 3f(x_{i}) - 4f(x_{i-1}) + f(x_{i-2}) ] / 2h`;
        subFormulaLatex = `f'(${x}) = [ (${3*fxi}) - (${4*fxim1}) + (${fxim2}) ] / (${2*h}) = ${result}`;
        break;
      case "2":
        result = ((2*fxi)-(5*fxim1)+(4*fxim2)-(fxim3))/(h**2);
        formulaLatex = `f'(x) = [ 2f(x_{i}) - 5f(x_{i-1}) + 4f(x_{i-2}) - f(x_{i-3})] / h^2`;
        subFormulaLatex = `f'(${x}) = [ (${2*fxi}) - (${5*fxim1}) + (${4*fxim2}) - (${fxim3})] / (${h**2}) = ${result}`;
        break;
      case "3":
        result = ((5*fxi)-(18*fxim1)+(24*fxim2)-(14*fxim3)+(3*fxim4))/(2*(h**3));
        formulaLatex = `f'(x) = [ 5f(x_{i}) - 18f(x_{i-1}) + 24f(x_{i-2}) - 14f(x_{i-3}) + 3f(x_{i-4})] / 2h^3`;
        subFormulaLatex = `f'(${x}) = [ (${5*fxi}) - (${18*fxim1}) + (${24*fxim2}) - (${14*fxim3}) + (${3*fxim4})] / (${2*(h**3)}) = ${result}`;
        break;
      case "4":
        result = ((3*fxi)-(14*fxim1)+(26*fxim2)-(24*fxim3)+(11*fxim4)-(2*fxim5))/((h**4));
        formulaLatex = `f'(x) = [ 3f(x_{i}) - 14f(x_{i-1}) + 26f(x_{i-2}) - 24f(x_{i-3}) + 11f(x_{i-4}) - 2f(x_{i-5})] / h^4`;
        subFormulaLatex = `f'(${x}) = [ (${3*fxi}) - (${14*fxim1}) + (${26*fxim2}) - (${24*fxim3}) + (${11*fxim4}) - (${2*fxim5})] / (${(h**4)}) = ${result}`;
        break;
    }

    return { result, formulaLatex, subFormulaLatex };
  };

  const centerCalculate = (x, h) => {
    const fxip4 = f(x+(4*h));
    const fxip3 = f(x+(3*h));
    const fxip2 = f(x+(2*h));
    const fxip1 = f(x+(1*h));
    const fxi = f(x);
    const fxim1 = f(x-(1*h));
    const fxim2 = f(x-(2*h));
    const fxim3 = f(x-(3*h));
    const fxim4 = f(x-(4*h));

    let result, formulaLatex, subFormulaLatex;

    switch (selectedOrder) {
      case "1":
        result = ((-1*fxip2)+(8*fxip1)-(8*fxim1)+(fxim2))/(12*h);
        formulaLatex = `f'(x) = [ -f(x_{i+2}) + 8f(x_{i+1}) - 8f(x_{i-1}) + f(x_{i-2})] / 12h`;
        subFormulaLatex = `f'(${x}) = [ (${-1*fxip2}) + (${8*fxip1}) - (${8*fxim1}) + (${fxim2})] / (${12*h}) = ${result}`;
        break;
      case "2":
        result = ((-1*fxip2)+(16*fxip1)-(30*fxi)+(16*fxim1)-(fxim2))/(12*(h**2));
        formulaLatex = `f'(x) = [ -f(x_{i+2}) + 16f(x_{i+1}) - 30f(x_{i}) + 16f(x_{i-1}) - f(x_{i-2})] / 12h^2`;
        subFormulaLatex = `f'(${x}) = [ (${-1*fxip2}) + (${16*fxip1}) - (${30*fxi}) + (${16*fxim1}) - (${fxim2})] / (${12*(h**2)}) = ${result}`;
        break;
      case "3":
        result = ((-1*fxip3)+(8*fxip2)-(13*fxip1)+(13*fxim1)-(8*fxim2)+(fxim3))/(8*(h**3));
        formulaLatex = `f'(x) = [ -f(x_{i+3}) + 8f(x_{i+2}) - 13f(x_{i+1}) + 13f(x_{i-1}) - 8f(x_{i-2}) + f(x_{i-3})] / 8h^3`;
        subFormulaLatex = `f'(${x}) = [ (${-1*fxip3}) + (${8*fxip2}) - (${13*fxip1}) + (${13*fxim1}) - (${8*fxim2}) + (${fxim3})] / (${8*(h**3)}) = ${result}`;
        break;
      case "4":
        result = ((-1*fxip3)+(12*fxip2)-(39*fxip1)+(56*fxi)-(39*fxim1)+(12*fxim2)-(fxim3))/(6*(h**4));
        formulaLatex = `f'(x) = [ -f(x_{i+3}) + 12f(x_{i+2}) - 39f(x_{i+1}) + 56f(x_{i}) - 39f(x_{i-1}) + 12f(x_{i-2}) - f(x_{i-3})] / 6h^4`;
        subFormulaLatex = `f'(${x}) = [ (${-1*fxip3}) + (${12*fxip2}) - (${39*fxip1}) + (${56*fxi}) - (${39*fxim1}) + (${12*fxim2}) - (${fxim3})] / (${6*(h**4)}) = ${result}`;
        break;
    }

    return { result, formulaLatex, subFormulaLatex };
  };

  const calculateDifferentiation = () => {
    if (!equation || !x || !h) return;

    const xNum = parseFloat(x);
    const hNum = parseFloat(h);
    let titleLatex = '';
    let method;

    // Set title based on order
    titleLatex = ["First", "Second", "Third", "Fourth"][parseInt(selectedOrder) - 1] + " ";

    // Set method and complete title based on direction
    switch (selectedDirection) {
      case "1":
        titleLatex += "Forward Divided-Differences ; O(h^2)";
        method = forwardCalculate;
        break;
      case "2":
        titleLatex += "Backward Divided-Differences ; O(h^2)";
        method = backwardCalculate;
        break;
      case "3":
        titleLatex += "Central Divided-Differences ; O(h^4)";
        method = centerCalculate;
        break;
    }

    const { result, formulaLatex, subFormulaLatex } = method(xNum, hNum);
    
    // Calculate exact derivatives
    let diffEquation = equation;
    let exactDiffLatex = `Exact\\ Differentiation\\ of\\ f(x) = ${equation}\\\\`;
    let symbol = "'";
    
    for (let i = 1; i <= parseInt(selectedOrder); i++) {
      diffEquation = derivative(diffEquation, 'x').toString();
      exactDiffLatex += `f${symbol}(x) = ${diffEquation}\\\\`;
      symbol += "'";
    }

    const exactValue = evaluate(diffEquation, { x: xNum });
    exactDiffLatex += `At\\ x = ${xNum}\\ ;\\ f${symbol}(${xNum}) = ${exactValue}\\\\`;

    const error = Math.abs((result - exactValue) / exactValue) * 100;
    const errorLatex = `\\displaystyle e = \\left|\\frac{f${symbol}(x)_{numerical} - f${symbol}(x)_{true}}{f${symbol}(x)_{true}}\\right| \\times 100\\% = ${error.toFixed(4)}\\%`;

    const solutionLatex = `
      ${titleLatex}\\\\
      ${formulaLatex}\\\\
      ${subFormulaLatex}\\\\
      ${exactDiffLatex}\\\\
      ${errorLatex}
    `;

    setSolution(katex.renderToString(solutionLatex, {
      displayMode: true,
      throwOnError: false,
    }));
    setResult(result);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Accurate Numerical Differentiation</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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

            <div className="space-y-2">
              <Label>Input Equation f(x)</Label>
              <Input
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="e.g., x^2"
              />
            </div>

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

        <div className="md:col-span-2">
          <SolutionDisplay solution={solution} />
        </div>
      </div>
    </div>
  );
};

export default AccurateNumericalDifferentiation;

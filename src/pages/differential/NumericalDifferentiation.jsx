import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { evaluate, derivative } from 'mathjs';
import katex from 'katex';
import 'katex/dist/katex.min.css';

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

  const forwardCalculate = (x, h) => {
    let fxip1 = f(x + h);
    let fxi = f(x);
    return (fxip1 - fxi) / h;
  };

  const backwardCalculate = (x, h) => {
    let fxi = f(x);
    let fxim1 = f(x - h);
    return (fxi - fxim1) / h;
  };

  const centerCalculate = (x, h) => {
    let fxip1 = f(x + h);
    let fxim1 = f(x - h);
    return (fxip1 - fxim1) / (2 * h);
  };

  const calculateDifferentiation = () => {
    const xNum = parseFloat(x);
    const hNum = parseFloat(h);
    let calculatedResult;
    let solutionLatex = '';

    try {
      switch (selectedDirection) {
        case "1": // Forward
          calculatedResult = forwardCalculate(xNum, hNum);
          break;
        case "2": // Backward
          calculatedResult = backwardCalculate(xNum, hNum);
          break;
        case "3": // Central
          calculatedResult = centerCalculate(xNum, hNum);
          break;
      }

      // Calculate exact derivative for comparison
      let diffEquation = equation;
      for (let i = 0; i < parseInt(selectedOrder); i++) {
        diffEquation = derivative(diffEquation, 'x').toString();
      }
      const exactResult = evaluate(diffEquation, { x: xNum });
      const error = Math.abs((calculatedResult - exactResult) / exactResult) * 100;

      const orderText = ["First", "Second", "Third", "Fourth"][parseInt(selectedOrder) - 1];
      const directionText = ["Forward", "Backward", "Central"][parseInt(selectedDirection) - 1];

      solutionLatex = `${orderText} ${directionText} Divided-Differences ; O(h${selectedDirection === "3" ? "^2" : ""})
        \\[${calculatedResult}\\]
        \\text{Exact Differentiation of } f(x) = ${equation}
        \\[f^{(${selectedOrder})}(x) = ${diffEquation}\\]
        \\text{At } x = ${xNum} \\text{ ; } f^{(${selectedOrder})}(${xNum}) = ${exactResult}
        \\[\\text{error} = \\left|\\frac{f^{(${selectedOrder})}(x)_{numerical} - f^{(${selectedOrder})}(x)_{true}}{f^{(${selectedOrder})}(x)_{true}}\\right| \\times 100\\% = ${error.toFixed(4)}\\%\\]`;

      setResult(calculatedResult);
      setSolution(katex.renderToString(solutionLatex, { displayMode: true }));
    } catch (error) {
      console.error('Calculation error:', error);
    }
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
            <div dangerouslySetInnerHTML={{ __html: solution }} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NumericalDifferentiation;

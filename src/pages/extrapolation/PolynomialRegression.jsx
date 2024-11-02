import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PolynomialRegressionTable } from './components/PolynomialRegressionTable';
import { calculatePolynomialRegression, generateMatrixEquation } from './components/PolynomialRegressionCalculation';
import Plot from 'react-plotly.js';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const PolynomialRegression = () => {
  const [findX, setFindX] = useState(4.5);
  const [order, setOrder] = useState(2);
  const [pointsAmount, setPointsAmount] = useState(5);
  const [points, setPoints] = useState([]);
  const [result, setResult] = useState(null);
  const [equations, setEquations] = useState({
    matrix: '',
    substituted: '',
    regression: '',
    final: ''
  });

  useEffect(() => {
    setPoints(Array(pointsAmount).fill().map(() => ({ x: 0, fx: 0 })));
  }, [pointsAmount]);

  const handlePointChange = (index, field, value) => {
    const newPoints = [...points];
    newPoints[index] = { ...newPoints[index], [field]: value };
    setPoints(newPoints);
  };

  const handleCalculate = () => {
    if (points.length < 2) {
      alert("Please enter at least two points");
      return;
    }

    const { A, B, coefficients, result, equation } = calculatePolynomialRegression(points, findX, order);
    const matrixEq = generateMatrixEquation(order);
    const substitutedEq = generateSubstitutedMatrix(A, B, order);
    const regressionEq = `f(x) = ${equation}`;
    const finalEq = `f(${findX}) = ${result.toFixed(4)}`;

    setEquations({
      matrix: katex.renderToString(matrixEq),
      substituted: katex.renderToString(substitutedEq),
      regression: katex.renderToString(regressionEq),
      final: katex.renderToString(finalEq)
    });
    setResult(result);
  };

  const generateSubstitutedMatrix = (A, B, order) => {
    let eq = '\\begin{bmatrix}';
    
    for (let i = 0; i <= order; i++) {
      for (let j = 0; j <= order; j++) {
        eq += A[i][j].toFixed(4);
        if (j < order) eq += ' & ';
      }
      eq += '\\\\';
    }
    eq += '\\end{bmatrix}';

    eq += '\\begin{bmatrix}';
    for (let i = 0; i <= order; i++) {
      eq += `a_{${i}}\\\\`;
    }
    eq += '\\end{bmatrix}=';

    eq += '\\begin{bmatrix}';
    for (let i = 0; i <= order; i++) {
      eq += B[i].toFixed(4) + '\\\\';
    }
    eq += '\\end{bmatrix}';

    return eq;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Polynomial Regression</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label>Find f(x) where x is:</Label>
                <Input
                  type="number"
                  value={findX}
                  onChange={(e) => setFindX(parseFloat(e.target.value))}
                />
              </div>

              <div>
                <Label>Order (m)</Label>
                <Input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(parseInt(e.target.value) || 2)}
                  min="1"
                />
              </div>

              <div>
                <Label>Points Amount</Label>
                <Input
                  type="number"
                  value={pointsAmount}
                  onChange={(e) => setPointsAmount(parseInt(e.target.value) || 2)}
                  min="2"
                />
              </div>
            </div>

            <PolynomialRegressionTable
              points={points}
              onPointChange={handlePointChange}
            />

            <Button onClick={handleCalculate} className="w-full">
              Calculate
            </Button>

            {result !== null && (
              <div className="text-center font-semibold">
                Result: {result.toFixed(4)}
              </div>
            )}
          </CardContent>
        </Card>

        {result !== null && (
          <Card>
            <CardHeader>
              <CardTitle>Solution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 text-center">
                <div dangerouslySetInnerHTML={{ __html: equations.matrix }} />
                <div dangerouslySetInnerHTML={{ __html: equations.substituted }} />
                <div dangerouslySetInnerHTML={{ __html: equations.regression }} />
                <div dangerouslySetInnerHTML={{ __html: equations.final }} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PolynomialRegression;
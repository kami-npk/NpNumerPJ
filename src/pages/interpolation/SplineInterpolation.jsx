import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import katex from 'katex';
import 'katex/dist/katex.min.css';

const SplineInterpolation = () => {
  const [findX, setFindX] = useState(4.5);
  const [pointsAmount, setPointsAmount] = useState(5);
  const [selectedPolynomial, setSelectedPolynomial] = useState("1");
  const [points, setPoints] = useState([]);
  const [result, setResult] = useState(null);
  const [splineEquation, setSplineEquation] = useState("");
  const [answerEquation, setAnswerEquation] = useState("");

  const handlePointChange = (index, field, value) => {
    const newPoints = [...points];
    if (!newPoints[index]) {
      newPoints[index] = { x: 0, fx: 0 };
    }
    newPoints[index][field] = parseFloat(value) || 0;
    setPoints(newPoints);
  };

  const calculateSpline = () => {
    if (points.length < 2) {
      alert("Please enter at least two points");
      return;
    }

    const xValues = points.map(p => p.x);
    const fValues = points.map(p => p.fx);
    let interpolatedValue;
    let equation = "";
    let answerEq = "";

    // Linear Spline calculation
    if (selectedPolynomial === "1") {
      for (let i = 1; i < points.length; i++) {
        const x0 = xValues[i - 1];
        const x1 = xValues[i];
        const f0 = fValues[i - 1];
        const f1 = fValues[i];
        const slope = (f1 - f0) / (x1 - x0);
        
        equation += `f_{${i}}(x) = ${f0} + (${slope})(x - ${x0}); \\ ${x0} \\leq x \\leq ${x1} \\\\ `;

        if (x0 <= findX && findX <= x1) {
          interpolatedValue = f0 + (findX - x0) * slope;
          answerEq = `f(${findX}) = ${interpolatedValue}`;
        }
      }
    }
    // Add Quadratic and Cubic spline calculations here
    // Quadratic Spline calculation
    else if (selectedPolynomial === "2") {
      // Implement Quadratic Spline logic here
    }
    // Cubic Spline calculation
    else if (selectedPolynomial === "3") {
      // Implement Cubic Spline logic here
    }

    const renderedEquation = katex.renderToString(equation, { throwOnError: false });
    const renderedAnswer = katex.renderToString(answerEq, { throwOnError: false });

    setSplineEquation(renderedEquation);
    setAnswerEquation(renderedAnswer);
    setResult(interpolatedValue);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Spline Interpolation</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-left block">Find f(x) where x is:</Label>
                <Input
                  type="number"
                  value={findX}
                  onChange={(e) => setFindX(parseFloat(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-left block">Select Solution:</Label>
                <Select value={selectedPolynomial} onValueChange={setSelectedPolynomial}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select spline type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Linear</SelectItem>
                    <SelectItem value="2">Quadratic</SelectItem>
                    <SelectItem value="3">Cubic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-left block">Points Amount:</Label>
                <Input
                  type="number"
                  value={pointsAmount}
                  onChange={(e) => {
                    const amount = parseInt(e.target.value);
                    setPointsAmount(amount);
                    setPoints(Array(amount).fill().map(() => ({ x: 0, fx: 0 })));
                  }}
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Point</TableHead>
                    <TableHead>x</TableHead>
                    <TableHead>f(x)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array(pointsAmount).fill().map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={points[i]?.x || 0}
                          onChange={(e) => handlePointChange(i, 'x', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={points[i]?.fx || 0}
                          onChange={(e) => handlePointChange(i, 'fx', e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button onClick={calculateSpline} className="w-full">
                Calculate
              </Button>
            </div>
          </CardContent>
        </Card>

        {result !== null && (
          <Card>
            <CardHeader>
              <CardTitle>Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>i</TableHead>
                      <TableHead>xi</TableHead>
                      <TableHead>f(xi)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {points.map((point, i) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{point.x}</TableCell>
                        <TableCell>{point.fx}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Spline Equation</h3>
                  <div dangerouslySetInnerHTML={{ __html: splineEquation }} />
                </div>

                <div className="text-center">
                  <div dangerouslySetInnerHTML={{ __html: answerEquation }} />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SplineInterpolation;

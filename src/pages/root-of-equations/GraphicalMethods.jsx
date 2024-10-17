import React, { useState } from 'react';
import { evaluate, log, floor, pow, abs } from 'mathjs';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const GraphicalMethods = () => {
  const [equation, setEquation] = useState("");
  const [xStart, setXStart] = useState("");
  const [xEnd, setXEnd] = useState("");
  const [result, setResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const calculateStep = (xStart, xEnd) => {
    const step = log(xEnd - xStart, 10);
    return step % 1 === 0 ? Number(pow(10, step - 1)) : Number(pow(10, floor(step)));
  };

  const calculateRoot = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    const xStartNum = parseFloat(xStart);
    const xEndNum = parseFloat(xEnd);
    const error = 0.000001;
    
    let temp, newTemp, x, step;
    let iter = 0;
    const MAX_ITER = 1000;
    let iterationsData = [];

    step = calculateStep(xStartNum, xEndNum);
    x = xStartNum;

    try {
      temp = evaluate(equation, { x: xStartNum });
    } catch (error) {
      setErrorMessage("Invalid equation");
      console.error("Invalid equation");
      return;
    }

    while (iter < MAX_ITER) {
      iter++;

      newTemp = evaluate(equation, { x });

      iterationsData.push({
        iteration: iter,
        x: x,
        fx: newTemp,
        error: abs(newTemp)
      });

      if (abs(newTemp) < error) {
        setResult(x);
        break;
      }

      if (temp * newTemp < 0) {
        x -= step;
        step /= 10;
        newTemp = evaluate(equation, { x });
      }

      x += step;
      if (x > xEndNum) x = xEndNum;

      temp = newTemp;
    }

    setIterations(iterationsData);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Graphical Method</h1>
      <Card className="bg-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Input</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={calculateRoot} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="equation" className="text-white">Equation f(x)</Label>
              <Input
                id="equation"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="Enter equation (e.g., x^2 - 4)"
                className="bg-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xStart" className="text-white">XL</Label>
              <Input
                id="xStart"
                type="number"
                value={xStart}
                onChange={(e) => setXStart(e.target.value)}
                placeholder="Enter X start"
                className="bg-gray-700 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xEnd" className="text-white">XR</Label>
              <Input
                id="xEnd"
                type="number"
                value={xEnd}
                onChange={(e) => setXEnd(e.target.value)}
                placeholder="Enter X end"
                className="bg-gray-700 text-white"
                required
              />
            </div>
            <Button type="submit" className="w-full">Solve</Button>
          </form>
        </CardContent>
      </Card>

      {errorMessage && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {result !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Root approximation: {result.toPrecision(7)}</p>
          </CardContent>
        </Card>
      )}

      {iterations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Equation Graph</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={iterations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="fx" name="f(x)" stroke="#8884d8" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {iterations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Error Graph</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={iterations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="iteration" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="error" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {iterations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Iteration Table</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Iteration</TableHead>
                  <TableHead>X</TableHead>
                  <TableHead>f(X)</TableHead>
                  <TableHead>Error</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {iterations.map((iter, index) => (
                  <TableRow key={index}>
                    <TableCell>{iter.iteration}</TableCell>
                    <TableCell>{iter.x.toPrecision(6)}</TableCell>
                    <TableCell>{iter.fx.toPrecision(6)}</TableCell>
                    <TableCell>{iter.error.toPrecision(6)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GraphicalMethods;

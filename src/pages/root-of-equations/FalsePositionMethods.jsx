import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const FalsePositionMethods = () => {
  const [equation, setEquation] = useState("x^2 - 4");
  const [xl, setXL] = useState("");
  const [xr, setXR] = useState("");
  const [result, setResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

  const calculateFalsePosition = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setShowResults(false);
    const xlNum = parseFloat(xl);
    const xrNum = parseFloat(xr);
    let xm, fXm, fXr, fXl, ea;
    let iter = 0;
    const MAX_ITER = 50;
    const EPSILON = 0.000001;
    const newIterations = [];

    try {
      do {
        fXl = evaluate(equation, { x: xlNum });
        fXr = evaluate(equation, { x: xrNum });
        xm = ((xlNum * fXr) - (xrNum * fXl)) / (fXr - fXl);
        fXm = evaluate(equation, { x: xm });

        iter++;
        if (fXm * fXr > 0) {
          ea = error(xrNum, xm);
          newIterations.push({ iteration: iter, xl: xlNum, xm, xr: xrNum, error: ea });
          xrNum = xm;
        } else if (fXm * fXr < 0) {
          ea = error(xlNum, xm);
          newIterations.push({ iteration: iter, xl: xlNum, xm, xr: xrNum, error: ea });
          xlNum = xm;
        }
      } while (ea > EPSILON && iter < MAX_ITER);

      setResult(xm);
      setIterations(newIterations);
      setShowResults(true);
    } catch (error) {
      setErrorMessage("Error in calculation. Please check your inputs and equation.");
      console.error("Calculation error:", error);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>False-position Method</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={calculateFalsePosition} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="equation">Equation f(x)</Label>
              <Input
                id="equation"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="e.g., x^2 - 4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xl">XL</Label>
              <Input
                id="xl"
                type="number"
                value={xl}
                onChange={(e) => setXL(e.target.value)}
                placeholder="Enter XL"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xr">XR</Label>
              <Input
                id="xr"
                type="number"
                value={xr}
                onChange={(e) => setXR(e.target.value)}
                placeholder="Enter XR"
                required
              />
            </div>
            <Button type="submit">Solve</Button>
          </form>
        </CardContent>
      </Card>

      {errorMessage && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {showResults && result !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Root approximation: {result.toPrecision(7)}</p>
          </CardContent>
        </Card>
      )}

      {showResults && iterations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Equation Graph</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={iterations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="iteration" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="xm" name="XM" stroke="#8884d8" />
                <Line type="monotone" dataKey="xl" name="XL" stroke="#82ca9d" />
                <Line type="monotone" dataKey="xr" name="XR" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {showResults && iterations.length > 0 && (
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

      {showResults && iterations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Iteration Table</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Iteration</TableHead>
                  <TableHead>XL</TableHead>
                  <TableHead>XM</TableHead>
                  <TableHead>XR</TableHead>
                  <TableHead>Error (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {iterations.map((iter, index) => (
                  <TableRow key={index}>
                    <TableCell>{iter.iteration}</TableCell>
                    <TableCell>{iter.xl.toPrecision(7)}</TableCell>
                    <TableCell>{iter.xm.toPrecision(7)}</TableCell>
                    <TableCell>{iter.xr.toPrecision(7)}</TableCell>
                    <TableCell>{iter.error.toPrecision(7)}</TableCell>
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

export default FalsePositionMethods;
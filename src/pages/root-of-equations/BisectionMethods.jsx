import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BisectionMethods = () => {
  const [equation, setEquation] = useState("x^2 - 4");
  const [xl, setXL] = useState("0");
  const [xr, setXR] = useState("3");
  const [result, setResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [errorData, setErrorData] = useState([]);

  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

  const calculateBisection = (e) => {
    e.preventDefault();
    let xm, fXm, fXr, ea;
    let iter = 0;
    const MAX_ITER = 50;
    const EPSILON = 0.000001;
    const newIterations = [];
    const newErrorData = [];
    let xlNum = parseFloat(xl);
    let xrNum = parseFloat(xr);

    do {
      xm = (xlNum + xrNum) / 2.0;
      fXr = evaluate(equation, { x: xrNum });
      fXm = evaluate(equation, { x: xm });

      iter++;
      if (fXm * fXr > 0) {
        ea = error(xrNum, xm);
        newIterations.push({ iteration: iter, xl: xlNum, xm, xr: xrNum, error: ea });
        newErrorData.push({ iteration: iter, error: ea });
        xrNum = xm;
      } else if (fXm * fXr < 0) {
        ea = error(xlNum, xm);
        newIterations.push({ iteration: iter, xl: xlNum, xm, xr: xrNum, error: ea });
        newErrorData.push({ iteration: iter, error: ea });
        xlNum = xm;
      }
    } while (ea > EPSILON && iter < MAX_ITER);

    setResult(xm);
    setIterations(newIterations);
    setErrorData(newErrorData);

    // Generate equation graph data
    const graphData = [];
    const step = (parseFloat(xr) - parseFloat(xl)) / 100;
    for (let x = parseFloat(xl); x <= parseFloat(xr); x += step) {
      graphData.push({
        x: x,
        y: evaluate(equation, { x: x })
      });
    }
    setGraphData(graphData);
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Bisection Method</h1>
      <Card className="bg-discord-dark-secondary">
        <CardHeader>
          <CardTitle className="text-white">Input</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={calculateBisection} className="space-y-4">
            <div>
              <Label htmlFor="equation" className="text-white">Equation f(x)</Label>
              <Input
                id="equation"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="e.g., x^2 - 4"
                className="bg-discord-dark-tertiary text-white"
              />
            </div>
            <div>
              <Label htmlFor="xl" className="text-white">XL</Label>
              <Input
                id="xl"
                type="number"
                value={xl}
                onChange={(e) => setXL(e.target.value)}
                placeholder="e.g., 0"
                className="bg-discord-dark-tertiary text-white"
              />
            </div>
            <div>
              <Label htmlFor="xr" className="text-white">XR</Label>
              <Input
                id="xr"
                type="number"
                value={xr}
                onChange={(e) => setXR(e.target.value)}
                placeholder="e.g., 3"
                className="bg-discord-dark-tertiary text-white"
              />
            </div>
            <Button type="submit" className="bg-discord-brand hover:bg-discord-brand-hover">Solve</Button>
          </form>
        </CardContent>
      </Card>

      {result !== null && (
        <Card className="mt-6 bg-discord-dark-secondary">
          <CardHeader>
            <CardTitle className="text-white">Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white">Root approximation: {result.toPrecision(7)}</p>
          </CardContent>
        </Card>
      )}

      {graphData.length > 0 && (
        <Card className="mt-6 bg-discord-dark-secondary">
          <CardHeader>
            <CardTitle className="text-white">Equation Graph</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {errorData.length > 0 && (
        <Card className="mt-6 bg-discord-dark-secondary">
          <CardHeader>
            <CardTitle className="text-white">Error Graph</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={errorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="iteration" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="error" stroke="#82ca9d" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {iterations.length > 0 && (
        <Card className="mt-6 bg-discord-dark-secondary">
          <CardHeader>
            <CardTitle className="text-white">Iterations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Iteration</TableHead>
                  <TableHead className="text-white">XL</TableHead>
                  <TableHead className="text-white">XM</TableHead>
                  <TableHead className="text-white">XR</TableHead>
                  <TableHead className="text-white">Error (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {iterations.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-white">{row.iteration}</TableCell>
                    <TableCell className="text-white">{row.xl.toPrecision(7)}</TableCell>
                    <TableCell className="text-white">{row.xm.toPrecision(7)}</TableCell>
                    <TableCell className="text-white">{row.xr.toPrecision(7)}</TableCell>
                    <TableCell className="text-white">{row.error.toPrecision(7)}</TableCell>
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

export default BisectionMethods;
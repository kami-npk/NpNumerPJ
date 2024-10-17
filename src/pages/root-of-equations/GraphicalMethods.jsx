import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraphicalMethods = () => {
  const [equation, setEquation] = useState("x^2 - 4");
  const [xl, setXL] = useState("0");
  const [xr, setXR] = useState("3");
  const [result, setResult] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [iterations, setIterations] = useState([]);
  const [errorData, setErrorData] = useState([]);

  const calculateRoot = (e) => {
    e.preventDefault();
    const data = [];
    const iterData = [];
    const errData = [];
    let x = parseFloat(xl);
    const xrNum = parseFloat(xr);
    const step = (xrNum - x) / 100;
    let prevY = evaluate(equation.replace(/−/g, '-'), { x });
    let iteration = 0;

    while (x <= xrNum) {
      const y = evaluate(equation.replace(/−/g, '-'), { x });
      data.push({ x, y });

      if (prevY * y < 0) {
        const xm = (x + (x - step)) / 2;
        const ym = evaluate(equation.replace(/−/g, '-'), { x: xm });
        const error = Math.abs((xm - (x - step)) / xm) * 100;

        iterData.push({ iteration: ++iteration, x: xm, y: ym, error });
        errData.push({ iteration, error });

        if (Math.abs(ym) < 0.0001) {
          setResult(xm);
          break;
        }
      }

      prevY = y;
      x += step;
    }

    setGraphData(data);
    setIterations(iterData);
    setErrorData(errData);
    if (!result) setResult((parseFloat(xl) + parseFloat(xr)) / 2);
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Graphical Method</h1>
      <Card className="bg-discord-dark-secondary">
        <CardHeader>
          <CardTitle className="text-white">Input</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={calculateRoot} className="space-y-4">
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
            <CardTitle className="text-white">Iteration Table</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Iteration</TableHead>
                  <TableHead className="text-white">X</TableHead>
                  <TableHead className="text-white">Y</TableHead>
                  <TableHead className="text-white">Error (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {iterations.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-white">{row.iteration}</TableCell>
                    <TableCell className="text-white">{row.x.toPrecision(7)}</TableCell>
                    <TableCell className="text-white">{row.y.toPrecision(7)}</TableCell>
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

export default GraphicalMethods;

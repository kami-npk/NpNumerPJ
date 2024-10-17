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
  const [iterationData, setIterationData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [errorData, setErrorData] = useState([]);

  const calculateRoot = (e) => {
    e.preventDefault();
    const xlNum = parseFloat(xl);
    const xrNum = parseFloat(xr);
    const step = 0.01;
    const newIterationData = [];
    const newGraphData = [];
    const newErrorData = [];
    let root = null;

    for (let x = xlNum; x <= xrNum; x += step) {
      const y = evaluate(equation.replace(/−/g, '-'), { x });
      newGraphData.push({ x, y });

      if (Math.abs(y) < 0.001 && root === null) {
        root = x;
      }

      if (newIterationData.length > 0) {
        const prevY = newIterationData[newIterationData.length - 1].y;
        if (y * prevY < 0) {
          const xm = (x + newIterationData[newIterationData.length - 1].x) / 2;
          const ym = evaluate(equation.replace(/−/g, '-'), { x: xm });
          const error = Math.abs((xm - x) / xm) * 100;
          newIterationData.push({ iteration: newIterationData.length + 1, x: xm, y: ym, error });
          newErrorData.push({ iteration: newIterationData.length, error });
        }
      }

      newIterationData.push({ iteration: newIterationData.length + 1, x, y, error: 0 });
    }

    setResult(root);
    setIterationData(newIterationData);
    setGraphData(newGraphData);
    setErrorData(newErrorData);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Graphical Method</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={calculateRoot} className="space-y-4">
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
              <Label htmlFor="xl">X Left (XL)</Label>
              <Input
                id="xl"
                type="number"
                value={xl}
                onChange={(e) => setXL(e.target.value)}
                placeholder="e.g., 0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xr">X Right (XR)</Label>
              <Input
                id="xr"
                type="number"
                value={xr}
                onChange={(e) => setXR(e.target.value)}
                placeholder="e.g., 3"
                required
              />
            </div>
            <Button type="submit">Calculate</Button>
          </form>
        </CardContent>
      </Card>

      {result !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Root approximation: {result.toPrecision(6)}</p>
          </CardContent>
        </Card>
      )}

      {graphData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Equation Graph</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {errorData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Error Graph</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={errorData}>
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

      {iterationData.length > 0 && (
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
                  <TableHead>Y</TableHead>
                  <TableHead>Error (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {iterationData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.iteration}</TableCell>
                    <TableCell>{row.x.toPrecision(6)}</TableCell>
                    <TableCell>{row.y.toPrecision(6)}</TableCell>
                    <TableCell>{row.error.toPrecision(6)}</TableCell>
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
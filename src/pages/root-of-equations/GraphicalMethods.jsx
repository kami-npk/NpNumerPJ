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

  const calculateRoot = (e) => {
    e.preventDefault();
    const data = [];
    for (let x = parseFloat(xl); x <= parseFloat(xr); x += 0.1) {
      data.push({
        x: x,
        y: evaluate(equation, { x: x })
      });
    }
    setGraphData(data);
    const fStart = evaluate(equation, { x: parseFloat(xl) });
    const fEnd = evaluate(equation, { x: parseFloat(xr) });
    if (fStart * fEnd < 0) {
      setResult((xl + xr) / 2);
    } else {
      setResult(null);
    }
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
    </div>
  );
};

export default GraphicalMethods;

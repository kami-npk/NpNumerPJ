import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const GraphicalMethod = () => {
  const [method, setMethod] = useState('');
  const [equation, setEquation] = useState('');
  const [xl, setXl] = useState('');
  const [xr, setXr] = useState('');
  const [precision, setPrecision] = useState('');
  const [result, setResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [errorData, setErrorData] = useState([]);

  const calculateRoot = (method, equation, xl, xr, precision) => {
    let iterations = [];
    let errorData = [];
    let root = 0;

    // Placeholder calculation logic
    const maxIterations = 10;
    for (let i = 0; i < maxIterations; i++) {
      const x = (parseFloat(xl) + parseFloat(xr)) / 2;
      const error = Math.abs(x - root);
      root = x;

      iterations.push({ iteration: i + 1, xl, xr, x, error });
      errorData.push({ iteration: i + 1, error });

      // Update xl or xr based on the method (this is a simplified example)
      if (i % 2 === 0) {
        xl = x;
      } else {
        xr = x;
      }
    }

    return { root, iterations, errorData };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { root, iterations, errorData } = calculateRoot(method, equation, xl, xr, precision);
    setResult(`Calculated root using ${method} method: ${root}`);
    setIterations(iterations);
    setErrorData(errorData);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-discord-dark-primary">
      <h1 className="text-3xl font-bold text-center mb-6 text-discord-interactive-active">Numerical Methods Calculator</h1>
      <Card className="bg-discord-dark-secondary border-discord-dark-tertiary mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-discord-interactive-active">Root Finding Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="method" className="text-discord-text-normal">Method</Label>
              <Select onValueChange={setMethod} required>
                <SelectTrigger id="method">
                  <SelectValue placeholder="Select a method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="graphical">Graphical Method</SelectItem>
                  <SelectItem value="bisection">Bisection Search</SelectItem>
                  <SelectItem value="falsePosition">False Position Method</SelectItem>
                  <SelectItem value="onePoint">One-point Iteration Method</SelectItem>
                  <SelectItem value="newtonRaphson">Newton-Raphson Method</SelectItem>
                  <SelectItem value="secant">Secant Method</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="equation" className="text-discord-text-normal">Equation (e.g., x^2 - 4)</Label>
              <Input id="equation" value={equation} onChange={(e) => setEquation(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xl" className="text-discord-text-normal">X Left (XL)</Label>
              <Input id="xl" type="number" value={xl} onChange={(e) => setXl(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xr" className="text-discord-text-normal">X Right (XR)</Label>
              <Input id="xr" type="number" value={xr} onChange={(e) => setXr(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="precision" className="text-discord-text-normal">Precision</Label>
              <Input id="precision" type="number" value={precision} onChange={(e) => setPrecision(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full bg-discord-brand hover:bg-discord-brand-hover">Calculate</Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <>
          <Card className="bg-discord-dark-secondary border-discord-dark-tertiary mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-discord-interactive-active">Result</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-discord-text-normal">{result}</p>
            </CardContent>
          </Card>

          <Card className="bg-discord-dark-secondary border-discord-dark-tertiary mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-discord-interactive-active">Iteration Table</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Iteration</TableHead>
                    <TableHead>XL</TableHead>
                    <TableHead>XR</TableHead>
                    <TableHead>X</TableHead>
                    <TableHead>Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {iterations.map((iter) => (
                    <TableRow key={iter.iteration}>
                      <TableCell>{iter.iteration}</TableCell>
                      <TableCell>{iter.xl}</TableCell>
                      <TableCell>{iter.xr}</TableCell>
                      <TableCell>{iter.x}</TableCell>
                      <TableCell>{iter.error}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-discord-dark-secondary border-discord-dark-tertiary">
            <CardHeader>
              <CardTitle className="text-2xl text-discord-interactive-active">Error Graph</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                width={600}
                height={300}
                data={errorData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="iteration" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="error" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default GraphicalMethod;
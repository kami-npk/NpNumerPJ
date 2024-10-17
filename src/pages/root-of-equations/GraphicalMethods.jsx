import React, { useState } from "react";
import { evaluate, log, floor, pow, abs } from 'mathjs';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraphicalMethods = () => {
  const [equation, setEquation] = useState("");
  const [x, setX] = useState(0);
  const [xStart, setXStart] = useState(0);
  const [xEnd, setXEnd] = useState(0);
  const [error, setError] = useState(0.000001);
  const [iterations, setIterations] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const calculateStep = (xStart, xEnd) => {
    const step = log(xEnd - xStart, 10);
    if (step % 1 === 0) return Number(pow(10, step - 1));
    return Number(pow(10, floor(step)));
  };

  const calculateRoot = () => {
    setErrorMessage(null);
    const xStartNum = parseFloat(xStart);
    const xEndNum = parseFloat(xEnd);
    const errorNum = parseFloat(error);
    calGraphical(xStartNum, xEndNum, errorNum);
  };

  const calGraphical = (xStart, xEnd, error) => {
    let temp, newTemp, x, step;
    let iter = 0;
    const MAX_ITER = 1000;
    let iterationsData = [];

    step = calculateStep(xStart, xEnd);
    x = xStart;

    try {
      temp = evaluate(equation, { x: xStart });
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
        f_x: newTemp,
        e_r: abs(newTemp)
      });

      if (abs(newTemp) < error) {
        setX(x);
        break;
      }

      if (temp * newTemp < 0) {
        x -= step;
        step /= 10;
        newTemp = evaluate(equation, { x });
      }

      x += step;
      if (x > xEnd) x = xEnd;

      temp = newTemp;
    }

    setIterations(iterationsData);
  };

  const chartData = {
    labels: iterations.map((iter) => `Iter ${iter.iteration}`),
    datasets: [
      {
        label: 'f(x)',
        data: iterations.map((iter) => iter.f_x),
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
      {
        label: 'Error',
        data: iterations.map((iter) => iter.e_r),
        borderColor: 'rgba(255,99,132,1)',
        tension: 0.1,
      }
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Graphical Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="Enter equation (f(x))"
            />
            <Input
              type="number"
              onChange={(e) => setXStart(e.target.value)}
              placeholder="Input Xstart"
            />
            <Input
              type="number"
              onChange={(e) => setXEnd(e.target.value)}
              placeholder="Input Xend"
            />
            <Button onClick={calculateRoot}>Calculate</Button>
          </div>

          {errorMessage && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <h3 className="mt-4 text-xl font-semibold">Answer: {x.toPrecision(7)}</h3>

          {iterations.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Iterations:</h4>
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
                      <TableCell>{iter.x.toFixed(6)}</TableCell>
                      <TableCell>{iter.f_x.toFixed(6)}</TableCell>
                      <TableCell>{iter.e_r.toFixed(6)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {iterations.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Graph:</h4>
              <Line data={chartData} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphicalMethods;
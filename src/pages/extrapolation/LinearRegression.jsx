import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Plot from 'react-plotly.js';
import { evaluate, lusolve } from 'mathjs';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const LinearRegression = () => {
  const [findX, setFindX] = useState(4.5);
  const [pointsAmount, setPointsAmount] = useState(5);
  const [points, setPoints] = useState([]);
  const [result, setResult] = useState(null);
  const [equation, setEquation] = useState("");
  const [matrixEquation, setMatrixEquation] = useState("");
  const [matrixSubstitute, setMatrixSubstitute] = useState("");
  const [regressionFunction, setRegressionFunction] = useState("");
  const [slope, setSlope] = useState(null);
  const [intercept, setIntercept] = useState(null);

  const handlePointChange = (index, field, value) => {
    const newPoints = [...points];
    if (!newPoints[index]) {
      newPoints[index] = { x: 0, y: 0 };
    }
    newPoints[index][field] = parseFloat(value) || 0;
    setPoints(newPoints);
  };

  const calculateRegression = () => {
    if (points.length < 2) {
      alert("Please enter at least two points");
      return;
    }

    const n = points.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    points.forEach(point => {
      sumX += point.x;
      sumY += point.y;
      sumXY += point.x * point.y;
      sumX2 += point.x * point.x;
    });

    const A = [[n, sumX], [sumX, sumX2]];
    const B = [sumY, sumXY];
    
    const solution = lusolve(A, B);
    const intercept = Number(solution[0]);
    const slope = Number(solution[1]);
    
    setIntercept(intercept);
    setSlope(slope);
    setEquation(`${intercept} + ${slope}x`);
    
    const result = slope * findX + intercept;
    setResult(result);

    // Generate LaTeX equations
    const matrixLatex = `\\begin{bmatrix} n & \\sum x_i \\\\ \\sum x_i & \\sum x_i^2 \\end{bmatrix} \\begin{bmatrix} a_0 \\\\ a_1 \\end{bmatrix} = \\begin{bmatrix} \\sum y_i \\\\ \\sum x_iy_i \\end{bmatrix}`;
    const matrixSubLatex = `\\begin{bmatrix} ${n} & ${sumX} \\\\ ${sumX} & ${sumX2} \\end{bmatrix} \\begin{bmatrix} a_0 \\\\ a_1 \\end{bmatrix} = \\begin{bmatrix} ${sumY} \\\\ ${sumXY} \\end{bmatrix}`;
    const functionLatex = `f(x) = ${intercept.toFixed(4)} + ${slope.toFixed(4)}x`;

    setMatrixEquation(katex.renderToString(matrixLatex));
    setMatrixSubstitute(katex.renderToString(matrixSubLatex));
    setRegressionFunction(katex.renderToString(functionLatex));
  };

  const renderGraph = () => {
    if (!slope || !intercept) return null;

    const xValues = points.map(p => p.x);
    const xMin = Math.min(...xValues) - 2;
    const xMax = Math.max(...xValues) + 2;
    const lineX = Array.from({ length: 100 }, (_, i) => xMin + (i * (xMax - xMin) / 99));
    const lineY = lineX.map(x => slope * x + intercept);

    return (
      <Plot
        data={[
          {
            x: lineX,
            y: lineY,
            type: 'scatter',
            mode: 'lines',
            name: 'Regression Line',
            line: { color: '#5045e5' }
          },
          {
            x: points.map(p => p.x),
            y: points.map(p => p.y),
            type: 'scatter',
            mode: 'markers',
            name: 'Data Points',
            marker: { color: '#D91656', size: 8 }
          },
          {
            x: [findX],
            y: [result],
            type: 'scatter',
            mode: 'markers',
            name: 'Result',
            marker: { color: '#117554', size: 8 }
          }
        ]}
        layout={{
          title: 'Linear Regression',
          xaxis: { title: 'x' },
          yaxis: { title: 'y' }
        }}
        config={{ responsive: true }}
      />
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Linear Regression</h1>
      
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Find f(x) where x is:</Label>
              <Input
                type="number"
                value={findX}
                onChange={(e) => setFindX(parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Points Amount:</Label>
              <Input
                type="number"
                value={pointsAmount}
                onChange={(e) => {
                  const amount = parseInt(e.target.value);
                  setPointsAmount(amount);
                  setPoints(Array(amount).fill().map(() => ({ x: 0, y: 0 })));
                }}
                min="2"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Point</TableHead>
                  <TableHead>x</TableHead>
                  <TableHead>y</TableHead>
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
                        value={points[i]?.y || 0}
                        onChange={(e) => handlePointChange(i, 'y', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button onClick={calculateRegression} className="w-full">
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
          <>
            <Card>
              <CardHeader>
                <CardTitle>Graph</CardTitle>
              </CardHeader>
              <CardContent>
                {renderGraph()}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Solution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>xi</TableHead>
                      <TableHead>yi</TableHead>
                      <TableHead>xi²</TableHead>
                      <TableHead>xiyi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {points.map((point, i) => (
                      <TableRow key={i}>
                        <TableCell>{point.x}</TableCell>
                        <TableCell>{point.y}</TableCell>
                        <TableCell>{(point.x * point.x).toFixed(4)}</TableCell>
                        <TableCell>{(point.x * point.y).toFixed(4)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="space-y-4 text-center">
                  <div dangerouslySetInnerHTML={{ __html: matrixEquation }} />
                  <div dangerouslySetInnerHTML={{ __html: matrixSubstitute }} />
                  <div dangerouslySetInnerHTML={{ __html: regressionFunction }} />
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default LinearRegression;

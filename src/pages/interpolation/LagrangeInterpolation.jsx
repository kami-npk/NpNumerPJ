import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const LagrangeInterpolation = () => {
  const [findX, setFindX] = useState(0);
  const [pointsAmount, setPointsAmount] = useState(5);
  const [points, setPoints] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [result, setResult] = useState(null);
  const [lagrangeTable, setLagrangeTable] = useState([]);
  const [interpolationEquation, setInterpolationEquation] = useState("");

  const handlePointChange = (index, field, value) => {
    const newPoints = [...points];
    if (!newPoints[index]) {
      newPoints[index] = { x: 0, fx: 0 };
    }
    newPoints[index][field] = parseFloat(value) || 0;
    setPoints(newPoints);
  };

  const handleSelectionChange = (index) => {
    const newSelected = [...selectedPoints];
    newSelected[index] = !newSelected[index];
    setSelectedPoints(newSelected);
  };

  const calculateLagrange = () => {
    const selectedData = points.filter((_, i) => selectedPoints[i]);
    if (selectedData.length < 2) {
      alert("Please select at least 2 points");
      return;
    }

    let result = 0;
    let equation = "";

    for (let i = 0; i < selectedData.length; i++) {
      let term = 1;
      let Li = `L${i + 1}`;
      
      for (let j = 0; j < selectedData.length; j++) {
        if (i !== j) {
          term *= (findX - selectedData[j].x) / (selectedData[i].x - selectedData[j].x);
        }
      }
      
      result += term * selectedData[i].fx;
      equation += `${Li} = ${term.toFixed(4)}, `;
    }

    setResult(result);
    setInterpolationEquation(equation.slice(0, -2));
    setLagrangeTable(selectedData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Lagrange Interpolation</h1>
      
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
                <Label className="text-left block">Points Amount:</Label>
                <Input
                  type="number"
                  value={pointsAmount}
                  onChange={(e) => {
                    const amount = parseInt(e.target.value);
                    setPointsAmount(amount);
                    setPoints(Array(amount).fill({ x: 0, fx: 0 }));
                    setSelectedPoints(Array(amount).fill(false));
                  }}
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Point</TableHead>
                    <TableHead>x</TableHead>
                    <TableHead>f(x)</TableHead>
                    <TableHead>Select</TableHead>
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
                      <TableCell>
                        <Checkbox
                          checked={selectedPoints[i] || false}
                          onCheckedChange={() => handleSelectionChange(i)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button onClick={calculateLagrange} className="w-full">
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
                    {lagrangeTable.map((point, i) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{point.x}</TableCell>
                        <TableCell>{point.fx}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Interpolation Equation</h3>
                  <p>{interpolationEquation}</p>
                </div>

                <div className="text-center">
                  <p className="font-semibold">Result: {result.toFixed(4)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LagrangeInterpolation;
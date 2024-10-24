import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const NewtonDividedDifference = () => {
  const [findX, setFindX] = useState(0);
  const [pointsAmount, setPointsAmount] = useState(5);
  const [points, setPoints] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [dividedDiffTable, setDividedDiffTable] = useState([]);
  const [result, setResult] = useState(null);
  const [equation, setEquation] = useState("");
  const [open, setOpen] = useState(false);

  const initializePoints = (amount) => {
    const newPoints = Array(amount).fill().map(() => ({ x: 0, fx: 0 }));
    setPoints(newPoints);
    setSelectedPoints(Array(amount).fill(false));
  };

  const handlePointChange = (index, field, value) => {
    const newPoints = [...points];
    newPoints[index] = { ...newPoints[index], [field]: parseFloat(value) || 0 };
    setPoints(newPoints);
  };

  const handleSelectionChange = (index) => {
    const newSelected = [...selectedPoints];
    newSelected[index] = !newSelected[index];
    setSelectedPoints(newSelected);
  };

  const calculateDividedDifference = () => {
    const selectedData = points.filter((_, i) => selectedPoints[i]);
    if (selectedData.length < 2) {
      alert("Please select at least 2 points");
      return;
    }

    const n = selectedData.length;
    const table = Array(n).fill().map(() => Array(n).fill(0));

    // Fill first column with f(x) values
    for (let i = 0; i < n; i++) {
      table[i][0] = selectedData[i].fx;
    }

    // Calculate divided differences
    for (let j = 1; j < n; j++) {
      for (let i = 0; i < n - j; i++) {
        table[i][j] = (table[i + 1][j - 1] - table[i][j - 1]) / 
                      (selectedData[i + j].x - selectedData[i].x);
      }
    }

    setDividedDiffTable(table);
    
    // Calculate result
    let result = table[0][0];
    let term = 1;
    for (let i = 1; i < n; i++) {
      term *= (findX - selectedData[i - 1].x);
      result += table[0][i] * term;
    }
    setResult(result);

    // Generate equation string
    let eq = `f(x) = ${table[0][0].toFixed(4)}`;
    term = 1;
    for (let i = 1; i < n; i++) {
      const coefficient = table[0][i].toFixed(4);
      eq += ` + (${coefficient})`;
      for (let j = 0; j < i; j++) {
        eq += `(x - ${selectedData[j].x})`;
      }
    }
    setEquation(eq);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Newton's Divided Difference</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
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
                placeholder="Enter x value"
              />
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">Set Points</Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Points Input</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Label>Points Amount:</Label>
                    <Input
                      type="number"
                      value={pointsAmount}
                      onChange={(e) => {
                        setPointsAmount(parseInt(e.target.value));
                        initializePoints(parseInt(e.target.value));
                      }}
                      className="w-24"
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
                      {points.map((point, i) => (
                        <TableRow key={i}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={point.x}
                              onChange={(e) => handlePointChange(i, 'x', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={point.fx}
                              onChange={(e) => handlePointChange(i, 'fx', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Checkbox
                              checked={selectedPoints[i]}
                              onCheckedChange={() => handleSelectionChange(i)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </DialogContent>
            </Dialog>

            <Button onClick={calculateDividedDifference} className="w-full">
              Calculate
            </Button>

            {result !== null && (
              <div className="text-center font-semibold">
                Result: {result.toFixed(4)}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Solution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {dividedDiffTable.length > 0 && (
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Divided Difference Table</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>xi</TableHead>
                        {Array(dividedDiffTable[0].length).fill(0).map((_, i) => (
                          <TableHead key={i}>
                            f[{Array(i + 1).fill(0).map((_, j) => `x${j + 1}`).join(', ')}]
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dividedDiffTable.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{points[i].x}</TableCell>
                          {row.map((val, j) => (
                            <TableCell key={j}>
                              {val ? val.toFixed(4) : ''}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Interpolation Equation</h3>
                  <div className="p-4 bg-muted rounded-lg">
                    {equation}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewtonDividedDifference;
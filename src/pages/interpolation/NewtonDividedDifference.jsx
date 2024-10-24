import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PointsTable } from './components/PointsTable';
import { DividedDifferenceTable } from './components/DividedDifferenceTable';

const NewtonDividedDifference = () => {
  const [findX, setFindX] = useState(0);
  const [pointsAmount, setPointsAmount] = useState(5);
  const [points, setPoints] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [dividedDiffTable, setDividedDiffTable] = useState([]);
  const [result, setResult] = useState(null);
  const [equation, setEquation] = useState("");

  const handlePointsAmountChange = (e) => {
    const amount = parseInt(e.target.value);
    setPointsAmount(amount);
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
    
    // Calculate result and equation
    let result = table[0][0];
    let term = 1;
    let eq = `f(x) = ${table[0][0].toFixed(4)}`;
    
    for (let i = 1; i < n; i++) {
      term *= (findX - selectedData[i - 1].x);
      result += table[0][i] * term;
      
      const coefficient = table[0][i].toFixed(4);
      eq += ` + (${coefficient})`;
      for (let j = 0; j < i; j++) {
        eq += `(x - ${selectedData[j].x})`;
      }
    }
    
    setResult(result);
    setEquation(eq);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Newton's Divided Difference</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full max-w-md space-y-2">
                <Label className="text-center block">Find f(x) where x is:</Label>
                <Input
                  type="number"
                  value={findX}
                  onChange={(e) => setFindX(parseFloat(e.target.value))}
                  placeholder="Enter x value"
                  className="text-center"
                />
              </div>
              
              <div className="w-full max-w-md space-y-2">
                <Label className="text-center block">Points Amount:</Label>
                <Input
                  type="number"
                  value={pointsAmount}
                  onChange={handlePointsAmountChange}
                  placeholder="Enter number of points"
                  className="text-center"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <PointsTable 
                points={points}
                selectedPoints={selectedPoints}
                onPointChange={handlePointChange}
                onSelectionChange={handleSelectionChange}
              />
            </div>

            <div className="flex justify-center">
              <Button onClick={calculateDividedDifference} className="w-full max-w-md">
                Calculate
              </Button>
            </div>

            {result !== null && (
              <div className="text-center font-semibold">
                Result: {result.toFixed(4)}
              </div>
            )}
          </CardContent>
        </Card>

        {dividedDiffTable.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Solution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-center">Divided Difference Table</h3>
                <DividedDifferenceTable 
                  dividedDiffTable={dividedDiffTable}
                  points={points}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-center">Interpolation Equation</h3>
                <div className="p-4 bg-muted rounded-lg text-center">
                  {equation}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NewtonDividedDifference;
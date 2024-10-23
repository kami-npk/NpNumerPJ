import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { evaluate, det } from 'mathjs';

const CramersRule = () => {
  const [size, setSize] = useState(3);
  const [matrixA, setMatrixA] = useState(Array(3).fill().map(() => Array(3).fill(0)));
  const [matrixB, setMatrixB] = useState(Array(3).fill(0));
  const [solution, setSolution] = useState(null);

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value) || 2;
    if (newSize >= 2 && newSize <= 10) {
      setSize(newSize);
      setMatrixA(Array(newSize).fill().map(() => Array(newSize).fill(0)));
      setMatrixB(Array(newSize).fill(0));
    }
  };

  const handleMatrixAChange = (row, col, value) => {
    const newMatrix = [...matrixA];
    newMatrix[row][col] = parseFloat(value) || 0;
    setMatrixA(newMatrix);
  };

  const handleMatrixBChange = (row, value) => {
    const newVector = [...matrixB];
    newVector[row] = parseFloat(value) || 0;
    setMatrixB(newVector);
  };

  const calculateSolution = () => {
    try {
      const detA = det(matrixA);
      if (Math.abs(detA) < 1e-10) {
        setSolution({ error: "The system has no unique solution (determinant is zero)" });
        return;
      }

      const solutions = [];
      for (let i = 0; i < size; i++) {
        const matrixAi = matrixA.map((row, rowIndex) => 
          row.map((val, colIndex) => colIndex === i ? matrixB[rowIndex] : val)
        );
        solutions.push(det(matrixAi) / detA);
      }
      setSolution({ values: solutions });
    } catch (error) {
      setSolution({ error: "Error calculating solution" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Cramer's Rule Calculator</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Matrix Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Label htmlFor="size">Size (NxN):</Label>
              <Input
                id="size"
                type="number"
                min="2"
                max="10"
                value={size}
                onChange={handleSizeChange}
                className="w-24"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Matrix Input</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Matrix A</TableHead>
                    {Array(size).fill().map((_, i) => (
                      <TableHead key={i}>x{i + 1}</TableHead>
                    ))}
                    <TableHead>B</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array(size).fill().map((_, row) => (
                    <TableRow key={row}>
                      <TableCell>Row {row + 1}</TableCell>
                      {Array(size).fill().map((_, col) => (
                        <TableCell key={col}>
                          <Input
                            type="number"
                            value={matrixA[row][col] || ''}
                            onChange={(e) => handleMatrixAChange(row, col, e.target.value)}
                            className="w-20"
                          />
                        </TableCell>
                      ))}
                      <TableCell>
                        <Input
                          type="number"
                          value={matrixB[row] || ''}
                          onChange={(e) => handleMatrixBChange(row, e.target.value)}
                          className="w-20"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex justify-center">
              <Button onClick={calculateSolution}>Solve</Button>
            </div>
          </CardContent>
        </Card>

        {solution && (
          <Card>
            <CardHeader>
              <CardTitle>Solution</CardTitle>
            </CardHeader>
            <CardContent>
              {solution.error ? (
                <p className="text-red-500">{solution.error}</p>
              ) : (
                <div className="space-y-2">
                  {solution.values.map((value, index) => (
                    <p key={index}>
                      x<sub>{index + 1}</sub> = {value.toFixed(4)}
                    </p>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CramersRule;
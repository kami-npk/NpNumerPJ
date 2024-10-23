import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const CramersRule = () => {
  const [matrixSize, setMatrixSize] = useState(3);
  const [matrixA, setMatrixA] = useState(Array(3).fill().map(() => Array(3).fill("")));
  const [vectorB, setVectorB] = useState(Array(3).fill(""));

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value) || 2;
    if (newSize > 10) {
      toast.error("Maximum matrix size is 10x10");
      return;
    }
    if (newSize < 2) {
      toast.error("Minimum matrix size is 2x2");
      return;
    }
    setMatrixSize(newSize);
    setMatrixA(Array(newSize).fill().map(() => Array(newSize).fill("")));
    setVectorB(Array(newSize).fill(""));
  };

  const handleMatrixChange = (row, col, value) => {
    const newMatrix = [...matrixA];
    newMatrix[row][col] = value;
    setMatrixA(newMatrix);
  };

  const handleVectorChange = (index, value) => {
    const newVector = [...vectorB];
    newVector[index] = value;
    setVectorB(newVector);
  };

  const calculateCramer = () => {
    // Implementation of Cramer's rule calculation will go here
    toast.info("Calculation feature coming soon!");
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Cramer's Rule Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Label htmlFor="matrixSize">Matrix Size (NxN)</Label>
              <Input
                id="matrixSize"
                type="number"
                value={matrixSize}
                onChange={handleSizeChange}
                min="2"
                max="10"
                className="w-32 text-center"
              />
            </div>

            <div className="grid gap-8 place-items-center">
              <div className="flex gap-8 items-center">
                <div className="grid gap-2" style={{ 
                  gridTemplateColumns: `repeat(${matrixSize}, minmax(0, 1fr))` 
                }}>
                  {matrixA.map((row, i) => (
                    row.map((cell, j) => (
                      <Input
                        key={`${i}-${j}`}
                        type="number"
                        value={cell}
                        onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                        className="w-16 text-center"
                        placeholder={`a${i+1}${j+1}`}
                      />
                    ))
                  ))}
                </div>

                <div className="text-2xl">=</div>

                <div className="grid gap-2">
                  {vectorB.map((value, i) => (
                    <Input
                      key={i}
                      type="number"
                      value={value}
                      onChange={(e) => handleVectorChange(i, e.target.value)}
                      className="w-16 text-center"
                      placeholder={`b${i+1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={calculateCramer}>Calculate</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CramersRule;
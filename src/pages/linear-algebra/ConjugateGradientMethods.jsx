import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConjugateGradientTable } from "./components/ConjugateGradientTable";
import { calculateConjugateGradient } from "./components/ConjugateGradientCalculation";

const ConjugateGradientMethods = () => {
  const [Dimension, setDimension] = useState(3);
  const [MatrixA, setMatrixA] = useState([]);
  const [MatrixB, setMatrixB] = useState([]);
  const [initialX, setInitialX] = useState([]);
  const [solution, setSolution] = useState([]);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const dim = Number(Dimension);
    if (dim > 0) {
      setMatrixA(Array(dim).fill().map(() => Array(dim).fill(0)));
      setMatrixB(Array(dim).fill(0));
      setInitialX(Array(dim).fill(0));
    }
  }, [Dimension]);

  const handleMatrixAChange = (i, j, value) => {
    const updatedMatrixA = [...MatrixA];
    updatedMatrixA[i][j] = parseFloat(value) || 0;
    setMatrixA(updatedMatrixA);
  };

  const handleMatrixBChange = (i, value) => {
    const updatedMatrixB = [...MatrixB];
    updatedMatrixB[i] = parseFloat(value) || 0;
    setMatrixB(updatedMatrixB);
  };

  const handleInitialXChange = (i, value) => {
    const updatedInitialX = [...initialX];
    updatedInitialX[i] = parseFloat(value) || 0;
    setInitialX(updatedInitialX);
  };

  const solveConjugateGradient = () => {
    const { solution: finalSolution, steps: iterationSteps } = calculateConjugateGradient(
      MatrixA,
      MatrixB,
      initialX,
      Dimension
    );
    setSolution(finalSolution);
    setSteps(iterationSteps);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Conjugate Gradient Method</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-card">
          <CardHeader className="pb-4">
            <CardTitle>Matrix Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Label htmlFor="dimension">Matrix Dimension:</Label>
              <Input
                id="dimension"
                type="number"
                min="2"
                max="10"
                value={Dimension}
                onChange={(e) => setDimension(Number(e.target.value))}
                className="w-24"
              />
            </div>

            <div className="space-y-6">
              <div className="overflow-x-auto">
                <Table className="border border-border w-auto mx-auto">
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="h-8 px-1 w-20"></TableHead>
                      {Array(Dimension).fill().map((_, i) => (
                        <TableHead key={i} className="text-center h-8 px-1 w-16">x{i + 1}</TableHead>
                      ))}
                      <TableHead className="text-center h-8 px-1 w-16">b</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array(Dimension).fill().map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium h-8 px-1">Row {i + 1}</TableCell>
                        {Array(Dimension).fill().map((_, j) => (
                          <TableCell key={j} className="p-0">
                            <Input
                              type="number"
                              value={MatrixA[i]?.[j] || ''}
                              onChange={(e) => handleMatrixAChange(i, j, e.target.value)}
                              className="border-0 h-8 text-center w-16"
                            />
                          </TableCell>
                        ))}
                        <TableCell className="p-0">
                          <Input
                            type="number"
                            value={MatrixB[i] || ''}
                            onChange={(e) => handleMatrixBChange(i, e.target.value)}
                            className="border-0 h-8 text-center w-16"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2">Initial X Values:</h4>
                <div className="flex gap-4 justify-center">
                  {Array(Dimension).fill().map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <Label htmlFor={`x${i}`}>x{i + 1}</Label>
                      <Input
                        id={`x${i}`}
                        type="number"
                        value={initialX[i] || ''}
                        onChange={(e) => handleInitialXChange(i, e.target.value)}
                        className="w-20 text-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <Button onClick={solveConjugateGradient}>Solve</Button>
            </div>
          </CardContent>
        </Card>

        {steps.length > 0 && (
          <Card className="bg-muted">
            <CardHeader className="pb-4">
              <CardTitle>Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <ConjugateGradientTable steps={steps} dimension={Dimension} />
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-medium text-center mb-2">Final Solution</h4>
                <div className="flex justify-center gap-8">
                  {solution.map((value, index) => (
                    <div key={index} className="text-lg">
                      x<sub>{index + 1}</sub> = {value.toFixed(6)}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConjugateGradientMethods;
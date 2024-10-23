import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const GaussJordanMethods = () => {
    const [Dimension, setDimension] = useState(3);
    const [MatrixA, setMatrixA] = useState([]);
    const [MatrixB, setMatrixB] = useState([]);
    const [solution, setSolution] = useState([]);
    const [steps, setSteps] = useState([]);
    const [formulas, setFormulas] = useState([]);

    useEffect(() => {
        const dim = Number(Dimension);
        if (dim > 0) {
            setMatrixA(Array(dim).fill().map(() => Array(dim).fill(0)));
            setMatrixB(Array(dim).fill(0));
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

    const solveAnswer = () => {
        const matrixA = MatrixA.map(row => row.slice());
        const matrixB = MatrixB.slice();
        const stepsList = [];
        const newFormulas = [];

        const addStep = (description, matrix, vector) => {
            stepsList.push({ description, matrix: matrix.map(row => row.slice()), vector: vector.slice() });
        };

        const n = Dimension;

        // Gauss-Jordan Elimination
        for (let k = 0; k < n; k++) {
            if (matrixA[k][k] === 0) {
                for (let i = k + 1; i < n; i++) {
                    if (matrixA[i][k] !== 0) {
                        [matrixA[k], matrixA[i]] = [matrixA[i], matrixA[k]];
                        [matrixB[k], matrixB[i]] = [matrixB[i], matrixB[k]];
                        addStep(`Swapped row ${k + 1} with row ${i + 1}`, matrixA, matrixB);
                        break;
                    }
                }
            }

            // Normalize the pivot row
            const pivot = matrixA[k][k];
            for (let j = 0; j < n; j++) {
                matrixA[k][j] /= pivot;
            }
            matrixB[k] /= pivot;
            addStep(`Normalized row ${k + 1}`, matrixA, matrixB);

            // Eliminate the current column from other rows
            for (let i = 0; i < n; i++) {
                if (i !== k) {
                    const factor = matrixA[i][k];
                    for (let j = 0; j < n; j++) {
                        matrixA[i][j] -= factor * matrixA[k][j];
                    }
                    matrixB[i] -= factor * matrixB[k];
                    addStep(`Eliminated x${k + 1} from row ${i + 1}`, matrixA, matrixB);
                }
            }
        }

        setSolution(matrixB);
        setSteps(stepsList);
        setFormulas(matrixB.map((sol, index) => `x${index + 1} = ${sol.toFixed(4)}`));
    };

    const renderMatrix = (matrix, title, highlightCol = -1) => (
        <div className="mb-4">
            <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
            <div className="overflow-x-auto">
                <Table className="border border-border w-auto mx-auto">
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="h-8 px-1 w-12"></TableHead>
                            {Array(Dimension).fill().map((_, i) => (
                                <TableHead key={i} className="text-center h-8 px-1 w-16">x{i + 1}</TableHead>
                            ))}
                            <TableHead className="text-center h-8 px-1 w-16">b</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {matrix.matrix.map((row, i) => (
                            <TableRow key={i} className="border-b border-border">
                                <TableCell className="font-medium text-center h-8 px-1">{i + 1}</TableCell>
                                {row.map((value, j) => (
                                    <TableCell 
                                        key={j} 
                                        className={`text-center h-8 px-1 ${j === highlightCol ? 'bg-blue-50/50 dark:bg-blue-900/30' : ''}`}
                                    >
                                        {value.toFixed(4)}
                                    </TableCell>
                                ))}
                                <TableCell className="text-center h-8 px-1">{matrix.vector[i].toFixed(4)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Gauss-Jordan Method</h1>
            
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
                                        <TableRow key={i} className="border-b border-border">
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

                        <div className="flex justify-center mt-4">
                            <Button onClick={solveAnswer}>Solve</Button>
                        </div>
                    </CardContent>
                </Card>

                {solution.length > 0 && (
                    <Card className="bg-muted">
                        <CardHeader className="pb-4">
                            <CardTitle>Solution</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center space-y-1 mb-4">
                                {solution.map((value, index) => (
                                    <p key={index} className="text-lg">
                                        x<sub>{index + 1}</sub> = {value.toFixed(4)}
                                    </p>
                                ))}
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-center">Steps</h3>
                                {steps.map((step, index) => (
                                    <div key={index}>
                                        <h4 className="text-lg font-medium text-center mb-2">Step {index + 1}: {step.description}</h4>
                                        {renderMatrix(step)}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default GaussJordanMethods;
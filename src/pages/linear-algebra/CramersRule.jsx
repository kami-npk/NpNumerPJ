import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { det } from 'mathjs';

const CramersRule = () => {
    const [Dimension, setDimension] = useState(3);
    const [MatrixA, setMatrixA] = useState([]);
    const [MatrixB, setMatrixB] = useState([]);
    const [solution, setSolution] = useState([]);
    const [determinants, setDeterminants] = useState([]);
    const [detA, setDetA] = useState(null);

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

        const detA = det(matrixA);
        setDetA(detA);

        if (detA === 0) {
            setSolution(['No unique solution']);
            setDeterminants([]);
            return;
        }

        const solutions = [];
        const dets = [];
        for (let i = 0; i < Dimension; i++) {
            const matrixAi = matrixA.map((row, index) => {
                return row.map((value, colIndex) => (colIndex === i ? matrixB[index] : value));
            });
            const detAi = det(matrixAi);
            dets.push(detAi);
            solutions.push(detAi / detA);
        }

        setDeterminants(dets);
        setSolution(solutions);
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {matrix.map((row, i) => (
                            <TableRow key={i} className="border-b border-border">
                                <TableCell className="font-medium text-center h-8 px-1">{i + 1}</TableCell>
                                {row.map((value, j) => (
                                    <TableCell 
                                        key={j} 
                                        className={`text-center h-8 px-1 ${j === highlightCol ? 'bg-blue-50/50 dark:bg-blue-900/30' : ''}`}
                                    >
                                        {value}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {title.includes('A') && (
                <p className="text-center text-sm mt-1">
                    det({title}) = {title === 'Matrix A' ? detA?.toFixed(4) : determinants[parseInt(title.slice(-1)) - 1]?.toFixed(4)}
                </p>
            )}
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Cramer's Rule Calculator</h1>
            
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
                                        <TableHead className="text-center h-8 px-1 w-16">B</TableHead>
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

                            {renderMatrix(MatrixA, 'Matrix A')}
                            
                            {determinants.map((_, index) => (
                                <div key={index}>
                                    {renderMatrix(
                                        MatrixA.map((row, i) => 
                                            row.map((val, j) => j === index ? MatrixB[i] : val)
                                        ),
                                        `Matrix A${index + 1}`,
                                        index
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default CramersRule;

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
        <div className="mb-8">
            <h3 className="text-xl font-semibold text-center mb-4">{title}</h3>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            {Array(Dimension).fill().map((_, i) => (
                                <TableHead key={i} className="text-center">x{i + 1}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {matrix.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium text-center">{i + 1}</TableCell>
                                {row.map((value, j) => (
                                    <TableCell 
                                        key={j} 
                                        className={`text-center ${j === highlightCol ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                                    >
                                        {value}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Cramer's Rule Calculator</h1>
            
            <div className="max-w-4xl mx-auto space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Matrix Input</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex justify-center items-center gap-4">
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
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead></TableHead>
                                        {Array(Dimension).fill().map((_, i) => (
                                            <TableHead key={i} className="text-center">x{i + 1}</TableHead>
                                        ))}
                                        <TableHead className="text-center">B</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Array(Dimension).fill().map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium">Row {i + 1}</TableCell>
                                            {Array(Dimension).fill().map((_, j) => (
                                                <TableCell key={j}>
                                                    <Input
                                                        type="number"
                                                        value={MatrixA[i]?.[j] || ''}
                                                        onChange={(e) => handleMatrixAChange(i, j, e.target.value)}
                                                        className="w-20"
                                                    />
                                                </TableCell>
                                            ))}
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    value={MatrixB[i] || ''}
                                                    onChange={(e) => handleMatrixBChange(i, e.target.value)}
                                                    className="w-20"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex justify-center">
                            <Button onClick={solveAnswer}>Solve</Button>
                        </div>
                    </CardContent>
                </Card>

                {solution.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Solution</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="text-center space-y-2">
                                {solution.map((value, index) => (
                                    <p key={index} className="text-lg">
                                        x<sub>{index + 1}</sub> = {value.toFixed(4)}
                                    </p>
                                ))}
                            </div>

                            {renderMatrix(MatrixA, 'Matrix A')}
                            <p className="text-center text-lg">det(A) = {detA?.toFixed(4)}</p>

                            {determinants.map((det, index) => (
                                <div key={index}>
                                    {renderMatrix(
                                        MatrixA.map((row, i) => 
                                            row.map((val, j) => j === index ? MatrixB[i] : val)
                                        ),
                                        `Matrix A${index + 1}`,
                                        index
                                    )}
                                    <p className="text-center text-lg">
                                        det(A{index + 1}) = {det.toFixed(4)}
                                    </p>
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
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MatrixInversionMethods = () => {
    const [Dimension, setDimension] = useState(3);
    const [MatrixA, setMatrixA] = useState([]);
    const [MatrixB, setMatrixB] = useState([]);
    const [inverseMatrix, setInverseMatrix] = useState([]);
    const [steps, setSteps] = useState([]);
    const [solutionSteps, setSolutionSteps] = useState([]);

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

    const solveInverse = () => {
        const matrixA = MatrixA.map(row => row.slice());
        const matrixB = MatrixB.slice();
        const n = Dimension;

        // Initialize the augmented matrix [A | I]
        const augmentedMatrix = matrixA.map((row, i) => [...row, ...Array(n).fill(0)]);
        for (let i = 0; i < n; i++) augmentedMatrix[i][n + i] = 1;

        const stepsList = [];
        const addStep = (description, matrix) => {
            stepsList.push({ description, matrix: matrix.map(row => row.slice()) });
        };

        // Gauss-Jordan Elimination
        for (let k = 0; k < n; k++) {
            if (augmentedMatrix[k][k] === 0) {
                for (let i = k + 1; i < n; i++) {
                    if (augmentedMatrix[i][k] !== 0) {
                        [augmentedMatrix[k], augmentedMatrix[i]] = [augmentedMatrix[i], augmentedMatrix[k]];
                        addStep(`Swapped row ${k + 1} with row ${i + 1}`, augmentedMatrix);
                        break;
                    }
                }
            }

            const pivot = augmentedMatrix[k][k];
            for (let j = 0; j < 2 * n; j++) {
                augmentedMatrix[k][j] /= pivot;
            }
            addStep(`Normalized row ${k + 1}`, augmentedMatrix);

            for (let i = 0; i < n; i++) {
                if (i !== k) {
                    const factor = augmentedMatrix[i][k];
                    for (let j = 0; j < 2 * n; j++) {
                        augmentedMatrix[i][j] -= factor * augmentedMatrix[k][j];
                    }
                    addStep(`Eliminated column ${k + 1} from row ${i + 1}`, augmentedMatrix);
                }
            }
        }

        const inverse = augmentedMatrix.map(row => row.slice(n));
        const resultX = Array(n).fill(0);
        const solutionStepsList = [];

        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < n; j++) {
                sum += inverse[i][j] * matrixB[j];
            }
            resultX[i] = sum;
            solutionStepsList.push({
                description: `Row ${i + 1} multiplication`,
                step: `x${i + 1} = ${inverse[i].map((val, idx) => `${val.toFixed(4)} × ${matrixB[idx]}`).join(' + ')} = ${sum.toFixed(4)}`
            });
        }

        setInverseMatrix(inverse);
        setSteps(stepsList);
        setSolutionSteps(solutionStepsList);
    };

    const renderMatrix = (matrix, title) => (
        <div className="mb-4">
            <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
            <div className="overflow-x-auto">
                <Table className="border border-border w-auto mx-auto">
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="h-8 px-1 w-12"></TableHead>
                            {Array(matrix[0].length).fill().map((_, i) => (
                                <TableHead key={i} className="text-center h-8 px-1 w-16">
                                    {i < Dimension ? `x${i + 1}` : `I${i - Dimension + 1}`}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {matrix.map((row, i) => (
                            <TableRow key={i} className="border-b border-border">
                                <TableCell className="font-medium text-center h-8 px-1">{i + 1}</TableCell>
                                {row.map((value, j) => (
                                    <TableCell key={j} className="text-center h-8 px-1">
                                        {value.toFixed(4)}
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
            <h1 className="text-3xl font-bold text-center mb-8">Matrix Inversion Method</h1>
            
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
                            <Button onClick={solveInverse}>Solve</Button>
                        </div>
                    </CardContent>
                </Card>

                {inverseMatrix.length > 0 && (
                    <Card className="bg-muted">
                        <CardHeader className="pb-4">
                            <CardTitle>Solution</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center space-y-1 mb-4">
                                {solutionSteps.map((step, index) => (
                                    <p key={index} className="text-lg">{step.step}</p>
                                ))}
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-center">Steps</h3>
                                {steps.map((step, index) => (
                                    <div key={index}>
                                        <h4 className="text-lg font-medium text-center mb-2">Step {index + 1}: {step.description}</h4>
                                        {renderMatrix(step.matrix)}
                                    </div>
                                ))}

                                <div className="flex justify-center gap-8 mt-8">
                                    <div>
                                        <h4 className="text-lg font-medium text-center mb-2">Inverse Matrix (A⁻¹)</h4>
                                        {renderMatrix(inverseMatrix, '')}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium text-center mb-2">Matrix B</h4>
                                        <Table className="border border-border w-auto mx-auto">
                                            <TableBody>
                                                {MatrixB.map((value, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell className="text-center">{value}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default MatrixInversionMethods;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const LinearRegressionForm = ({ 
  findX, 
  setFindX, 
  pointsAmount, 
  setPointsAmount, 
  points, 
  handlePointChange, 
  calculateRegression, 
  result 
}) => {
  return (
    <Card>
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
          />
        </div>

        <div className="space-y-2">
          <Label>Points Amount:</Label>
          <Input
            type="number"
            value={pointsAmount}
            onChange={(e) => {
              const amount = parseInt(e.target.value);
              setPointsAmount(amount);
            }}
            min="2"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Point</TableHead>
              <TableHead>x</TableHead>
              <TableHead>y</TableHead>
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
                    value={points[i]?.y || 0}
                    onChange={(e) => handlePointChange(i, 'y', e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button onClick={calculateRegression} className="w-full">
          Calculate
        </Button>

        {result !== null && (
          <div className="text-center font-semibold">
            Result: {result.toFixed(4)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
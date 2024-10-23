import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const InputForm = ({ equation, initialX, onEquationChange, onInitialXChange, onGetEquation, onCalculate, result }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Input</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="equation">Input Equation f(x)</Label>
            <Input
              id="equation"
              value={equation}
              onChange={(e) => onEquationChange(e.target.value)}
              placeholder="e.g., x^2 - 4"
            />
            <p className="text-sm text-muted-foreground">Ensure proper arithmetic syntax.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="initialX">Input X (initial value)</Label>
            <Input
              id="initialX"
              type="number"
              value={initialX}
              onChange={(e) => onInitialXChange(e.target.value)}
              placeholder="e.g., 0"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={onGetEquation} className="w-full">Get Equation</Button>
            <Button onClick={onCalculate} className="w-full">Solve</Button>
          </div>
          {result !== null && (
            <div className="text-center mt-4">
              <p className="font-semibold">Answer: {result.toPrecision(7)}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
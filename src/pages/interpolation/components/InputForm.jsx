import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const InputForm = ({ equation, initialX, onEquationChange, onInitialXChange, onCalculate, result }) => {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Input</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="findX" className="text-left block">Find f(x) where x is:</Label>
            <Input
              id="findX"
              type="number"
              value={initialX}
              onChange={(e) => onInitialXChange(e.target.value)}
              placeholder="Enter x value"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pointsAmount" className="text-left block">Points Amount:</Label>
            <Input
              id="pointsAmount"
              type="number"
              value={equation}
              onChange={(e) => onEquationChange(e.target.value)}
              placeholder="Enter number of points"
            />
          </div>
          <Button onClick={onCalculate} className="w-full">Calculate</Button>
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
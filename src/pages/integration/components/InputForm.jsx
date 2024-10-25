import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const InputForm = ({ equation, a, b, n, onEquationChange, onAChange, onBChange, onNChange, onCalculate, onGetEquation, result }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Input</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="equation">Equation f(x)</Label>
          <Input
            id="equation"
            value={equation}
            onChange={(e) => onEquationChange(e.target.value)}
            placeholder="e.g., x^2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="a">Left bound (a)</Label>
          <Input
            id="a"
            type="number"
            value={a}
            onChange={(e) => onAChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="b">Right bound (b)</Label>
          <Input
            id="b"
            type="number"
            value={b}
            onChange={(e) => onBChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="n">Number of segments (n)</Label>
          <Input
            id="n"
            type="number"
            value={n}
            onChange={(e) => onNChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={onGetEquation}>Get Example</Button>
          <Button onClick={onCalculate}>Calculate</Button>
        </div>
        {result !== null && (
          <div className="text-center font-semibold">
            Area: {result.toPrecision(7)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
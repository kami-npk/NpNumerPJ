import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const NumericalDifferentiationForm = ({
  equation,
  x,
  h,
  selectedOrder,
  selectedDirection,
  onEquationChange,
  onXChange,
  onHChange,
  onOrderChange,
  onDirectionChange,
  onCalculate,
  onGetEquation,
  result
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Input</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Select Order</Label>
          <Select value={selectedOrder} onValueChange={onOrderChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">First</SelectItem>
              <SelectItem value="2">Second</SelectItem>
              <SelectItem value="3">Third</SelectItem>
              <SelectItem value="4">Fourth</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Select Direction</Label>
          <Select value={selectedDirection} onValueChange={onDirectionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Forward</SelectItem>
              <SelectItem value="2">Backward</SelectItem>
              <SelectItem value="3">Central</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Input Equation f(x)</Label>
          <Input
            value={equation}
            onChange={(e) => onEquationChange(e.target.value)}
            placeholder="e.g., x^2"
          />
          <p className="text-sm text-muted-foreground">Ensure proper arithmetic syntax.</p>
        </div>

        <div className="space-y-2">
          <Label>Input x</Label>
          <Input
            type="number"
            value={x}
            onChange={(e) => onXChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Input h</Label>
          <Input
            type="number"
            value={h}
            onChange={(e) => onHChange(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={onGetEquation} variant="outline">Get Equation</Button>
          <Button onClick={onCalculate}>Solve</Button>
        </div>

        {result !== null && (
          <div className="text-center font-semibold">
            Answer: {result}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export const MultipleRegressionTable = ({ points, K, onPointChange }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Point</TableHead>
          {Array(K).fill().map((_, i) => (
            <TableHead key={i}>x{i + 1}</TableHead>
          ))}
          <TableHead>f(x)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {points.map((point, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            {Array(K).fill().map((_, j) => (
              <TableCell key={j}>
                <Input
                  type="number"
                  value={point.x[j] || ""}
                  onChange={(e) => onPointChange(i, j, 'x', parseFloat(e.target.value) || 0)}
                />
              </TableCell>
            ))}
            <TableCell>
              <Input
                type="number"
                value={point.fx || ""}
                onChange={(e) => onPointChange(i, -1, 'fx', parseFloat(e.target.value) || 0)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
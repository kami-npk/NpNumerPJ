import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export const PolynomialRegressionTable = ({ points, onPointChange }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Point</TableHead>
          <TableHead>x</TableHead>
          <TableHead>f(x)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {points.map((point, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>
              <Input
                type="number"
                value={point.x || ""}
                onChange={(e) => onPointChange(i, 'x', parseFloat(e.target.value) || 0)}
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={point.fx || ""}
                onChange={(e) => onPointChange(i, 'fx', parseFloat(e.target.value) || 0)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
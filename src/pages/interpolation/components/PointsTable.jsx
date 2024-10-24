import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export const PointsTable = ({ points, selectedPoints, onPointChange, onSelectionChange }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Point</TableHead>
          <TableHead>x</TableHead>
          <TableHead>f(x)</TableHead>
          <TableHead>Select</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {points.map((point, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>
              <Input
                type="number"
                value={point.x}
                onChange={(e) => onPointChange(i, 'x', e.target.value)}
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={point.fx}
                onChange={(e) => onPointChange(i, 'fx', e.target.value)}
              />
            </TableCell>
            <TableCell>
              <Checkbox
                checked={selectedPoints[i]}
                onCheckedChange={() => onSelectionChange(i)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
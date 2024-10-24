import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const SplineSolutionTable = ({ points }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>i</TableHead>
          <TableHead>xi</TableHead>
          <TableHead>f(xi)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {points.map((point, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{point.x}</TableCell>
            <TableCell>{point.fx}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
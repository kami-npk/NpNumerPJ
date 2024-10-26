import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const SecantIterationTable = ({ data }) => {
  const formatValue = (value) => {
    if (value === undefined || value === null) return 'N/A';
    return typeof value === 'number' ? value.toPrecision(7) : value;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Iteration</TableHead>
          <TableHead>Xold</TableHead>
          <TableHead>Xnew</TableHead>
          <TableHead>Error (%)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.iteration}</TableCell>
            <TableCell>{formatValue(row.xold)}</TableCell>
            <TableCell>{formatValue(row.xnew)}</TableCell>
            <TableCell>{formatValue(row.error)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
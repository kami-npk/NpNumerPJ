import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const SecantIterationTable = ({ data }) => {
  const formatValue = (value) => {
    if (value === undefined || value === null) return 'N/A';
    return typeof value === 'number' ? value.toFixed(7) : value;
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
            <TableCell>{formatValue(row.iteration)}</TableCell>
            <TableCell>{formatValue(row.xold || row.XOld)}</TableCell>
            <TableCell>{formatValue(row.xnew || row.XNew)}</TableCell>
            <TableCell>{formatValue(row.error || row.Error)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
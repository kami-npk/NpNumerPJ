import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const SecantIterationTable = ({ data }) => (
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
          <TableCell>{row.xold.toPrecision(7)}</TableCell>
          <TableCell>{row.xnew.toPrecision(7)}</TableCell>
          <TableCell>{row.error.toPrecision(7)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
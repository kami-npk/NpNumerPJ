import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const IterationTable = ({ data }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Iteration</TableHead>
        <TableHead>X</TableHead>
        <TableHead>Error (%)</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.iteration}</TableCell>
          <TableCell>
            {row.x != null ? row.x.toPrecision(7) : 'N/A'}
          </TableCell>
          <TableCell>
            {row.error != null ? row.error.toPrecision(7) : 'N/A'}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const BisectionIterationTable = ({ data }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Iteration</TableHead>
        <TableHead>XL</TableHead>
        <TableHead>XM</TableHead>
        <TableHead>XR</TableHead>
        <TableHead>Error (%)</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.iteration}</TableCell>
          <TableCell>{row.xl.toPrecision(7)}</TableCell>
          <TableCell>{row.xm.toPrecision(7)}</TableCell>
          <TableCell>{row.xr.toPrecision(7)}</TableCell>
          <TableCell>{row.error.toPrecision(7)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
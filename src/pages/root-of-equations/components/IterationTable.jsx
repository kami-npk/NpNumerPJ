import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const IterationTable = ({ data }) => (
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
          <TableCell>
            {row.xl != null ? row.xl.toPrecision(7) : 'N/A'}
          </TableCell>
          <TableCell>
            {row.xm != null ? row.xm.toPrecision(7) : 'N/A'}
          </TableCell>
          <TableCell>
            {row.xr != null ? row.xr.toPrecision(7) : 'N/A'}
          </TableCell>
          <TableCell>
            {row.error != null ? row.error.toPrecision(7) : 'N/A'}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
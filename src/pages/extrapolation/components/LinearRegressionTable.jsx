import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const LinearRegressionTable = ({ points }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>xi</TableHead>
          <TableHead>yi</TableHead>
          <TableHead>xi²</TableHead>
          <TableHead>xiyi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {points.map((point, i) => (
          <TableRow key={i}>
            <TableCell>{point.x}</TableCell>
            <TableCell>{point.y}</TableCell>
            <TableCell>{(point.x * point.x).toFixed(4)}</TableCell>
            <TableCell>{(point.x * point.y).toFixed(4)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
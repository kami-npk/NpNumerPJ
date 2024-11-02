import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const DividedDifferenceTable = ({ dividedDiffTable, points }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>xi</TableHead>
          {Array(dividedDiffTable[0].length).fill(0).map((_, i) => (
            <TableHead key={i}>
              f[{Array(i + 1).fill(0).map((_, j) => `x${j + 1}`).join(', ')}]
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dividedDiffTable.map((row, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            {row.map((val, j) => (
              <TableCell key={j}>
                {val ? val.toFixed(4) : ''}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
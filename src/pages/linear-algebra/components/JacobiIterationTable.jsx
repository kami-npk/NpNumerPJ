import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const JacobiIterationTable = ({ steps, dimension }) => {
  if (!steps.length) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Iteration</TableHead>
          {Array.from({ length: dimension }, (_, i) => (
            <TableHead key={`x${i}`} className="text-center">x{i + 1}</TableHead>
          ))}
          {Array.from({ length: dimension }, (_, i) => (
            <TableHead key={`error${i}`} className="text-center">%Error{i + 1}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {steps.map((step) => (
          <TableRow key={step.iteration}>
            <TableCell className="text-center">{step.iteration}</TableCell>
            {step.values.map((value, index) => (
              <TableCell key={`value${index}`} className="text-center">
                {value.toFixed(6)}
              </TableCell>
            ))}
            {step.errors.map((error, index) => (
              <TableCell key={`error${index}`} className="text-center">
                {error.toFixed(6)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
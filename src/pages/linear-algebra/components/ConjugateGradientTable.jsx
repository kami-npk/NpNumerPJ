import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const ConjugateGradientTable = ({ steps, dimension }) => {
  if (!steps.length) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Iteration (k)</TableHead>
          <TableHead className="text-center">λ<sub>k-1</sub></TableHead>
          <TableHead className="text-center">D<sub>k-1</sub></TableHead>
          <TableHead className="text-center">X<sub>k</sub></TableHead>
          <TableHead className="text-center">R<sub>k</sub></TableHead>
          <TableHead className="text-center">%Error</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {steps.map((step) => (
          <TableRow key={step.iteration}>
            <TableCell className="text-center">{step.iteration}</TableCell>
            <TableCell className="text-center">{step.lambda.toFixed(6)}</TableCell>
            <TableCell className="text-center">
              {step.D.map((val, i) => (
                <div key={i}>D<sub>{i + 1}</sub> = {val.toFixed(6)}</div>
              ))}
            </TableCell>
            <TableCell className="text-center">
              {step.X.map((val, i) => (
                <div key={i}>x<sub>{i + 1}</sub> = {val.toFixed(6)}</div>
              ))}
            </TableCell>
            <TableCell className="text-center">
              {step.R.map((val, i) => (
                <div key={i}>R<sub>{i + 1}</sub> = {val.toFixed(6)}</div>
              ))}
            </TableCell>
            <TableCell className="text-center">{(step.error * 100).toFixed(6)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
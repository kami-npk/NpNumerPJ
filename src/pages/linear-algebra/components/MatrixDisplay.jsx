import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const MatrixDisplay = ({ title, matrix, dimension, type = "standard" }) => {
  return (
    <div>
      <h4 className="text-lg font-medium text-center mb-2">{title}</h4>
      <Table className="border border-border w-auto mx-auto">
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="h-8 px-1 w-12"></TableHead>
            {Array(dimension).fill().map((_, i) => (
              <TableHead key={i} className="text-center h-8 px-1 w-16">c{i + 1}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(dimension).fill().map((_, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium text-center h-8 px-1">{`r${i + 1}`}</TableCell>
              {Array(dimension).fill().map((_, j) => (
                <TableCell key={j} className="text-center h-8 px-1">
                  {type === "L" ? 
                    (i === j ? `L${i + 1}${j + 1}` : i > j ? `L${i + 1}${j + 1}` : '0') :
                  type === "LT" ?
                    (j >= i ? `L${i + 1}${j + 1}` : '0') :
                  type === "values" ?
                    matrix[i][j].toFixed(4) :
                    `A${i + 1}${j + 1}`}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
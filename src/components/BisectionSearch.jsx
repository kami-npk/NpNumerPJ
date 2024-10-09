import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BisectionSearch = () => {
  const [equation, setEquation] = useState("x^2 - 4");
  const [xl, setXL] = useState("");
  const [xr, setXR] = useState("");
  const [precision, setPrecision] = useState("0.0001");
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);

  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

  const calculateBisection = (e) => {
    e.preventDefault();
    let xm, fXm, fXr, ea, scope;
    let iter = 0;
    const MAX = 50;
    const epsilon = parseFloat(precision);
    const newData = [];
    let xlNum = parseFloat(xl);
    let xrNum = parseFloat(xr);

    do {
      xm = (xlNum + xrNum) / 2.0;
      scope = { x: xrNum };
      fXr = evaluate(equation, scope);

      scope = { x: xm };
      fXm = evaluate(equation, scope);

      iter++;
      if (fXm * fXr > 0) {
        ea = error(xrNum, xm);
        newData.push({ iteration: iter, Xl: xlNum, Xm: xm, Xr: xrNum });
        xrNum = xm;
      } else if (fXm * fXr < 0) {
        ea = error(xlNum, xm);
        newData.push({ iteration: iter, Xl: xlNum, Xm: xm, Xr: xrNum });
        xlNum = xm;
      }
    } while (ea > epsilon && iter < MAX);

    setResult(xm);
    setData(newData);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Bisection Search Method</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={calculateBisection} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="equation">Equation f(x)</Label>
              <Input
                id="equation"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="e.g., x^2 - 4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xl">X Left (XL)</Label>
              <Input
                id="xl"
                type="number"
                value={xl}
                onChange={(e) => setXL(e.target.value)}
                placeholder="e.g., 0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xr">X Right (XR)</Label>
              <Input
                id="xr"
                type="number"
                value={xr}
                onChange={(e) => setXR(e.target.value)}
                placeholder="e.g., 3"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="precision">Precision</Label>
              <Input
                id="precision"
                type="number"
                value={precision}
                onChange={(e) => setPrecision(e.target.value)}
                placeholder="e.g., 0.0001"
              />
            </div>
            <Button type="submit">Calculate</Button>
          </form>
        </CardContent>
      </Card>

      {result !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Root approximation: {result.toPrecision(6)}</p>
          </CardContent>
        </Card>
      )}

      {data.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Iterations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Iteration</TableHead>
                  <TableHead>XL</TableHead>
                  <TableHead>XM</TableHead>
                  <TableHead>XR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.iteration}</TableCell>
                    <TableCell>{row.Xl.toPrecision(6)}</TableCell>
                    <TableCell>{row.Xm.toPrecision(6)}</TableCell>
                    <TableCell>{row.Xr.toPrecision(6)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BisectionSearch;
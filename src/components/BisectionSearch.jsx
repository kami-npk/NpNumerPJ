import React, { useState } from "react";
import { evaluate } from 'mathjs';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BisectionSearch = () => {
  const [data, setData] = useState([]);
  const [equation, setEquation] = useState("(x^4)-13");
  const [x, setX] = useState(0);
  const [xl, setXL] = useState("");
  const [xr, setXR] = useState("");

  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

  const calculateBisection = (xl, xr) => {
    let xm, fXm, fXr, ea, scope;
    let iter = 0;
    const MAX = 50;
    const e = 0.00001;
    const newData = [];

    do {
      xm = (xl + xr) / 2.0;
      scope = { x: xr };
      fXr = evaluate(equation, scope);

      scope = { x: xm };
      fXm = evaluate(equation, scope);

      iter++;
      if (fXm * fXr > 0) {
        ea = error(xr, xm);
        newData.push({ iteration: iter, Xl: xl, Xm: xm, Xr: xr });
        xr = xm;
      } else if (fXm * fXr < 0) {
        ea = error(xl, xm);
        newData.push({ iteration: iter, Xl: xl, Xm: xm, Xr: xr });
        xl = xm;
      }
    } while (ea > e && iter < MAX);

    setX(xm);
    setData(newData);
  };

  const handleCalculate = () => {
    const xlNum = parseFloat(xl);
    const xrNum = parseFloat(xr);
    calculateBisection(xlNum, xrNum);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Bisection Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="equation">Input f(x)</Label>
              <Input
                id="equation"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                className="max-w-xs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xl">Input XL</Label>
              <Input
                id="xl"
                type="number"
                value={xl}
                onChange={(e) => setXL(e.target.value)}
                className="max-w-xs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xr">Input XR</Label>
              <Input
                id="xr"
                type="number"
                value={xr}
                onChange={(e) => setXR(e.target.value)}
                className="max-w-xs"
              />
            </div>
            <Button onClick={handleCalculate}>Calculate</Button>
          </div>
        </CardContent>
      </Card>

      {x !== 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">Answer = {x.toPrecision(7)}</p>
          </CardContent>
        </Card>
      )}

      {data.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Iterations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Iteration</TableHead>
                  <TableHead>XL</TableHead>
                  <TableHead>XM</TableHead>
                  <TableHead>XR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((element, index) => (
                  <TableRow key={index}>
                    <TableCell>{element.iteration}</TableCell>
                    <TableCell>{element.Xl}</TableCell>
                    <TableCell>{element.Xm}</TableCell>
                    <TableCell>{element.Xr}</TableCell>
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
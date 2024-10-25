import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegressionGraph } from './RegressionGraph';

export const PolynomialRegressionContent = ({ result, points, coefficients, equations }) => {
  const generateRegressionLine = () => {
    if (!points.length || !coefficients) return [];
    
    const xMin = Math.min(...points.map(p => p.x));
    const xMax = Math.max(...points.map(p => p.x));
    const step = (xMax - xMin) / 100;
    
    return Array.from({ length: 101 }, (_, i) => {
      const x = xMin + i * step;
      let y = coefficients[0];
      for (let j = 1; j < coefficients.length; j++) {
        y += coefficients[j] * Math.pow(x, j);
      }
      return { x, y };
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Graph</CardTitle>
        </CardHeader>
        <CardContent>
          <RegressionGraph 
            points={points}
            regressionLine={generateRegressionLine()}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Solution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4 text-center">
            <div dangerouslySetInnerHTML={{ __html: equations.matrix }} />
            <div dangerouslySetInnerHTML={{ __html: equations.substituted }} />
            <div dangerouslySetInnerHTML={{ __html: equations.regression }} />
            <div dangerouslySetInnerHTML={{ __html: equations.final }} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegressionGraph } from './RegressionGraph';

export const LinearRegressionContent = ({ result, points, slope, intercept, findX, equations }) => {
  const regressionLine = points.length > 0 ? [
    { x: Math.min(...points.map(p => p.x)) - 1, y: null },
    { x: Math.max(...points.map(p => p.x)) + 1, y: null }
  ].map(point => ({
    x: point.x,
    y: slope * point.x + intercept
  })) : [];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Graph</CardTitle>
        </CardHeader>
        <CardContent>
          <RegressionGraph 
            points={points}
            regressionLine={regressionLine}
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
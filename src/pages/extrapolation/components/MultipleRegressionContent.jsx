import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegressionGraph } from './RegressionGraph';

export const MultipleRegressionContent = ({ result, points, equations }) => {
  return (
    <>
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
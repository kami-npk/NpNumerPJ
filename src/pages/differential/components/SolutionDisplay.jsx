import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SolutionDisplay = ({ solution }) => {
  if (!solution) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Solution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="katex-solution" dangerouslySetInnerHTML={{ __html: solution }} />
      </CardContent>
    </Card>
  );
};
import React from 'react';
import { RegressionGraph as SharedRegressionGraph } from '@/components/shared/RegressionGraph';

export const RegressionGraph = ({ points, regressionLine }) => {
  const data = points.map(point => ({
    x: point.x,
    y: point.fx || point.y
  }));

  return (
    <SharedRegressionGraph 
      data={data}
      regressionLine={regressionLine}
      xLabel="x"
      yLabel="f(x)"
    />
  );
};
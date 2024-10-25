import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const RegressionGraph = ({ data, regressionLine, xLabel = 'x', yLabel = 'y' }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis 
          type="number" 
          dataKey="x" 
          name={xLabel}
          label={{ value: xLabel, position: 'bottom' }}
        />
        <YAxis 
          type="number" 
          dataKey="y" 
          name={yLabel}
          label={{ value: yLabel, angle: -90, position: 'insideLeft' }}
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Data Points" data={data} fill="#8884d8" />
        {regressionLine && (
          <Line
            name="Regression Line"
            data={regressionLine}
            type="monotone"
            dataKey="y"
            stroke="#ff7300"
            dot={false}
            activeDot={false}
          />
        )}
      </ScatterChart>
    </ResponsiveContainer>
  );
};
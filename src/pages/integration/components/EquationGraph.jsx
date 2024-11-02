import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import { generateGraphData } from './SimpsonCalculation';

export const EquationGraph = ({ equation, a, b, n }) => {
  const data = generateGraphData(equation, a, b, n);
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="x" 
          type="number"
          domain={['auto', 'auto']}
          label={{ value: 'x', position: 'bottom' }}
        />
        <YAxis 
          label={{ value: 'f(x)', angle: -90, position: 'insideLeft' }}
          domain={['auto', 'auto']}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="y"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.3}
        />
        <Line 
          type="monotone" 
          dataKey="y" 
          stroke="#8884d8" 
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
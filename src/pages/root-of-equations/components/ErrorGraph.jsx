import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const ErrorGraph = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="iteration" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="error" stroke="#82ca9d" name="Error (%)" />
    </LineChart>
  </ResponsiveContainer>
);
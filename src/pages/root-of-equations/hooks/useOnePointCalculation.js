import { useState } from 'react';
import { evaluate } from 'mathjs';

export const useCalculation = () => {
  const [result, setResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [errorData, setErrorData] = useState([]);

  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

  const calculateRoot = (equation, x0) => {
    let x = x0;
    let iter = 0;
    const MAX_ITER = 50;
    const EPSILON = 0.000001;
    const newIterations = [];
    const newErrorData = [];

    do {
      const xNew = evaluate(equation, { x });
      const ea = error(x, xNew);
      
      iter++;
      newIterations.push({ iteration: iter, x: xNew, error: ea });
      newErrorData.push({ iteration: iter, error: ea });
      
      if (ea < EPSILON) {
        setResult(xNew);
        break;
      }
      
      x = xNew;
    } while (iter < MAX_ITER);

    setIterations(newIterations);
    setErrorData(newErrorData);

    // Generate equation graph data
    const graphData = [];
    const step = 0.1;
    for (let x = -5; x <= 5; x += step) {
      graphData.push({
        x,
        y: evaluate(equation, { x })
      });
    }
    setGraphData(graphData);
  };

  return { result, iterations, graphData, errorData, calculateRoot };
};
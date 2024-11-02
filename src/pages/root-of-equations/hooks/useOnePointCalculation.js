import { useState } from 'react';
import { evaluate } from 'mathjs';

export const useCalculation = () => {
  const [result, setResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [errorData, setErrorData] = useState([]);

  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

  const calculateRoot = (equation, x0) => {
    let x = parseFloat(x0);
    let iter = 0;
    const MAX_ITER = 50;
    const EPSILON = 0.000001;
    const newIterations = [];
    const newErrorData = [];
    const newGraphData = [];

    try {
      // Generate graph data first
      const xMin = x - 10;
      const xMax = x + 10;
      const step = (xMax - xMin) / 100;
      
      for (let xi = xMin; xi <= xMax; xi += step) {
        try {
          const y = evaluate(equation, { x: xi });
          newGraphData.push({ x: xi, y });
        } catch (error) {
          console.error('Error evaluating equation for graph:', error);
        }
      }

      // Calculate iterations
      let xOld = x;
      do {
        const xNew = evaluate(equation, { x });
        const ea = error(x, xNew);
        
        iter++;
        newIterations.push({ 
          iteration: iter, 
          x: xNew,
          error: ea 
        });
        newErrorData.push({ 
          iteration: iter, 
          error: ea 
        });
        
        if (ea < EPSILON || iter >= MAX_ITER) {
          setResult(xNew);
          break;
        }
        
        xOld = x;
        x = xNew;
      } while (true);

      setIterations(newIterations);
      setErrorData(newErrorData);
      setGraphData(newGraphData);
    } catch (error) {
      console.error('Error in calculation:', error);
      setResult(null);
      setIterations([]);
      setErrorData([]);
      setGraphData([]);
    }
  };

  return { result, iterations, graphData, errorData, calculateRoot };
};
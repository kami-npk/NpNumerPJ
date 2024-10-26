import { evaluate } from 'mathjs';

export const error = (xold, xnew) => {
  if (xold == null || xnew == null || xnew === 0) return 0;
  return Math.abs((xnew - xold) / xnew) * 100;
};

export const calculateSecant = (equation, x1, x2) => {
  const fx = (x) => {
    try {
      return evaluate(equation, { x });
    } catch (err) {
      console.error('Error evaluating equation:', err);
      return 0;
    }
  };
  
  const EPSILON = 0.000001;
  let iter = 0;
  const MAX_ITER = 50;
  
  let xDataOld = [];
  let xDataNew = [];
  let errData = [];
  let iterData = [];
  
  const calculate = (x1, x2) => {
    const f_x1 = fx(x1);
    const f_x2 = fx(x2);
    
    // Check for division by zero
    if (Math.abs(f_x1 - f_x2) < EPSILON) {
      return {
        result: x2,
        xOld: xDataOld,
        xNew: xDataNew,
        errors: errData,
        iterations: iterData
      };
    }
    
    const x3 = x2 - (f_x2 * (x1 - x2) / (f_x1 - f_x2));
    
    if (Math.abs(x3 - x2) < EPSILON || iter >= MAX_ITER) {
      return {
        result: x3,
        xOld: xDataOld,
        xNew: xDataNew,
        errors: errData,
        iterations: iterData
      };
    }
    
    iter++;
    const err = error(x2, x3);
    xDataOld.push(x2);
    xDataNew.push(x3);
    errData.push(err);
    iterData.push(iter);
    
    return calculate(x2, x3);
  };
  
  return calculate(x1, x2);
};
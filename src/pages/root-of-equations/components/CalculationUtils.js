import { evaluate, derivative, parse } from 'mathjs';

export const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

export const diffEquation = (eq) => {
  try {
    const derivativeExpr = derivative(parse(eq), 'x').toString();
    return derivativeExpr;
  } catch (error) {
    console.error('Error differentiating the equation:', error);
    return '';
  }
};

export const calculateNewtonRaphson = (x, equation) => {
  return x - (evaluate(equation, { x }) / evaluate(diffEquation(equation), { x }));
};
import { lusolve, evaluate } from 'mathjs';

export const calculatePolynomialRegression = (points, findX, order) => {
  const n = points.length;
  let A = Array.from({ length: order + 1 }, () => Array(order + 1).fill(0));
  let B = Array(order + 1).fill(0);

  // Build matrices
  for (let i = 0; i < n; i++) {
    let xi = points[i].x;
    let yi = points[i].fx;
    B[0] += yi;

    for (let j = 1; j <= order; j++) {
      B[j] += Math.pow(xi, j) * yi;
    }

    for (let j = 0; j <= order; j++) {
      for (let l = 0; l <= order; l++) {
        A[j][l] += Math.pow(xi, j + l);
      }
    }
  }

  const resultA = lusolve(A, B);
  const coefficients = resultA.map(Number);

  let result = coefficients[0];
  for (let j = 1; j <= order; j++) {
    result += coefficients[j] * Math.pow(findX, j);
  }

  let equation = `${coefficients[0].toFixed(4)}`;
  for (let i = 1; i < order + 1; i++) {
    equation += ` + (${coefficients[i].toFixed(4)})x^${i}`;
  }

  return { A, B, coefficients, result, equation };
};

export const generateMatrixEquation = (order) => {
  let eq = '\\begin{bmatrix} n';
  
  // First row
  for (let j = 1; j < order + 1; j++) {
    eq += ` & \\sum_{i=1}^{n} x_i`;
    if (j > 1) eq += `^${j}`;
  }
  eq += ` \\\\`;

  // Remaining rows
  for (let j = 1; j < order + 1; j++) {
    eq += `\\sum_{i=1}^{n} x_i`;
    if (j > 1) eq += `^${j}`;
    for (let l = 1; l < order + 1; l++) {
      eq += ` & \\sum_{i=1}^{n} x_i^${j + l}`;
    }
    eq += ` \\\\`;
  }
  eq += `\\end{bmatrix}`;

  // Matrix X
  eq += `\\begin{bmatrix}`;
  for (let j = 0; j < order + 1; j++) {
    eq += ` a_${j} \\\\`;
  }
  eq += `\\end{bmatrix}=`;

  // Matrix B
  eq += `\\begin{bmatrix}`;
  for (let j = 0; j < order + 1; j++) {
    if (j === 0) {
      eq += `\\sum_{i=1}^{n} y_i \\\\`;
    } else if (j === 1) {
      eq += `\\sum_{i=1}^{n} x_iy_i \\\\`;
    } else {
      eq += `\\sum_{i=1}^{n} x_i^${j} y_i \\\\`;
    }
  }
  eq += `\\end{bmatrix}`;

  return eq;
};
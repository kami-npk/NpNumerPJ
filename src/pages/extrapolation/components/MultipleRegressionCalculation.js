import { lusolve } from 'mathjs';

export const calculateMultipleRegression = (points, findX, K) => {
  const n = points.length;
  let A = Array.from({ length: K + 1 }, () => Array(K + 1).fill(0));
  let B = Array(K + 1).fill(0);

  // Build matrices
  A[0][0] = n;
  for (let i = 0; i < n; i++) {
    let yi = points[i].fx;
    B[0] += yi;

    for (let j = 0; j < K; j++) {
      let xji = points[i].x[j];
      A[0][j + 1] += xji;
      A[j + 1][0] += xji;
      B[j + 1] += xji * yi;

      for (let l = 0; l < K; l++) {
        let xli = points[i].x[l];
        A[j + 1][l + 1] += xji * xli;
      }
    }
  }

  const resultA = lusolve(A, B);
  const slopes = resultA.slice(1).map(Number);
  const intercept = Number(resultA[0]);

  let result = intercept;
  for (let j = 0; j < K; j++) {
    result += slopes[j] * findX[j];
  }

  return {
    A,
    B,
    slopes,
    intercept,
    result
  };
};
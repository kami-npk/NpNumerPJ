export const calculateCholesky = (matrixA, dimension) => {
  const L = Array(dimension).fill().map(() => Array(dimension).fill(0));
  const stepsList = [];

  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;
      if (i === j) {
        for (let k = 0; k < j; k++) {
          sum += L[j][k] * L[j][k];
        }
        L[j][j] = Math.sqrt(matrixA[j][j] - sum);
      } else {
        for (let k = 0; k < j; k++) {
          sum += L[i][k] * L[j][k];
        }
        L[i][j] = (matrixA[i][j] - sum) / L[j][j];
      }
    }
    stepsList.push({
      description: `Step ${i + 1}`,
      matrix: { L: L.map(row => row.slice()) }
    });
  }

  return { L, stepsList };
};

export const solveSystem = (L, matrixB, dimension) => {
  // Solve LY = B
  const Y = Array(dimension).fill(0);
  for (let i = 0; i < dimension; i++) {
    Y[i] = matrixB[i];
    for (let j = 0; j < i; j++) {
      Y[i] -= L[i][j] * Y[j];
    }
    Y[i] /= L[i][i];
  }

  // Solve L^TX = Y
  const X = Array(dimension).fill(0);
  for (let i = dimension - 1; i >= 0; i--) {
    X[i] = Y[i];
    for (let j = i + 1; j < dimension; j++) {
      X[i] -= L[j][i] * X[j];
    }
    X[i] /= L[i][i];
  }

  return { X, Y };
};
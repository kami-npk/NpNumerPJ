export const calculateJacobi = (matrixA, matrixB, initialX, dimension) => {
  const tolerance = 0.00001;
  let currentX = [...initialX];
  const steps = [];
  const maxIterations = 100;

  for (let k = 0; k < maxIterations; k++) {
    let nextX = [...currentX];
    let maxError = 0;

    for (let i = 0; i < dimension; i++) {
      let sum = 0;
      for (let j = 0; j < dimension; j++) {
        if (j !== i) {
          sum += matrixA[i][j] * currentX[j];
        }
      }
      nextX[i] = (matrixB[i] - sum) / matrixA[i][i];
      maxError = Math.max(maxError, Math.abs(nextX[i] - currentX[i]));
    }

    const errors = nextX.map((value, index) => 
      Math.abs(value - currentX[index]) < tolerance ? 0 : 
      (Math.abs(value - currentX[index]) / Math.abs(value) * 100)
    );

    steps.push({
      iteration: k + 1,
      values: nextX.map(v => v),
      errors: errors
    });

    if (maxError < tolerance) break;
    currentX = [...nextX];
  }

  return { solution: currentX, steps };
};
const multiplyMatrices = (A, B) => A.map((row, i) => [row.reduce((sum, el, j) => sum + el * B[j][0], 0)]);
const scalarMultiplyMatrix = (M, scalar) => M.map(row => [row[0] * scalar]);
const subtractMatrices = (A, B) => A.map((row, i) => [row[0] - B[i][0]]);
const addMatrices = (A, B) => A.map((row, i) => [row[0] + B[i][0]]);
const transposeMatrix = M => M[0].map((_, colIndex) => M.map(row => row[colIndex]));

const findR = (A, B, X) => subtractMatrices(multiplyMatrices(A, X), B);

const findError = (R, B) => {
  const errorNorm = Math.sqrt(R.reduce((sum, row) => sum + row[0] ** 2, 0));
  const referenceNorm = Math.sqrt(B.reduce((sum, row) => sum + row[0] ** 2, 0));
  return (errorNorm / referenceNorm);
};

const findRambda = (A, D, R) => {
  const numerator = multiplyMatrices(transposeMatrix(D), R)[0][0];
  const denominator = multiplyMatrices(transposeMatrix(D), multiplyMatrices(A, D))[0][0];
  return -numerator / denominator;
};

const findX = (X, rambda, D) => addMatrices(X, scalarMultiplyMatrix(D, rambda));

const findAlpha = (Rnew, A, D) => {
  const numerator = multiplyMatrices(transposeMatrix(Rnew), Rnew)[0][0];
  const denominator = multiplyMatrices(transposeMatrix(D), multiplyMatrices(A, D))[0][0];
  return numerator / denominator;
};

const findD = (Rnew, alpha, D) => subtractMatrices(scalarMultiplyMatrix(D, alpha), Rnew);

export const calculateConjugateGradient = (matrixA, matrixB, initialX, dimension) => {
  const A = matrixA;
  const B = matrixB.map(val => [val]);
  let X = initialX.map(val => [val]);
  
  const steps = [];
  let R = findR(A, B, X);
  let D = scalarMultiplyMatrix(R, -1);
  let error = findError(R, B);
  
  const maxIterations = 100;
  const tolerance = 0.01;
  
  for (let iter = 0; iter < maxIterations && error > tolerance; iter++) {
    const rambda = findRambda(A, D, R);
    const newX = findX(X, rambda, D);
    const newR = findR(A, B, newX);
    const newError = findError(newR, B);
    const alpha = findAlpha(newR, A, D);
    const newD = findD(newR, alpha, D);
    
    steps.push({
      iteration: iter + 1,
      lambda: rambda,
      D: D.map(row => row[0]),
      X: newX.map(row => row[0]),
      R: newR.map(row => row[0]),
      error: newError
    });
    
    X = newX;
    R = newR;
    D = newD;
    error = newError;
  }
  
  return { solution: X.map(val => val[0]), steps };
};
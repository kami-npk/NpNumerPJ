import { evaluate, derivative } from 'mathjs';

export const forwardCalculate = (f, x, h, order) => {
  let result, formula;
  switch (order) {
    case "1":
      result = (f(x + h) - f(x)) / h;
      formula = `f'(x) = [ f(x_{i+1}) - f(x_{i}) ] / h`;
      break;
    case "2":
      result = (f(x + 2*h) - 2*f(x + h) + f(x)) / (h**2);
      formula = `f''(x) = [ f(x_{i+2}) - 2f(x_{i+1}) + f(x_{i}) ] / h^2`;
      break;
    case "3":
      result = (f(x + 3*h) - 3*f(x + 2*h) + 3*f(x + h) - f(x)) / (h**3);
      formula = `f'''(x) = [ f(x_{i+3}) - 3f(x_{i+2}) + 3f(x_{i+1}) - f(x_{i}) ] / h^3`;
      break;
    case "4":
      result = (f(x + 4*h) - 4*f(x + 3*h) + 6*f(x + 2*h) - 4*f(x + h) + f(x)) / (h**4);
      formula = `f''''(x) = [ f(x_{i+4}) - 4f(x_{i+3}) + 6f(x_{i+2}) - 4f(x_{i+1}) + f(x_{i}) ] / h^4`;
      break;
    default:
      throw new Error("Invalid order");
  }
  return { result, formula };
};

export const backwardCalculate = (f, x, h, order) => {
  let result, formula;
  switch (order) {
    case "1":
      result = (f(x) - f(x - h)) / h;
      formula = `f'(x) = [ f(x_{i}) - f(x_{i-1}) ] / h`;
      break;
    case "2":
      result = (f(x) - 2*f(x - h) + f(x - 2*h)) / (h**2);
      formula = `f''(x) = [ f(x_{i}) - 2f(x_{i-1}) + f(x_{i-2}) ] / h^2`;
      break;
    case "3":
      result = (f(x) - 3*f(x - h) + 3*f(x - 2*h) - f(x - 3*h)) / (h**3);
      formula = `f'''(x) = [ f(x_{i}) - 3f(x_{i-1}) + 3f(x_{i-2}) - f(x_{i-3}) ] / h^3`;
      break;
    case "4":
      result = (f(x) - 4*f(x - h) + 6*f(x - 2*h) - 4*f(x - 3*h) + f(x - 4*h)) / (h**4);
      formula = `f''''(x) = [ f(x_{i}) - 4f(x_{i-1}) + 6f(x_{i-2}) - 4f(x_{i-3}) + f(x_{i-4}) ] / h^4`;
      break;
    default:
      throw new Error("Invalid order");
  }
  return { result, formula };
};

export const centerCalculate = (f, x, h, order) => {
  let result, formula;
  switch (order) {
    case "1":
      result = (f(x + h) - f(x - h)) / (2*h);
      formula = `f'(x) = [ f(x_{i+1}) - f(x_{i-1}) ] / 2h`;
      break;
    case "2":
      result = (f(x + h) - 2*f(x) + f(x - h)) / (h**2);
      formula = `f''(x) = [ f(x_{i+1}) - 2f(x_{i}) + f(x_{i-1}) ] / h^2`;
      break;
    case "3":
      result = (f(x + 2*h) - 2*f(x + h) + 2*f(x - h) - f(x - 2*h)) / (2*(h**3));
      formula = `f'''(x) = [ f(x_{i+2}) - 2f(x_{i+1}) + 2f(x_{i-1}) - f(x_{i-2}) ] / 2h^3`;
      break;
    case "4":
      result = (f(x + 2*h) - 4*f(x + h) + 6*f(x) - 4*f(x - h) + f(x - 2*h)) / (h**4);
      formula = `f''''(x) = [ f(x_{i+2}) - 4f(x_{i+1}) + 6f(x_{i}) - 4f(x_{i-1}) + f(x_{i-2}) ] / h^4`;
      break;
    default:
      throw new Error("Invalid order");
  }
  return { result, formula };
};
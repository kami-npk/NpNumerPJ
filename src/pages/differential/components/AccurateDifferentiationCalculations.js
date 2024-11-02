import { evaluate, derivative } from 'mathjs';

export const forwardCalculate = (f, x, h, selectedOrder) => {
  const fxip5 = f(x+(5*h));
  const fxip4 = f(x+(4*h));
  const fxip3 = f(x+(3*h));
  const fxip2 = f(x+(2*h));
  const fxip1 = f(x+(1*h));
  const fxi = f(x);

  let result, formulaLatex, subFormulaLatex;

  switch (selectedOrder) {
    case "1":
      result = ((-1*fxip2)+(4*fxip1)+(-3*fxi))/(2*h);
      formulaLatex = `f'(x) = [ -f(x_{i+2}) + 4f(x_{i+1}) - 3f(x_{i}) ] / 2h`;
      subFormulaLatex = `f'(${x}) = [ (${-1*fxip2}) + (${4*fxip1}) - (${3*fxi}) ] / (${2*h}) = ${result}`;
      break;
    case "2":
      result = ((-1*fxip3)+(4*fxip2)-(5*fxip1)+(2*fxi))/(h**2);
      formulaLatex = `f''(x) = [ -f(x_{i+3}) + 4f(x_{i+2}) - 5f(x_{i+1}) + 2f(x_{i}) ] / h^2`;
      subFormulaLatex = `f''(${x}) = [ (${-1*fxip3}) + (${4*fxip2}) - (${5*fxip1}) + (${2*fxi}) ] / (${h**2}) = ${result}`;
      break;
    case "3":
      result = ((-3*fxip4)+(14*fxip3)-(24*fxip2)+(18*fxip1)-(5*fxi))/(2*(h**3));
      formulaLatex = `f'''(x) = [ -3f(x_{i+4}) + 14f(x_{i+3}) - 24f(x_{i+2}) + 18f(x_{i+1}) - 5f(x_{i})] / 2h^3`;
      subFormulaLatex = `f'''(${x}) = [ (${-3*fxip4}) + (${14*fxip3}) - (${24*fxip2}) + (${18*fxip1}) - (${5*fxi}) ] / (${2*(h**3)}) = ${result}`;
      break;
    case "4":
      result = ((-2*fxip5)+(11*fxip4)-(24*fxip3)+(26*fxip2)-(14*fxip1)+(3*fxi))/((h**4));
      formulaLatex = `f''''(x) = [ -2f(x_{i+5}) + 11f(x_{i+4}) - 24f(x_{i+3}) + 26f(x_{i+2}) - 14f(x_{i+1}) + 3f(x_{i})] / h^4`;
      subFormulaLatex = `f''''(${x}) = [ (${-2*fxip5}) + (${11*fxip4}) - (${24*fxip3}) + (${26*fxip2}) - (${14*fxip1}) + (${3*fxi}) ] / (${(h**4)}) = ${result}`;
      break;
  }
  
  return { result, formulaLatex, subFormulaLatex };
};

export const backwardCalculate = (f, x, h, selectedOrder) => {
  const fxi = f(x);
  const fxim1 = f(x-(1*h));
  const fxim2 = f(x-(2*h));
  const fxim3 = f(x-(3*h));
  const fxim4 = f(x-(4*h));
  const fxim5 = f(x-(5*h));

  let result, formulaLatex, subFormulaLatex;

  switch (selectedOrder) {
    case "1":
      result = ((3*fxi)-(4*fxim1)+(fxim2))/(2*h);
      formulaLatex = `f'(x) = [ 3f(x_{i}) - 4f(x_{i-1}) + f(x_{i-2}) ] / 2h`;
      subFormulaLatex = `f'(${x}) = [ (${3*fxi}) - (${4*fxim1}) + (${fxim2}) ] / (${2*h}) = ${result}`;
      break;
    case "2":
      result = ((2*fxi)-(5*fxim1)+(4*fxim2)-(fxim3))/(h**2);
      formulaLatex = `f'(x) = [ 2f(x_{i}) - 5f(x_{i-1}) + 4f(x_{i-2}) - f(x_{i-3})] / h^2`;
      subFormulaLatex = `f'(${x}) = [ (${2*fxi}) - (${5*fxim1}) + (${4*fxim2}) - (${fxim3})] / (${h**2}) = ${result}`;
      break;
    case "3":
      result = ((5*fxi)-(18*fxim1)+(24*fxim2)-(14*fxim3)+(3*fxim4))/(2*(h**3));
      formulaLatex = `f'(x) = [ 5f(x_{i}) - 18f(x_{i-1}) + 24f(x_{i-2}) - 14f(x_{i-3}) + 3f(x_{i-4})] / 2h^3`;
      subFormulaLatex = `f'(${x}) = [ (${5*fxi}) - (${18*fxim1}) + (${24*fxim2}) - (${14*fxim3}) + (${3*fxim4})] / (${2*(h**3)}) = ${result}`;
      break;
    case "4":
      result = ((3*fxi)-(14*fxim1)+(26*fxim2)-(24*fxim3)+(11*fxim4)-(2*fxim5))/((h**4));
      formulaLatex = `f'(x) = [ 3f(x_{i}) - 14f(x_{i-1}) + 26f(x_{i-2}) - 24f(x_{i-3}) + 11f(x_{i-4}) - 2f(x_{i-5})] / h^4`;
      subFormulaLatex = `f'(${x}) = [ (${3*fxi}) - (${14*fxim1}) + (${26*fxim2}) - (${24*fxim3}) + (${11*fxim4}) - (${2*fxim5})] / (${(h**4)}) = ${result}`;
      break;
  }

  return { result, formulaLatex, subFormulaLatex };
};

export const centerCalculate = (f, x, h, selectedOrder) => {
  const fxip4 = f(x+(4*h));
  const fxip3 = f(x+(3*h));
  const fxip2 = f(x+(2*h));
  const fxip1 = f(x+(1*h));
  const fxi = f(x);
  const fxim1 = f(x-(1*h));
  const fxim2 = f(x-(2*h));
  const fxim3 = f(x-(3*h));
  const fxim4 = f(x-(4*h));

  let result, formulaLatex, subFormulaLatex;

  switch (selectedOrder) {
    case "1":
      result = ((-1*fxip2)+(8*fxip1)-(8*fxim1)+(fxim2))/(12*h);
      formulaLatex = `f'(x) = [ -f(x_{i+2}) + 8f(x_{i+1}) - 8f(x_{i-1}) + f(x_{i-2})] / 12h`;
      subFormulaLatex = `f'(${x}) = [ (${-1*fxip2}) + (${8*fxip1}) - (${8*fxim1}) + (${fxim2})] / (${12*h}) = ${result}`;
      break;
    case "2":
      result = ((-1*fxip2)+(16*fxip1)-(30*fxi)+(16*fxim1)-(fxim2))/(12*(h**2));
      formulaLatex = `f'(x) = [ -f(x_{i+2}) + 16f(x_{i+1}) - 30f(x_{i}) + 16f(x_{i-1}) - f(x_{i-2})] / 12h^2`;
      subFormulaLatex = `f'(${x}) = [ (${-1*fxip2}) + (${16*fxip1}) - (${30*fxi}) + (${16*fxim1}) - (${fxim2})] / (${12*(h**2)}) = ${result}`;
      break;
    case "3":
      result = ((-1*fxip3)+(8*fxip2)-(13*fxip1)+(13*fxim1)-(8*fxim2)+(fxim3))/(8*(h**3));
      formulaLatex = `f'(x) = [ -f(x_{i+3}) + 8f(x_{i+2}) - 13f(x_{i+1}) + 13f(x_{i-1}) - 8f(x_{i-2}) + f(x_{i-3})] / 8h^3`;
      subFormulaLatex = `f'(${x}) = [ (${-1*fxip3}) + (${8*fxip2}) - (${13*fxip1}) + (${13*fxim1}) - (${8*fxim2}) + (${fxim3})] / (${8*(h**3)}) = ${result}`;
      break;
    case "4":
      result = ((-1*fxip3)+(12*fxip2)-(39*fxip1)+(56*fxi)-(39*fxim1)+(12*fxim2)-(fxim3))/(6*(h**4));
      formulaLatex = `f'(x) = [ -f(x_{i+3}) + 12f(x_{i+2}) - 39f(x_{i+1}) + 56f(x_{i}) - 39f(x_{i-1}) + 12f(x_{i-2}) - f(x_{i-3})] / 6h^4`;
      subFormulaLatex = `f'(${x}) = [ (${-1*fxip3}) + (${12*fxip2}) - (${39*fxip1}) + (${56*fxi}) - (${39*fxim1}) + (${12*fxim2}) - (${fxim3})] / (${6*(h**4)}) = ${result}`;
      break;
  }

  return { result, formulaLatex, subFormulaLatex };
};

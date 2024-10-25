import { evaluate } from 'mathjs';

export const calculateSimpsonArea = (equation, a, b, n) => {
  const fa = evaluate(equation, { x: a });
  const fb = evaluate(equation, { x: b });
  let integrateArea = 0;
  let solutionLatex = '';

  if (n === 1) {
    const h = (b - a) / 2;
    const fmid = evaluate(equation, { x: (a + b) / 2 });
    integrateArea = (h / 3) * (fa + (4 * fmid) + fb);
    
    solutionLatex = `\\displaystyle
      Evaluate \\ ; \\ I = \\int_{a}^{b} f(x) \\ dx \\ = \\int_{${a}}^{${b}} ${equation} \\ dx \\\\
      when \\ \\ x_0 = a \\ ,\\ x_1 = \\frac{a+b}{2} \\,\\  x_n = b \\\\
      From \\ \\ \\ I = \\frac{h}{3} [f(x_0) + 4f(x_1) + f(x_2)] \\ ; \\ h = \\frac{b-a}{2} \\\\
      Simpson \\ Integral \\ ; I = \\frac{${h}}{3} [(${fa}) + 4(${fmid}) + (${fb})] = ${Math.abs(integrateArea)}
    `;
  } else {
    const h = (b - a) / (n * 2);
    let fodd = 0;
    let feven = 0;

    for (let i = 1; i <= (n * 2) - 1; i++) {
      const xi = a + (i * h);
      const fxi = evaluate(equation, { x: xi });
      
      if (i % 2 === 0) {
        feven += fxi;
      } else {
        fodd += fxi;
      }
    }

    integrateArea = (h / 3) * (fa + fb + (4 * fodd) + (2 * feven));
    
    solutionLatex = `\\displaystyle
      Evaluate \\ ; \\ I = \\int_{a}^{b} f(x) \\ dx \\ = \\int_{${a}}^{${b}} ${equation} \\ dx \\\\
      when \\ \\ x_0 = a \\ ,\\ x_i = x_0+ih \\,\\  x_n = b \\\\
      From \\ \\ \\ I = \\frac{h}{3} [f(x_0) + f(x_n) + 4\\sum f(x_{odd}) + 2\\sum f(x_{even})] \\ ; \\ h = \\frac{b-a}{${n*2}} \\\\
      Simpson \\ Integral \\ ; I = \\frac{${h.toFixed(6)}}{3} [(${fa}) + (${fb}) + 4(${fodd.toFixed(6)}) + 2(${feven.toFixed(6)})] = ${Math.abs(integrateArea).toFixed(6)}
    `;
  }

  return { area: Math.abs(integrateArea), solutionLatex };
};

export const generateGraphData = (equation, a, b, n) => {
  const points = [];
  const h = (b - a) / (n * 2);
  
  // Generate points including endpoints and all intermediate points
  for (let i = 0; i <= n * 2; i++) {
    const x = a + (i * h);
    const y = evaluate(equation, { x });
    points.push({ x, y });
  }
  
  return points;
};
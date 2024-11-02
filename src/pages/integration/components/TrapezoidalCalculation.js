import { evaluate } from 'mathjs';

export const calculateTrapezoidalArea = (equation, a, b, n) => {
  const h = (b - a) / n;
  const fa = evaluate(equation, { x: a });
  const fb = evaluate(equation, { x: b });
  
  let sum_fx = 0;
  for (let i = 1; i < n; i++) {
    const xi = a + i * h;
    sum_fx += evaluate(equation, { x: xi });
  }
  
  const area = (h / 2) * (fa + fb + (2 * sum_fx));
  
  const solutionLatex = `\\displaystyle
    Evaluate \\ ; \\ I = \\int_{a}^{b} f(x) \\ dx \\ = \\int_{${a}}^{${b}} ${equation} \\ dx \\\\
    when \\ \\ x_0 = a \\ ,\\  x_n = b \\ ,\\  n = ${n} \\\\
    From \\ \\ \\ I = \\frac{h}{2} \\left[f(x_0) + f(x_n) + 2 \\sum_{i=1}^{n-1} f(x_i) \\right] \\ ; \\ h = \\frac{b-a}{n} = ${h} \\\\
    Trapezoidal \\ Integral \\ ; I = \\frac{${h}}{2} \\left[(${fa}) + (${fb}) + (${sum_fx*2})\\right] = ${area}`;

  return { area, solutionLatex };
};

export const generateGraphData = (equation, a, b, n) => {
  const xlNum = parseFloat(a) - 1;
  const xrNum = parseFloat(b) + 1;
  const stepSize = (xrNum - xlNum) / 100;
  
  const xValues = Array.from({ length: 100 }, (_, i) => xlNum + (i * stepSize));
  const yValues = xValues.map(x => {
    try {
      return evaluate(equation, { x });
    } catch (error) {
      console.error(`Error evaluating equation at x=${x}:`, error);
      return null;
    }
  });

  const segmentSize = (b - a) / n;
  const segments = [];
  
  for (let i = a; i < b; i += segmentSize) {
    const end = Math.min(i + segmentSize, b);
    const startY = evaluate(equation, { x: i });
    const endY = evaluate(equation, { x: end });
    segments.push({
      start: { x: i, y: startY },
      end: { x: end, y: endY }
    });
  }

  return { xValues, yValues, segments };
};
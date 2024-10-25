import React, { useState } from 'react';
import { evaluate, derivative } from 'mathjs';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { AccurateDifferentiationForm } from './components/AccurateDifferentiationForm';
import { SolutionDisplay } from './components/SolutionDisplay';
import { forwardCalculate, backwardCalculate, centerCalculate } from './components/AccurateDifferentiationCalculations';

const AccurateNumericalDifferentiation = () => {
  const [equation, setEquation] = useState("");
  const [x, setX] = useState("");
  const [h, setH] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("1");
  const [selectedDirection, setSelectedDirection] = useState("1");
  const [solution, setSolution] = useState(null);
  const [result, setResult] = useState(null);

  const f = (x) => {
    return evaluate(equation, { x });
  };

  const calculateDifferentiation = () => {
    if (!equation || !x || !h) return;

    const xNum = parseFloat(x);
    const hNum = parseFloat(h);
    let titleLatex = '';
    let method;

    titleLatex = ["First", "Second", "Third", "Fourth"][parseInt(selectedOrder) - 1] + " ";

    switch (selectedDirection) {
      case "1":
        titleLatex += "Forward Divided-Differences ; O(h^2)";
        method = forwardCalculate;
        break;
      case "2":
        titleLatex += "Backward Divided-Differences ; O(h^2)";
        method = backwardCalculate;
        break;
      case "3":
        titleLatex += "Central Divided-Differences ; O(h^4)";
        method = centerCalculate;
        break;
    }

    const { result, formulaLatex, subFormulaLatex } = method(f, xNum, hNum, selectedOrder);
    
    let diffEquation = equation;
    let exactDiffLatex = `Exact\\ Differentiation\\ of\\ f(x) = ${equation}\\\\`;
    let symbol = "'";
    
    for (let i = 1; i <= parseInt(selectedOrder); i++) {
      diffEquation = derivative(diffEquation, 'x').toString();
      exactDiffLatex += `f${symbol}(x) = ${diffEquation}\\\\`;
      symbol += "'";
    }

    const exactValue = evaluate(diffEquation, { x: xNum });
    exactDiffLatex += `At\\ x = ${xNum}\\ ;\\ f${symbol}(${xNum}) = ${exactValue}\\\\`;

    const error = Math.abs((result - exactValue) / exactValue) * 100;
    const errorLatex = `\\displaystyle e = \\left|\\frac{f${symbol}(x)_{numerical} - f${symbol}(x)_{true}}{f${symbol}(x)_{true}}\\right| \\times 100\\% = ${error.toFixed(4)}\\%`;

    const solutionLatex = `
      ${titleLatex}\\\\
      ${formulaLatex}\\\\
      ${subFormulaLatex}\\\\
      ${exactDiffLatex}\\\\
      ${errorLatex}
    `;

    setSolution(katex.renderToString(solutionLatex, {
      displayMode: true,
      throwOnError: false,
    }));
    setResult(result);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Accurate Numerical Differentiation</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="max-w-md mx-auto">
          <AccurateDifferentiationForm
            equation={equation}
            x={x}
            h={h}
            selectedOrder={selectedOrder}
            selectedDirection={selectedDirection}
            setEquation={setEquation}
            setX={setX}
            setH={setH}
            setSelectedOrder={setSelectedOrder}
            setSelectedDirection={setSelectedDirection}
            onCalculate={calculateDifferentiation}
            result={result}
          />
        </div>

        <SolutionDisplay solution={solution} />
      </div>
    </div>
  );
};

export default AccurateNumericalDifferentiation;
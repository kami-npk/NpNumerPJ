import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputForm } from './components/InputForm';
import { calculateTrapezoidalArea, generateGraphData } from './components/TrapezoidalCalculation';
import Plot from 'react-plotly.js';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const TrapezoidalRule = () => {
  const [equation, setEquation] = useState("x^2");
  const [a, setA] = useState("0");
  const [b, setB] = useState("2");
  const [n, setN] = useState("4");
  const [result, setResult] = useState(null);
  const [solution, setSolution] = useState("");

  const getEquationApi = async () => {
    try {
      const response = await fetch("https://pj-numer-api.onrender.com/integrateData/random");
      const data = await response.json();
      if (data) {
        setEquation(data.fx);
        setA(parseFloat(data.a).toFixed(4));
        setB(parseFloat(data.b).toFixed(4));
        setN(parseFloat(data.n));
      }
    } catch (error) {
      console.error("Failed to fetch equation:", error);
    }
  };

  const handleCalculate = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const nNum = parseFloat(n);
    
    const { area, solutionLatex } = calculateTrapezoidalArea(equation, aNum, bNum, nNum);
    setResult(area);
    setSolution(katex.renderToString(solutionLatex, { throwOnError: false }));
  };

  const renderGraph = () => {
    if (!equation || !a || !b || !n) return null;
    
    const { xValues, yValues, segments } = generateGraphData(equation, parseFloat(a), parseFloat(b), parseFloat(n));
    
    const shapes = segments.flatMap(segment => ([
      {
        type: 'line',
        x0: segment.start.x,
        x1: segment.start.x,
        y0: 0,
        y1: segment.start.y,
        line: { color: '#117554', width: 1, dash: 'dot' }
      },
      {
        type: 'line',
        x0: segment.end.x,
        x1: segment.end.x,
        y0: 0,
        y1: segment.end.y,
        line: { color: '#117554', width: 1, dash: 'dot' }
      },
      {
        type: 'line',
        x0: segment.start.x,
        x1: segment.end.x,
        y0: segment.start.y,
        y1: segment.end.y,
        line: { color: '#117554', width: 1, dash: 'dot' }
      }
    ]));

    return (
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: 'scatter',
            mode: 'lines',
            name: 'f(x)',
            line: { color: '#5045e5' }
          }
        ]}
        layout={{
          width: 800,
          height: 400,
          title: 'Trapezoidal Rule Integration',
          shapes,
          xaxis: { title: 'x' },
          yaxis: { title: 'f(x)' }
        }}
      />
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Trapezoidal Rule</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <InputForm
            equation={equation}
            a={a}
            b={b}
            n={n}
            onEquationChange={setEquation}
            onAChange={setA}
            onBChange={setB}
            onNChange={setN}
            onCalculate={handleCalculate}
            onGetEquation={getEquationApi}
            result={result}
          />
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Graph</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              {renderGraph()}
            </CardContent>
          </Card>

          {solution && (
            <Card>
              <CardHeader>
                <CardTitle>Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center" dangerouslySetInnerHTML={{ __html: solution }} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrapezoidalRule;
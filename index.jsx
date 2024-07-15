const Calculator = () => {
  const [display, setDisplay] = React.useState('0');
  const [equation, setEquation] = React.useState('');
  const [lastResult, setLastResult] = React.useState(null);
  const [history, setHistory] = React.useState([]);
  const [memory, setMemory] = React.useState(0);

  const handleNumber = (num) => {
    if (display === '0' || lastResult !== null) {
      setDisplay(num);
      setEquation(num);
      setLastResult(null);
    } else {
      setDisplay(display + num);
      setEquation(equation + num);
    }
  };

  const handleOperator = (op) => {
    if (lastResult !== null) {
      setEquation(lastResult + op);
      setLastResult(null);
    } else {
      const lastChar = equation.slice(-1);
      if (['+', '-', '*', '/'].includes(lastChar)) {
        if (op === '-' && lastChar !== '-') {
          setEquation(equation + op);
        } else {
          setEquation(equation.slice(0, -1) + op);
        }
      } else {
        setEquation(equation + op);
      }
    }
    setDisplay(op);
  };

  const handleDecimal = () => {
    const lastNumber = display.split(/[-+*/]/).pop();
    if (!lastNumber.includes('.')) {
      setDisplay(display + '.');
      setEquation(equation + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setLastResult(null);
  };

  const handleEquals = () => {
    try {
      let result = eval(equation);
      result = parseFloat(result.toFixed(4));
      setDisplay(result.toString());
      setLastResult(result.toString());
      setHistory([...history, `${equation} = ${result}`]);
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
      setEquation(equation.slice(0, -1));
    } else {
      setDisplay('0');
      setEquation('');
    }
  };

  const handlePercentage = () => {
    try {
      const result = eval(equation) / 100;
      setDisplay(result.toString());
      setEquation(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleSquareRoot = () => {
    try {
      const result = Math.sqrt(eval(equation));
      setDisplay(result.toString());
      setEquation(`sqrt(${equation})`);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleMemoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const handleMemorySubtract = () => {
    setMemory(memory - parseFloat(display));
  };

  const handleMemoryRecall = () => {
    setDisplay(memory.toString());
    setEquation(memory.toString());
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display-container">
          <div className="equation">{equation || '0'}</div>
          <div id="display">{display}</div>
        </div>
        <div className="buttons">
          <button onClick={handleMemoryClear} className="memory">MC</button>
          <button onClick={handleMemoryRecall} className="memory">MR</button>
          <button onClick={handleMemoryAdd} className="memory">M+</button>
          <button onClick={handleMemorySubtract} className="memory">M-</button>
          <button id="clear" onClick={handleClear} className="special">AC</button>
          <button onClick={handleBackspace} className="special">⌫</button>
          <button onClick={handlePercentage} className="special">%</button>
          <button onClick={handleSquareRoot} className="special">√</button>
          <button id="seven" onClick={() => handleNumber('7')} className="number">7</button>
          <button id="eight" onClick={() => handleNumber('8')} className="number">8</button>
          <button id="nine" onClick={() => handleNumber('9')} className="number">9</button>
          <button id="divide" onClick={() => handleOperator('/')} className="operator">/</button>
          <button id="four" onClick={() => handleNumber('4')} className="number">4</button>
          <button id="five" onClick={() => handleNumber('5')} className="number">5</button>
          <button id="six" onClick={() => handleNumber('6')} className="number">6</button>
          <button id="multiply" onClick={() => handleOperator('*')} className="operator">*</button>
          <button id="one" onClick={() => handleNumber('1')} className="number">1</button>
          <button id="two" onClick={() => handleNumber('2')} className="number">2</button>
          <button id="three" onClick={() => handleNumber('3')} className="number">3</button>
          <button id="subtract" onClick={() => handleOperator('-')} className="operator">-</button>
          <button id="zero" onClick={() => handleNumber('0')} className="number">0</button>
          <button id="decimal" onClick={handleDecimal} className="number">.</button>
          <button id="equals" onClick={handleEquals} className="operator">=</button>
          <button id="add" onClick={() => handleOperator('+')} className="operator">+</button>
        </div>
      </div>
      <div className="history">
        <h3>History</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ReactDOM.render(<Calculator />, document.getElementById('root'));
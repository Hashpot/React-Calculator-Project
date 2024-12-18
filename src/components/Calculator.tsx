import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import { performCalculation } from '../utils/calculations';
import { Operation } from '../types/calculator';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [awaitingSecondOperand, setAwaitingSecondOperand] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (awaitingSecondOperand) {
      setDisplay(digit);
      setAwaitingSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperation(null);
    setAwaitingSecondOperand(false);
  };

  const performOperation = (nextOperation: Operation) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operation) {
      const result = performCalculation(firstOperand, inputValue, operation);
      setDisplay(result.toString());
      setFirstOperand(result);
    }

    setAwaitingSecondOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    if (firstOperand !== null && operation !== null) {
      const inputValue = parseFloat(display);
      const result = performCalculation(firstOperand, inputValue, operation);
      setDisplay(result.toString());
      setFirstOperand(null);
      setOperation(null);
      setAwaitingSecondOperand(true);
    }
  };

  return (
    <div className="calculator">
      <Display value={display} />
      <div className="calculator-buttons">
        {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'].map(digit => (
          <Button 
            key={digit} 
            label={digit} 
            onClick={() => inputDigit(digit)} 
          />
        ))}
        <Button label="." onClick={inputDecimal} />
        <Button label="+" variant="operation" onClick={() => performOperation('add')} />
        <Button label="-" variant="operation" onClick={() => performOperation('subtract')} />
        <Button label="*" variant="operation" onClick={() => performOperation('multiply')} />
        <Button label="/" variant="operation" onClick={() => performOperation('divide')} />
        <Button label="C" variant="clear" onClick={clearDisplay} />
        <Button label="=" variant="equals" onClick={calculate} />
      </div>
    </div>
  );
};

export default Calculator;
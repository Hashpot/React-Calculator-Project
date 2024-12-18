export const performCalculation = (
  a: number, 
  b: number, 
  operation: Operation
): number => {
  switch(operation) {
    case 'add': return a + b;
    case 'subtract': return a - b;
    case 'multiply': return a * b;
    case 'divide': 
      if (b === 0) throw new Error('Division by zero');
      return a / b;
  }
};
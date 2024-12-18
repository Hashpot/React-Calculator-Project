import React from 'react';
import Calculator from './components/Calculator';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Calculator />
    </div>
  );
};

export default App;
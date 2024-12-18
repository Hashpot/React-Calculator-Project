import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'numeric' | 'operation' | 'clear' | 'equals';
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'numeric' 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`calculator-button ${variant}`}
    >
      {label}
    </button>
  );
};

export default Button;
import React from 'react';
import clearFieldSvg from '../assets/clear-field_.svg';
import './ClearButton.css';

interface ClearButtonProps {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  'aria-label'?: string;
}

const ClearButton: React.FC<ClearButtonProps> = ({ 
  onClick, 
  className = '', 
  'aria-label': ariaLabel = 'Clear' 
}) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <button
      className={`clear-button ${className}`}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      type="button"
      aria-label={ariaLabel}
    >
      <img 
        alt="Clear" 
        className="clear-button-icon" 
        src={clearFieldSvg}
      />
    </button>
  );
};

export default ClearButton;


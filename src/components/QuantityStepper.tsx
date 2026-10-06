import React from 'react';
import { IonIcon } from '@ionic/react';
import { add, remove } from 'ionicons/icons';

interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 0,
  max = 99,
  size = 'md',
}) => {
  const isSm = size === 'sm';

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '10px',
    padding: '2px 4px',
    gap: isSm ? '6px' : '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  };

  const btnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: isSm ? '24px' : '28px',
    height: isSm ? '24px' : '28px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#162544',
    cursor: 'pointer',
    fontSize: isSm ? '14px' : '16px',
    transition: 'background-color 0.15s ease',
  };

  const textStyle: React.CSSProperties = {
    fontSize: isSm ? '13px' : '15px',
    fontWeight: '700',
    color: '#162544',
    minWidth: '18px',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle} className="quantity-stepper">
      <button
        type="button"
        style={btnStyle}
        onClick={(e) => {
          e.stopPropagation();
          onDecrease();
        }}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <IonIcon icon={remove} />
      </button>
      <span style={textStyle}>{quantity}</span>
      <button
        type="button"
        style={btnStyle}
        onClick={(e) => {
          e.stopPropagation();
          onIncrease();
        }}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <IonIcon icon={add} />
      </button>
    </div>
  );
};

export default QuantityStepper;

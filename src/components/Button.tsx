import React from 'react';
import { IonSpinner } from '@ionic/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  style,
  disabled,
  className = '',
  ...props
}) => {
  const getStyles = (): React.CSSProperties => {
    let bg = '#162544';
    let color = '#FFFFFF';
    let border = 'none';

    if (variant === 'secondary') {
      bg = '#EEF2FF';
      color = '#162544';
    } else if (variant === 'outline') {
      bg = 'transparent';
      color = '#162544';
      border = '1.5px solid #162544';
    } else if (variant === 'ghost') {
      bg = 'transparent';
      color = '#162544';
    } else if (variant === 'danger') {
      bg = '#EF4444';
      color = '#FFFFFF';
    }

    let padding = '10px 18px';
    let fontSize = '14px';
    let height = '44px';

    if (size === 'sm') {
      padding = '6px 12px';
      fontSize = '12px';
      height = '34px';
    } else if (size === 'lg') {
      padding = '14px 24px';
      fontSize = '16px';
      height = '52px';
    }

    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      backgroundColor: bg,
      color,
      border,
      borderRadius: '12px',
      padding,
      fontSize,
      fontWeight: '600',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled || loading ? 0.65 : 1,
      width: fullWidth ? '100%' : 'auto',
      transition: 'all 0.18s ease-in-out',
      boxShadow: variant === 'primary' ? '0 4px 12px rgba(22, 37, 68, 0.16)' : 'none',
      outline: 'none',
      userSelect: 'none',
      ...style,
    };
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`kolocart-btn ${className}`}
      style={getStyles()}
    >
      {loading ? (
        <IonSpinner name="dots" color={variant === 'primary' || variant === 'danger' ? 'light' : 'primary'} />
      ) : (
        <>
          {leftIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;

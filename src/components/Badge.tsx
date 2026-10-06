import React from 'react';

interface BadgeProps {
  content?: string | number;
  variant?: 'danger' | 'success' | 'warning' | 'primary' | 'neutral';
  size?: 'sm' | 'md';
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  content,
  variant = 'danger',
  size = 'md',
  children,
  className = '',
  style,
}) => {
  const getColors = () => {
    switch (variant) {
      case 'danger':
        return { bg: '#EF4444', text: '#FFFFFF' };
      case 'success':
        return { bg: '#10B981', text: '#FFFFFF' };
      case 'warning':
        return { bg: '#F59E0B', text: '#FFFFFF' };
      case 'primary':
        return { bg: '#162544', text: '#FFFFFF' };
      case 'neutral':
      default:
        return { bg: '#EEF0FD', text: '#162544' };
    }
  };

  const { bg, text } = getColors();
  const isSm = size === 'sm';

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bg,
    color: text,
    fontSize: isSm ? '10px' : '11px',
    fontWeight: '700',
    minWidth: isSm ? '16px' : '20px',
    height: isSm ? '16px' : '20px',
    borderRadius: '10px',
    padding: '0 5px',
    lineHeight: 1,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    ...style,
  };

  return (
    <span className={`kolocart-badge ${className}`} style={badgeStyle}>
      {content ?? children}
    </span>
  );
};

export default Badge;

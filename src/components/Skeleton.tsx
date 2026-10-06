import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  style?: React.CSSProperties;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '16px',
  borderRadius = '8px',
  style,
  className = '',
}) => {
  return (
    <div
      className={`kolocart-skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#E2E8F0',
        animation: 'skeleton-pulse 1.5s infinite ease-in-out',
        ...style,
      }}
    />
  );
};

export default Skeleton;

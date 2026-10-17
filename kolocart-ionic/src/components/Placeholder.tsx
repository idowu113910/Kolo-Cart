import React, { useState } from 'react';

interface PlaceholderProps {
  src: string;
  alt: string;
  fallbackText?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
  src,
  alt,
  fallbackText,
  style,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`kolocart-placeholder ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EEF0FD',
          color: '#162544',
          fontSize: '12px',
          fontWeight: '600',
          padding: '8px',
          textAlign: 'center',
          ...style,
        }}
      >
        {fallbackText || alt.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      style={style}
      className={className}
      loading="lazy"
    />
  );
};

export default Placeholder;

import React from 'react';
import { IonIcon } from '@ionic/react';
import { searchOutline, closeCircle } from 'ionicons/icons';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onClear?: () => void;
  style?: React.CSSProperties;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search supermarkets, products...',
  onClear,
  style,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F3F4FD',
        borderRadius: '24px',
        padding: '10px 16px',
        gap: '10px',
        width: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <IonIcon icon={searchOutline} style={{ color: '#94A3B8', fontSize: '18px' }} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          outline: 'none',
          fontSize: '14px',
          color: '#1E293B',
          width: '100%',
          fontFamily: 'inherit',
        }}
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            if (onClear) onClear();
          }}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            color: '#94A3B8',
          }}
          aria-label="Clear search"
        >
          <IonIcon icon={closeCircle} style={{ fontSize: '18px' }} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

import React from 'react';
import { IonIcon } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';

interface ListRowProps {
  title: string;
  subtitle?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  onClick?: () => void;
  showChevron?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const ListRow: React.FC<ListRowProps> = ({
  title,
  subtitle,
  leftElement,
  rightElement,
  onClick,
  showChevron = true,
  style,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`kolocart-list-row ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '14px 16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        gap: '12px',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
        transition: 'transform 0.12s ease, box-shadow 0.12s ease',
        ...style,
      }}
    >
      {leftElement && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {leftElement}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '15px', fontWeight: '600', color: '#1E293B' }}>{title}</div>
        {subtitle && (
          <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>{subtitle}</div>
        )}
      </div>
      {rightElement && (
        <div style={{ display: 'flex', alignItems: 'center' }}>{rightElement}</div>
      )}
      {showChevron && (
        <IonIcon
          icon={chevronForwardOutline}
          style={{ fontSize: '18px', color: '#94A3B8', flexShrink: 0 }}
        />
      )}
    </div>
  );
};

export default ListRow;

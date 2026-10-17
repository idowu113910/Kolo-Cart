import React from 'react';
import { IonIcon } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';

interface AccountRowProps {
  title: string;
  icon: string;
  badge?: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

export const AccountRow: React.FC<AccountRowProps> = ({
  title,
  icon,
  badge,
  onClick,
  style,
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px 18px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        gap: '14px',
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
        border: '1px solid rgba(226, 232, 240, 0.7)',
        marginBottom: '12px',
        transition: 'all 0.15s ease-in-out',
        ...style,
      }}
      className="account-row-card"
    >
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          backgroundColor: '#EEF0FD',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#162544',
          fontSize: '19px',
          flexShrink: 0,
        }}
      >
        <IonIcon icon={icon} />
      </div>

      <div style={{ flex: 1, minWidth: 0, fontSize: '15px', fontWeight: '600', color: '#162544' }}>
        {title}
      </div>

      {badge && (
        <span
          style={{
            fontSize: '11px',
            fontWeight: '600',
            backgroundColor: '#EEF0FD',
            color: '#4F46E5',
            padding: '3px 8px',
            borderRadius: '12px',
            marginRight: '6px',
          }}
        >
          {badge}
        </span>
      )}

      <IonIcon
        icon={chevronForwardOutline}
        style={{ fontSize: '18px', color: '#94A3B8', flexShrink: 0 }}
      />
    </div>
  );
};

export default AccountRow;

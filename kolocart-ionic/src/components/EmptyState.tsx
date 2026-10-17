import React from 'react';
import { IonIcon } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  style?: React.CSSProperties;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = cartOutline,
  title,
  description,
  actionText,
  onAction,
  style,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
        ...style,
      }}
      className="kolocart-empty-state"
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: '#EEF0FD',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#162544',
          fontSize: '32px',
          marginBottom: '16px',
        }}
      >
        <IonIcon icon={icon} />
      </div>

      <h3
        style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#162544',
          margin: '0 0 8px 0',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: '14px',
          color: '#64748B',
          maxWidth: '280px',
          lineHeight: '1.5',
          margin: '0 0 24px 0',
        }}
      >
        {description}
      </p>

      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

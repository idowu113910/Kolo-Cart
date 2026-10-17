import React from 'react';
import { IonIcon } from '@ionic/react';
import { checkmarkCircle, ellipseOutline } from 'ionicons/icons';

interface SelectionCardProps {
  selected?: boolean;
  onSelect?: () => void;
  title: string;
  subtitle?: string;
  headerLabel?: string;
  icon?: string;
  actionText?: string;
  onAction?: () => void;
  variant?: 'radio' | 'info';
  style?: React.CSSProperties;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  selected = false,
  onSelect,
  title,
  subtitle,
  headerLabel,
  actionText = 'Change',
  onAction,
  variant = 'radio',
  style,
}) => {
  if (variant === 'info') {
    return (
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '14px 18px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          border: '1px solid #F1F5F9',
          marginBottom: '12px',
          ...style,
        }}
      >
        {headerLabel && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '6px',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>
              {headerLabel}
            </span>
            {onAction && (
              <button
                type="button"
                onClick={onAction}
                style={{
                  border: 'none',
                  background: 'none',
                  color: '#64748B',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {actionText}
              </button>
            )}
          </div>
        )}

        <div style={{ fontSize: '15px', fontWeight: '700', color: '#162544' }}>
          {title}
        </div>

        {subtitle && (
          <div style={{ fontSize: '13px', color: '#64748B', marginTop: '3px', lineHeight: '1.4' }}>
            {subtitle}
          </div>
        )}
      </div>
    );
  }

  // Radio selection card (e.g. Delivery Available vs Click & Collect)
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '14px 18px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: selected ? '1.5px solid #162544' : '1px solid #E2E8F0',
        marginBottom: '12px',
        cursor: 'pointer',
        boxShadow: selected ? '0 3px 12px rgba(22, 37, 68, 0.06)' : '0 2px 8px rgba(0, 0, 0, 0.02)',
        transition: 'all 0.15s ease',
        ...style,
      }}
    >
      <div style={{ marginRight: '14px', display: 'flex', alignItems: 'center' }}>
        <IonIcon
          icon={selected ? checkmarkCircle : ellipseOutline}
          style={{
            fontSize: '22px',
            color: selected ? '#10B981' : '#CBD5E1',
          }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '15px', fontWeight: '600', color: '#162544' }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionCard;

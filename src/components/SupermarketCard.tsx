import React from 'react';
import { IonIcon } from '@ionic/react';
import { star, timeOutline, bicycleOutline } from 'ionicons/icons';
import { Supermarket } from '../types';
import { formatCurrency } from '../utils/format';

interface SupermarketCardProps {
  supermarket: Supermarket;
  isSelected?: boolean;
  onSelect: (supermarket: Supermarket) => void;
  style?: React.CSSProperties;
}

export const SupermarketCard: React.FC<SupermarketCardProps> = ({
  supermarket,
  isSelected = false,
  onSelect,
  style,
}) => {
  return (
    <div
      onClick={() => onSelect(supermarket)}
      role="button"
      tabIndex={0}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow: isSelected
          ? '0 4px 16px rgba(22, 37, 68, 0.12)'
          : '0 2px 10px rgba(0, 0, 0, 0.04)',
        border: isSelected ? '2px solid #162544' : '1px solid #F1F5F9',
        marginBottom: '16px',
        cursor: 'pointer',
        transition: 'all 0.15s ease-in-out',
        ...style,
      }}
      className="supermarket-card"
    >
      {/* Banner with Rank Badge */}
      <div style={{ position: 'relative', height: '110px', backgroundColor: '#F1F5F9' }}>
        <img
          src={supermarket.bannerUrl}
          alt={supermarket.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '12px',
            backgroundColor: '#162544',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: '800',
            padding: '4px 10px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
          }}
        >
          <span>Rank #{supermarket.rank}</span>
        </div>

        {isSelected && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '12px',
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '20px',
            }}
          >
            Active Store
          </div>
        )}
      </div>

      {/* Info Section */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <img
            src={supermarket.logoUrl}
            alt={`${supermarket.name} logo`}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1.5px solid #FFFFFF',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              objectFit: 'cover',
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              style={{
                margin: 0,
                fontSize: '15px',
                fontWeight: '700',
                color: '#162544',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {supermarket.name}
            </h3>
            <p
              style={{
                margin: '2px 0 0',
                fontSize: '12px',
                color: '#64748B',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {supermarket.address}
            </p>
          </div>
        </div>

        {/* Rating and Features */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '10px',
            paddingTop: '10px',
            borderTop: '1px solid #F1F5F9',
            fontSize: '12px',
            color: '#64748B',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <IonIcon icon={star} style={{ color: '#F59E0B', fontSize: '14px' }} />
            <span style={{ fontWeight: '700', color: '#1E293B' }}>{supermarket.rating}</span>
            <span>({supermarket.reviewCount})</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <IonIcon icon={timeOutline} style={{ fontSize: '13px', color: '#64748B' }} />
            <span>{supermarket.estimatedDeliveryTime}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <IonIcon icon={bicycleOutline} style={{ fontSize: '14px', color: '#64748B' }} />
            <span>{formatCurrency(supermarket.deliveryFee, false)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupermarketCard;

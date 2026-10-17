import React from 'react';
import { IonIcon } from '@ionic/react';
import { arrowBack, timeOutline, checkmark, close } from 'ionicons/icons';
import { Supermarket } from '../types';

interface StoreHeaderProps {
  supermarket: Supermarket;
  onBack?: () => void;
  addedCount?: number;
  totalPrice?: string;
  orderType?: string;
  style?: React.CSSProperties;
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({
  supermarket,
  onBack,
  addedCount = 0,
  totalPrice = 'N0.00',
  orderType = 'Click & Collect',
  style,
}) => {
  return (
    <div
      style={{
        backgroundColor: '#162544',
        color: '#FFFFFF',
        borderRadius: '24px',
        padding: '18px 16px',
        boxShadow: '0 8px 24px rgba(22, 37, 68, 0.25)',
        position: 'relative',
        ...style,
      }}
    >
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
          }}
          aria-label="Go back"
        >
          <IonIcon icon={arrowBack} style={{ fontSize: '18px' }} />
        </button>
      )}

      {/* Store Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: onBack ? '32px' : '0' }}>
        <img
          src={supermarket.logoUrl}
          alt={supermarket.name}
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            objectFit: 'cover',
            backgroundColor: '#FFFFFF',
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: '#FFFFFF' }}>
            {supermarket.name}
          </h2>
          <p
            style={{
              margin: '3px 0 0',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.75)',
              lineHeight: '1.3',
            }}
          >
            {supermarket.address}
          </p>
        </div>
      </div>

      {/* Opening & Fulfilment Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px 14px',
          marginTop: '16px',
          fontSize: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
          <span>Open by {supermarket.openingTime}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '13px' }}>🚚</span>
          <span>Delivery Available</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
          <span>Closes {supermarket.closingTime}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '13px', color: '#10B981' }}>✓</span>
          <span>Click & Collect</span>
        </div>
      </div>

      {/* Prices Update */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginTop: '14px',
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        <IonIcon icon={timeOutline} style={{ fontSize: '14px' }} />
        <span>Prices Updated {supermarket.pricesUpdatedAgo}</span>
      </div>

      {/* Mini Stat Badges matching Figma */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '8px',
          marginTop: '14px',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '8px 6px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: '500' }}>Add Products</div>
          <div style={{ fontSize: '11px', color: '#162544', fontWeight: '700', marginTop: '2px' }}>
            {addedCount} Added
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '8px 6px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: '500' }}>Total Price</div>
          <div style={{ fontSize: '11px', color: '#162544', fontWeight: '700', marginTop: '2px' }}>
            {totalPrice}
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '8px 6px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: '500' }}>Order Type</div>
          <div style={{ fontSize: '11px', color: '#162544', fontWeight: '700', marginTop: '2px' }}>
            {orderType}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;

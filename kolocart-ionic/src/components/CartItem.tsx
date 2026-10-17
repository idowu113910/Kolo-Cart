import React from 'react';
import { IonIcon } from '@ionic/react';
import { gridOutline } from 'ionicons/icons';
import { CartItem as CartItemType } from '../types';
import { formatCurrency, formatRelativeTime } from '../utils/format';
import { QuantityStepper } from './QuantityStepper';

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onViewDetails?: () => void;
  style?: React.CSSProperties;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onViewDetails,
  style,
}) => {
  const { product, quantity, addedAt } = item;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '14px 16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        gap: '14px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
        border: '1px solid #F1F5F9',
        marginBottom: '12px',
        ...style,
      }}
      className="cart-item-row"
    >
      {/* Product Image */}
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{
          width: '68px',
          height: '68px',
          borderRadius: '14px',
          objectFit: 'cover',
          backgroundColor: '#F8FAFC',
          flexShrink: 0,
        }}
      />

      {/* Product Info & Quantity Stepper */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1E293B',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {product.name}
        </div>

        <div
          style={{
            fontSize: '15px',
            fontWeight: '700',
            color: '#162544',
            marginTop: '3px',
          }}
        >
          {formatCurrency(product.price, false)}
        </div>

        <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px', marginBottom: '8px' }}>
          Added {formatRelativeTime(addedAt)}
        </div>

        {/* Stepper */}
        <QuantityStepper
          quantity={quantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          size="sm"
        />
      </div>

      {/* Right Actions */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={onViewDetails}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EEF0FD',
            border: 'none',
            borderRadius: '12px',
            padding: '8px 10px',
            minWidth: '54px',
            cursor: 'pointer',
          }}
          aria-label="View product details"
        >
          <span style={{ fontSize: '16px', fontWeight: '700', color: '#162544', lineHeight: 1 }}>+</span>
          <span style={{ fontSize: '9px', fontWeight: '600', color: '#162544', marginTop: '3px' }}>
            View details
          </span>
        </button>

        <button
          type="button"
          onClick={onViewDetails}
          style={{
            border: 'none',
            background: 'none',
            color: '#162544',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Grid options"
        >
          <IonIcon icon={gridOutline} style={{ fontSize: '16px' }} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

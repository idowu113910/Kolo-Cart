import React from 'react';
import { formatCurrency } from '../utils/format';

interface OrderSummaryProps {
  productTotal: number;
  deliveryFee: number;
  total: number;
  title?: string;
  style?: React.CSSProperties;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  productTotal,
  deliveryFee,
  total,
  title = 'Order Summary',
  style,
}) => {
  return (
    <div
      style={{
        marginTop: '16px',
        marginBottom: '16px',
        ...style,
      }}
      className="order-summary-box"
    >
      <div
        style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#162544',
          marginBottom: '14px',
        }}
      >
        {title}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '15px', color: '#162544', fontWeight: '500' }}>Product</span>
          <span style={{ fontSize: '15px', color: '#162544', fontWeight: '700' }}>
            {formatCurrency(productTotal, false)}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '15px', color: '#162544', fontWeight: '500' }}>Delivery Fee</span>
          <span style={{ fontSize: '15px', color: '#162544', fontWeight: '700' }}>
            {deliveryFee === 0 ? 'N0.00' : formatCurrency(deliveryFee, false)}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '10px',
            borderTop: '1px solid #E2E8F0',
            marginTop: '4px',
          }}
        >
          <span style={{ fontSize: '16px', color: '#162544', fontWeight: '700' }}>Total</span>
          <span style={{ fontSize: '17px', color: '#162544', fontWeight: '800' }}>
            {formatCurrency(total, false)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

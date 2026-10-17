import React from 'react';
import { IonIcon } from '@ionic/react';
import { chevronForwardOutline, timeOutline } from 'ionicons/icons';
import { Order } from '../types';
import { formatCurrency, formatDate } from '../utils/format';
import { Badge } from './Badge';

interface OrderCardProps {
  order: Order;
  onClick: (order: Order) => void;
  style?: React.CSSProperties;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onClick,
  style,
}) => {
  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'out_for_delivery':
      case 'packing':
      case 'confirmed':
        return 'primary';
      case 'cancelled':
        return 'danger';
      default:
        return 'warning';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'out_for_delivery':
        return 'On the way';
      case 'packing':
        return 'Packing items';
      case 'confirmed':
        return 'Order Confirmed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Processing';
    }
  };

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      onClick={() => onClick(order)}
      role="button"
      tabIndex={0}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
        border: '1px solid #F1F5F9',
        marginBottom: '14px',
        cursor: 'pointer',
        ...style,
      }}
      className="order-card"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div>
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#162544' }}>
            {order.orderNumber}
          </span>
          <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
            {formatDate(order.createdAt)}
          </div>
        </div>

        <Badge variant={getStatusVariant(order.status)}>
          {getStatusLabel(order.status)}
        </Badge>
      </div>

      <div style={{ fontSize: '13px', fontWeight: '500', color: '#475569', marginBottom: '10px' }}>
        {order.supermarketName}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '10px',
          borderTop: '1px solid #F8FAFC',
          fontSize: '13px',
        }}
      >
        <span style={{ color: '#64748B' }}>
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: '700', color: '#162544', fontSize: '14px' }}>
            {formatCurrency(order.total, false)}
          </span>
          <IonIcon icon={chevronForwardOutline} style={{ color: '#94A3B8', fontSize: '16px' }} />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

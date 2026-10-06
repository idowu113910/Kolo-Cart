import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
} from '@ionic/react';
import { useParams, useNavigate } from 'react-router-dom';
import { arrowBack, checkmarkCircle, ellipseOutline } from 'ionicons/icons';
import { useOrderStore } from '../store/orderStore';
import { formatCurrency, formatDate } from '../utils/format';
import { Badge } from '../components/Badge';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById } = useOrderStore();

  const order = getOrderById(id || '') || getOrderById('ord-101');

  if (!order) {
    return (
      <IonPage>
        <IonContent>
          <div style={{ padding: '32px', textAlign: 'center' }}>
            <p>Order not found</p>
            <button onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const steps = [
    { key: 'confirmed', label: 'Order Confirmed', time: 'Received by store' },
    { key: 'packing', label: 'Packing Items', time: 'Items assembled and weighed' },
    { key: 'out_for_delivery', label: 'Out For Delivery', time: 'Rider on the way' },
    { key: 'delivered', label: 'Delivered', time: 'Completed' },
  ];

  const stepOrder = ['placed', 'confirmed', 'packing', 'out_for_delivery', 'delivered'];
  const currentStepIndex = stepOrder.indexOf(order.status);

  return (
    <IonPage className="kolocart-order-detail-page">
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ padding: '8px 12px 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                border: 'none',
                background: 'none',
                color: '#162544',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Go back"
            >
              <IonIcon icon={arrowBack} style={{ fontSize: '22px' }} />
            </button>

            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#162544' }}>
              Order {order.orderNumber}
            </h1>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto', paddingBottom: '60px' }}>
          {/* Status Stepper */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '20px 18px',
              marginBottom: '16px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#162544', marginBottom: '16px' }}>
              Delivery Progress
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {steps.map((step, idx) => {
                const stepIdx = stepOrder.indexOf(step.key);
                const isPassed = currentStepIndex >= stepIdx;
                const isCurrent = currentStepIndex === stepIdx;

                return (
                  <div key={step.key} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <IonIcon
                      icon={isPassed ? checkmarkCircle : ellipseOutline}
                      style={{
                        fontSize: '22px',
                        color: isPassed ? '#10B981' : '#CBD5E1',
                        flexShrink: 0,
                        marginTop: '1px',
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: isCurrent ? '800' : '600', color: isPassed ? '#162544' : '#94A3B8' }}>
                        {step.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                        {step.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Supermarket & Delivery Address Info */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px 18px',
              marginBottom: '16px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '600', marginBottom: '4px' }}>
              Store & Delivery
            </div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#162544' }}>
              {order.supermarketName}
            </div>
            {order.deliveryAddress && (
              <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                Delivering to: {order.deliveryAddress.addressLine} ({order.deliveryAddress.label})
              </div>
            )}
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
              Placed: {formatDate(order.createdAt)} • Payment: {order.paymentMethod}
            </div>
          </div>

          {/* Items Summary */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px 18px',
              marginBottom: '16px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#162544', marginBottom: '12px' }}>
              Ordered Items ({order.items.length})
            </div>

            {order.items.map(item => (
              <div
                key={item.product.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 0',
                  borderBottom: '1px solid #F8FAFC',
                }}
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#162544' }}>
                    {item.product.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    {item.quantity} x {formatCurrency(item.product.price, false)}
                  </div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#162544' }}>
                  {formatCurrency(item.product.price * item.quantity, false)}
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '14px' }}>
              <span style={{ color: '#64748B' }}>Delivery Fee:</span>
              <span style={{ fontWeight: '600', color: '#162544' }}>{formatCurrency(order.deliveryFee, false)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #E2E8F0', fontSize: '16px', fontWeight: '800', color: '#162544' }}>
              <span>Total:</span>
              <span>{formatCurrency(order.total, false)}</span>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OrderDetailPage;

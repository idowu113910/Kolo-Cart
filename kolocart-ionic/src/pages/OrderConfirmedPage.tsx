import React from 'react';
import {
  IonPage,
  IonContent,
  IonIcon,
} from '@ionic/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { checkmarkCircle } from 'ionicons/icons';
import { Button } from '../components/Button';

export const OrderConfirmedPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'KC-784652';
  const orderId = searchParams.get('id') || 'ord-101';

  return (
    <IonPage className="kolocart-order-confirmed-page">
      <IonContent className="bg-white">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%',
            padding: '32px 24px',
            textAlign: 'center',
            maxWidth: '520px',
            margin: '0 auto',
            boxSizing: 'border-box',
          }}
        >
          {/* Big Green Checkmark Icon matching Figma screenshot */}
          <div style={{ marginBottom: '24px' }}>
            <IonIcon
              icon={checkmarkCircle}
              style={{
                fontSize: '110px',
                color: '#10B981',
                filter: 'drop-shadow(0 6px 16px rgba(16, 185, 129, 0.25))',
              }}
            />
          </div>

          {/* Heading */}
          <h1
            style={{
              margin: '0 0 12px 0',
              fontSize: '26px',
              fontWeight: '800',
              color: '#162544',
            }}
          >
            Order Confirmed!
          </h1>

          <p
            style={{
              margin: '0 0 32px 0',
              fontSize: '14px',
              color: '#64748B',
              lineHeight: '1.6',
              maxWidth: '320px',
            }}
          >
            Thank you for shopping with KoloCart. We’ve received your order and it will be on the way soon.
          </p>

          {/* Order Details Badge Card matching Figma screenshot */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              width: '100%',
              backgroundColor: '#F8F9FD',
              borderRadius: '18px',
              padding: '16px',
              border: '1px solid #E2E8F0',
              marginBottom: '36px',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase' }}>
                Order Number
              </div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#162544', marginTop: '4px' }}>
                {orderNumber}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase' }}>
                Estimated Time
              </div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#162544', marginTop: '4px' }}>
                20 – 30 mins
              </div>
            </div>
          </div>

          {/* Track Order Button matching Figma screenshot */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate(`/order/${orderId}`)}
            style={{
              backgroundColor: '#162544',
              borderRadius: '14px',
              boxShadow: '0 6px 20px rgba(22, 37, 68, 0.25)',
              fontSize: '16px',
              fontWeight: '700',
              marginBottom: '16px',
            }}
          >
            Track Order
          </Button>

          {/* Continue Shopping Link matching Figma screenshot */}
          <button
            type="button"
            onClick={() => navigate('/tab1')}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748B',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            Continue Shopping
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OrderConfirmedPage;

import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonToast,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { arrowBack, checkmarkCircle, ellipseOutline, cardOutline, cashOutline, storefrontOutline, swapHorizontalOutline } from 'ionicons/icons';
import { useUserStore } from '../../store/userStore';

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { paymentMethods, setDefaultPaymentMethod } = useUserStore();
  const [toastMessage, setToastMessage] = useState('');

  const getIcon = (type: string) => {
    switch (type) {
      case 'card':
        return cardOutline;
      case 'pay_at_supermarket':
        return storefrontOutline;
      case 'bank_transfer':
        return swapHorizontalOutline;
      case 'cash_on_delivery':
      default:
        return cashOutline;
    }
  };

  const handleSelect = (id: string, name: string) => {
    setDefaultPaymentMethod(id);
    setToastMessage(`Default payment set to ${name}`);
  };

  return (
    <IonPage className="kolocart-payment-page">
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
              Payment Methods
            </h1>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '14px' }}>
            Choose your preferred method of payment for grocery orders:
          </div>

          {paymentMethods.map(method => (
            <div
              key={method.id}
              onClick={() => handleSelect(method.id, method.name)}
              role="button"
              tabIndex={0}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '16px 18px',
                marginBottom: '12px',
                border: method.isDefault ? '1.5px solid #162544' : '1px solid #E2E8F0',
                boxShadow: method.isDefault ? '0 4px 14px rgba(22, 37, 68, 0.08)' : '0 2px 8px rgba(0, 0, 0, 0.02)',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  backgroundColor: '#EEF0FD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#162544',
                  fontSize: '20px',
                  marginRight: '14px',
                  flexShrink: 0,
                }}
              >
                <IonIcon icon={getIcon(method.type)} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#162544' }}>
                  {method.name}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  {method.description}
                </div>
              </div>

              <IonIcon
                icon={method.isDefault ? checkmarkCircle : ellipseOutline}
                style={{
                  fontSize: '22px',
                  color: method.isDefault ? '#10B981' : '#CBD5E1',
                  marginLeft: '10px',
                }}
              />
            </div>
          ))}
        </div>

        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setToastMessage('')}
          position="bottom"
          color="dark"
        />
      </IonContent>
    </IonPage>
  );
};

export default PaymentPage;

import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { arrowBack, addOutline, checkmarkCircle, trashOutline } from 'ionicons/icons';
import { useUserStore } from '../../store/userStore';
import { Button } from '../../components/Button';

export const AddressListPage: React.FC = () => {
  const navigate = useNavigate();
  const { addresses, setDefaultAddress, deleteAddress } = useUserStore();

  return (
    <IonPage className="kolocart-address-list-page">
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ padding: '8px 12px 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                Delivery Addresses
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate('/account/address-form')}
              style={{
                backgroundColor: '#EEF0FD',
                color: '#162544',
                border: 'none',
                borderRadius: '10px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <IonIcon icon={addOutline} style={{ fontSize: '16px' }} />
              <span>Add</span>
            </button>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto' }}>
          {addresses.map(addr => (
            <div
              key={addr.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '16px 18px',
                marginBottom: '12px',
                border: addr.isDefault ? '1.5px solid #162544' : '1px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#162544' }}>
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span
                      style={{
                        backgroundColor: '#10B981',
                        color: '#FFFFFF',
                        fontSize: '10px',
                        fontWeight: '700',
                        padding: '2px 8px',
                        borderRadius: '10px',
                      }}
                    >
                      Default
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {!addr.isDefault && (
                    <button
                      type="button"
                      onClick={() => setDefaultAddress(addr.id)}
                      style={{
                        border: 'none',
                        background: '#EEF0FD',
                        color: '#162544',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      Set Default
                    </button>
                  )}
                  {addresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => deleteAddress(addr.id)}
                      style={{
                        border: 'none',
                        background: 'none',
                        color: '#EF4444',
                        cursor: 'pointer',
                        padding: '4px',
                      }}
                      aria-label="Delete address"
                    >
                      <IonIcon icon={trashOutline} style={{ fontSize: '16px' }} />
                    </button>
                  )}
                </div>
              </div>

              <div style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.4' }}>
                {addr.addressLine}, {addr.city}, {addr.state}
              </div>

              <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '6px' }}>
                Phone: {addr.phone}
              </div>
            </div>
          ))}

          <div style={{ marginTop: '24px' }}>
            <Button
              variant="outline"
              fullWidth
              leftIcon={<IonIcon icon={addOutline} />}
              onClick={() => navigate('/account/address-form')}
            >
              Add New Address
            </Button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddressListPage;

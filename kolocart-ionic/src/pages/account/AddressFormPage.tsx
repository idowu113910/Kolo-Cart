import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import { useUserStore } from '../../store/userStore';
import { Button } from '../../components/Button';

export const AddressFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { addAddress } = useUserStore();

  const [label, setLabel] = useState('Home');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('Enugu');
  const [state, setState] = useState('Enugu State');
  const [phone, setPhone] = useState('09132515670');
  const [isDefault, setIsDefault] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressLine.trim()) {
      setError('Please enter your street address');
      return;
    }

    addAddress({
      label,
      addressLine: addressLine.trim(),
      city,
      state,
      phone,
      isDefault,
    });

    navigate(-1);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#1E293B',
    boxSizing: 'border-box',
    outline: 'none',
  };

  return (
    <IonPage className="kolocart-address-form-page">
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
              Add Delivery Address
            </h1>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form onSubmit={handleSubmit} style={{ padding: '16px', maxWidth: '640px', margin: '0 auto' }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '20px 18px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
            }}
          >
            {error && (
              <div
                style={{
                  backgroundColor: '#FEE2E2',
                  color: '#EF4444',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  marginBottom: '16px',
                }}
              >
                {error}
              </div>
            )}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#162544', marginBottom: '6px' }}>
                Address Label
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['Home', 'Office', 'Other'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setLabel(type)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '10px',
                      border: label === type ? '1.5px solid #162544' : '1px solid #E2E8F0',
                      backgroundColor: label === type ? '#EEF0FD' : '#FFFFFF',
                      color: label === type ? '#162544' : '#64748B',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#162544', marginBottom: '6px' }}>
                Street Address / Landmark
              </label>
              <textarea
                rows={3}
                value={addressLine}
                onChange={e => {
                  setAddressLine(e.target.value);
                  setError('');
                }}
                placeholder="e.g. No 3 Precious road Upper meniru busstop agbani road"
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#162544', marginBottom: '6px' }}>
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#162544', marginBottom: '6px' }}>
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#162544', marginBottom: '6px' }}>
                Contact Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={inputStyle}
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '24px' }}>
              <input
                type="checkbox"
                checked={isDefault}
                onChange={e => setIsDefault(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#162544' }}
              />
              <span style={{ fontSize: '13px', color: '#162544', fontWeight: '500' }}>
                Set as default delivery address
              </span>
            </label>

            <Button type="submit" variant="primary" size="lg" fullWidth>
              Save Address
            </Button>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddressFormPage;

import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonToggle,
  IonToast,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { arrowBack, moonOutline, globeOutline, cashOutline, trashOutline, logOutOutline } from 'ionicons/icons';
import { useUserStore } from '../../store/userStore';
import { useTheme } from '../../hooks/useTheme';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useUserStore();
  const { isDark, toggleTheme } = useTheme();
  const [toastMessage, setToastMessage] = useState('');

  const handleClearCache = () => {
    setToastMessage('Cache cleared successfully.');
  };

  const handleLogout = () => {
    setToastMessage('Logged out successfully.');
  };

  return (
    <IonPage className="kolocart-settings-page">
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
              Settings
            </h1>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto' }}>
          {/* App Preferences */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px 18px',
              marginBottom: '20px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', marginBottom: '14px' }}>
              App Preferences
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <IonIcon icon={moonOutline} style={{ fontSize: '20px', color: '#162544' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#162544' }}>Dark Mode</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Switch light/dark interface</div>
                </div>
              </div>
              <IonToggle
                checked={isDark}
                onIonChange={toggleTheme}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <IonIcon icon={cashOutline} style={{ fontSize: '20px', color: '#162544' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#162544' }}>Currency</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Nigerian Naira (₦ / NGN)</div>
                </div>
              </div>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#162544' }}>NGN</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <IonIcon icon={globeOutline} style={{ fontSize: '20px', color: '#162544' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#162544' }}>Language</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>English (UK / NG)</div>
                </div>
              </div>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#162544' }}>English</span>
            </div>
          </div>

          {/* Account Actions */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '8px 18px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div
              onClick={handleClearCache}
              role="button"
              tabIndex={0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 0',
                borderBottom: '1px solid #F1F5F9',
                cursor: 'pointer',
              }}
            >
              <IonIcon icon={trashOutline} style={{ fontSize: '18px', color: '#64748B' }} />
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#162544' }}>
                Clear Image Cache
              </span>
            </div>

            <div
              onClick={handleLogout}
              role="button"
              tabIndex={0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 0',
                cursor: 'pointer',
              }}
            >
              <IonIcon icon={logOutOutline} style={{ fontSize: '18px', color: '#EF4444' }} />
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#EF4444' }}>
                Log Out
              </span>
            </div>
          </div>
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

export default SettingsPage;

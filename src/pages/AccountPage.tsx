import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonToast,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import {
  locationOutline,
  cardOutline,
  walletOutline,
  notificationsOutline,
  helpCircleOutline,
  informationCircleOutline,
  settingsOutline,
  cartOutline,
} from 'ionicons/icons';
import { useUserStore } from '../store/userStore';
import { getTimeOfDayGreeting } from '../utils/format';
import { AccountRow } from '../components/AccountRow';

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const [toastMessage, setToastMessage] = React.useState('');

  const greeting = getTimeOfDayGreeting();

  const handleSavingsClick = () => {
    setToastMessage('KoloCart Savings feature is launching soon!');
  };

  return (
    <IonPage className="kolocart-account-page">
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ padding: '8px 16px 4px' }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#162544' }}>
            My Account
          </h1>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto', paddingBottom: '80px' }}>
          {/* Profile Header Card matching Figma Screenshot (Image 7) */}
          <div
            style={{
              backgroundColor: '#162544',
              borderRadius: '24px',
              padding: '20px 18px',
              color: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(22, 37, 68, 0.22)',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    backgroundColor: '#F1F5F9',
                  }}
                />
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#FFFFFF' }}>
                    {greeting} {profile.title}
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)', marginTop: '3px' }}>
                    {profile.phone}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/account/edit-profile')}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Edit
              </button>
            </div>
          </div>

          {/* Account Menu List matching Figma Screenshot (Image 7) */}
          <div>
            <AccountRow
              title="My Address"
              icon={cartOutline}
              onClick={() => navigate('/account/address')}
            />

            <AccountRow
              title="Payment Method"
              icon={cartOutline}
              onClick={() => navigate('/account/payment')}
            />

            <AccountRow
              title="KoloCart Savings"
              badge="Coming Soon"
              icon={cartOutline}
              onClick={handleSavingsClick}
            />

            <AccountRow
              title="Notification"
              icon={cartOutline}
              onClick={() => navigate('/account/notifications')}
            />

            <AccountRow
              title="Help & Support"
              icon={cartOutline}
              onClick={() => navigate('/account/help')}
            />

            <AccountRow
              title="About KoloCart"
              icon={cartOutline}
              onClick={() => navigate('/account/about')}
            />

            <AccountRow
              title="Settings"
              icon={cartOutline}
              onClick={() => navigate('/account/settings')}
            />
          </div>
        </div>

        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          duration={2500}
          onDidDismiss={() => setToastMessage('')}
          position="bottom"
          color="dark"
        />
      </IonContent>
    </IonPage>
  );
};

export default AccountPage;

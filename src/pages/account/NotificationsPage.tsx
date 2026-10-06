import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonToggle,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { arrowBack, notificationsOutline, checkmarkCircleOutline, pricetagOutline } from 'ionicons/icons';
import { useUserStore } from '../../store/userStore';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useUserStore();

  const recentNotifications = [
    {
      id: 'n-1',
      title: 'Order KC-784652 Confirmed',
      message: 'ICECOLD BIRD Supermarket is now preparing your groceries.',
      time: '30m ago',
      icon: checkmarkCircleOutline,
      color: '#10B981',
    },
    {
      id: 'n-2',
      title: 'Flash Weekend Deals at Roban Stores',
      message: 'Get up to 25% discount on household essentials this weekend.',
      time: '1d ago',
      icon: pricetagOutline,
      color: '#3B82F6',
    },
    {
      id: 'n-3',
      title: 'KoloCart Price Drop Alert',
      message: 'Fresh Tomatoes (1kg) prices just decreased by ₦150 at Market Square.',
      time: '2d ago',
      icon: notificationsOutline,
      color: '#F59E0B',
    },
  ];

  return (
    <IonPage className="kolocart-notifications-page">
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
              Notifications
            </h1>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto' }}>
          {/* Notification Preferences */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '16px 18px',
              marginBottom: '20px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#162544', marginBottom: '14px' }}>
              Notification Preferences
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B' }}>Push Notifications</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Receive instant order and app updates</div>
              </div>
              <IonToggle
                checked={settings.notificationsEnabled}
                onIonChange={e => updateSettings({ notificationsEnabled: e.detail.checked })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B' }}>Order Status Alerts</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Live packing and dispatch notifications</div>
              </div>
              <IonToggle
                checked={settings.orderStatusAlerts}
                onIonChange={e => updateSettings({ orderStatusAlerts: e.detail.checked })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B' }}>Promotions & Discounts</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Weekly supermarket price updates and deals</div>
              </div>
              <IonToggle
                checked={settings.promotionsAlerts}
                onIonChange={e => updateSettings({ promotionsAlerts: e.detail.checked })}
              />
            </div>
          </div>

          {/* Activity Feed */}
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#162544', marginBottom: '12px' }}>
            Recent Activity
          </div>

          {recentNotifications.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: '12px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px 16px',
                marginBottom: '10px',
                border: '1px solid #F1F5F9',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#EEF0FD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                  fontSize: '18px',
                  flexShrink: 0,
                }}
              >
                <IonIcon icon={item.icon} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#162544' }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>{item.time}</span>
                </div>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748B', lineHeight: '1.4' }}>
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotificationsPage;

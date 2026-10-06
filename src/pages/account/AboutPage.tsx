import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { arrowBack, storefrontOutline } from 'ionicons/icons';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <IonPage className="kolocart-about-page">
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
              About KoloCart
            </h1>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '24px 16px', maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              backgroundColor: '#162544',
              color: '#FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              marginBottom: '16px',
              boxShadow: '0 8px 24px rgba(22, 37, 68, 0.2)',
            }}
          >
            <IonIcon icon={storefrontOutline} />
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#162544', margin: '0 0 4px 0' }}>
            KoloCart
          </h2>
          <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '600', marginBottom: '24px' }}>
            Version 1.0.0 (Production Build)
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '20px',
              textAlign: 'left',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
              marginBottom: '20px',
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#162544', margin: '0 0 8px 0' }}>
              Our Mission
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.6', margin: 0 }}>
              KoloCart connects you directly to the finest supermarkets in your neighborhood. We empower customers to compare ranked supermarkets, browse real-time inventory and pricing, and receive fast, reliable door-to-door grocery delivery in under 30 minutes.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px',
              textAlign: 'left',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ padding: '10px 0', borderBottom: '1px solid #F1F5F9', fontSize: '14px', fontWeight: '600', color: '#162544' }}>
              Terms of Service
            </div>
            <div style={{ padding: '10px 0', borderBottom: '1px solid #F1F5F9', fontSize: '14px', fontWeight: '600', color: '#162544' }}>
              Privacy & Cookie Policy
            </div>
            <div style={{ padding: '10px 0', fontSize: '14px', fontWeight: '600', color: '#162544' }}>
              Supermarket Merchant Partnership
            </div>
          </div>

          <div style={{ marginTop: '32px', fontSize: '12px', color: '#94A3B8' }}>
            © {new Date().getFullYear()} KoloCart Nigeria Ltd. All rights reserved.
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AboutPage;

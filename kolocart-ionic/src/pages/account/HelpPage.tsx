import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { arrowBack, logoWhatsapp, callOutline, mailOutline, chevronDownOutline, chevronUpOutline } from 'ionicons/icons';

export const HelpPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does KoloCart source and price products?',
      a: 'KoloCart partners directly with top-ranked supermarkets in your city. Our field agents and real-time APIs continuously synchronize in-store prices and stock so you pay the authentic shelf price.'
    },
    {
      q: 'What happens if a product is out of stock in the store?',
      a: 'Your personal shopper will contact you via phone or WhatsApp to offer an identical substitute or automatically process a refund.'
    },
    {
      q: 'Can I order items from multiple supermarkets at once?',
      a: 'To guarantee swift 20-30 minute delivery and single billing, each cart is fulfilled by one chosen supermarket at a time. You can start a new cart for another supermarket at any moment.'
    },
    {
      q: 'What is the delivery fee and timeframe?',
      a: 'Delivery fees start at ₦500 depending on distance. Most deliveries arrive at your doorstep within 20 to 30 minutes.'
    },
  ];

  return (
    <IonPage className="kolocart-help-page">
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
              Help & Support
            </h1>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto' }}>
          {/* Contact Support Channels */}
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#162544', marginBottom: '12px' }}>
            Contact Customer Support
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
            <a
              href="https://wa.me/2347076800531"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px 10px',
                textDecoration: 'none',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#DCFCE7',
                  color: '#16A34A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  marginBottom: '8px',
                }}
              >
                <IonIcon icon={logoWhatsapp} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#162544' }}>WhatsApp</span>
              <span style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>Instant Chat</span>
            </a>

            <a
              href="tel:08113613919"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px 10px',
                textDecoration: 'none',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#EEF2FF',
                  color: '#4F46E5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  marginBottom: '8px',
                }}
              >
                <IonIcon icon={callOutline} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#162544' }}>Phone Call</span>
              <span style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>7am - 9pm</span>
            </a>

            <a
              href="mailto:support@kolocart.ng"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px 10px',
                textDecoration: 'none',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#FEF3C7',
                  color: '#D97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  marginBottom: '8px',
                }}
              >
                <IonIcon icon={mailOutline} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#162544' }}>Email Us</span>
              <span style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>24h response</span>
            </a>
          </div>

          {/* Frequently Asked Questions */}
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#162544', marginBottom: '12px' }}>
            Frequently Asked Questions
          </div>

          <div>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '16px',
                    marginBottom: '10px',
                    border: '1px solid #F1F5F9',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <div
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    role="button"
                    tabIndex={0}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      gap: '10px',
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#162544' }}>
                      {faq.q}
                    </span>
                    <IonIcon
                      icon={isOpen ? chevronUpOutline : chevronDownOutline}
                      style={{ color: '#94A3B8', fontSize: '18px', flexShrink: 0 }}
                    />
                  </div>

                  {isOpen && (
                    <div style={{ fontSize: '13px', color: '#64748B', marginTop: '10px', lineHeight: '1.5' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HelpPage;

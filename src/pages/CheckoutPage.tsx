import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonModal,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import { useCartStore } from '../store/cartStore';
import { useCheckoutStore } from '../store/checkoutStore';
import { useOrderStore } from '../store/orderStore';
import { useUserStore } from '../store/userStore';
import { SelectionCard } from '../components/SelectionCard';
import { OrderSummary } from '../components/OrderSummary';
import { Button } from '../components/Button';
import { calculateDeliveryFee, calculateTotal } from '../utils/pricing';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { supermarket, items, subtotal } = useCartStore();
  const {
    fulfilmentType,
    selectedAddressId,
    deliveryTime,
    paymentMethod,
    setFulfilmentType,
    setSelectedAddressId,
    setDeliveryTime,
    setPaymentMethod,
  } = useCheckoutStore();
  const { placeOrder } = useOrderStore();
  const { addresses, paymentMethods } = useUserStore();

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];
  const deliveryFee = calculateDeliveryFee(fulfilmentType, supermarket?.deliveryFee || 500, subtotal);
  const total = calculateTotal(subtotal, deliveryFee);

  const timeOptions = fulfilmentType === 'delivery'
    ? [
        { label: 'As soon as possible', sub: '20 - 30 mins' },
        { label: 'Within 1 hour', sub: '45 - 60 mins' },
        { label: 'Evening delivery', sub: '5:00 PM - 7:00 PM' },
      ]
    : [
        { label: 'Meet receptionist', sub: 'Any time before 9pm' },
        { label: 'Express counter pickup', sub: 'Ready in 15 mins' },
      ];

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      navigate('/cart');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder({
        supermarketId: supermarket?.id || 'icecold-bird',
        supermarketName: supermarket?.name || 'ICECOLD BIRD Supermarket',
        items,
        fulfilmentType,
        deliveryAddress: selectedAddress,
        deliveryTime,
        paymentMethod,
        productTotal: subtotal,
        deliveryFee,
        total,
      });

      setIsSubmitting(false);
      navigate(`/order-confirmed?id=${order.id}&orderNumber=${order.orderNumber}`);
    }, 600);
  };

  return (
    <IonPage className="kolocart-checkout-page">
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
              Checkout
            </h1>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto', paddingBottom: '90px' }}>
          {/* Fulfilment Type Radio Cards matching Figma screenshot */}
          <div style={{ marginBottom: '16px' }}>
            <SelectionCard
              variant="radio"
              title="🚚 Delivery Available"
              subtitle="Deliver to your door step"
              selected={fulfilmentType === 'delivery'}
              onSelect={() => setFulfilmentType('delivery')}
            />

            <SelectionCard
              variant="radio"
              title="📦 Click & Collect"
              subtitle="Pick up at the supermarket"
              selected={fulfilmentType === 'pickup'}
              onSelect={() => setFulfilmentType('pickup')}
            />
          </div>

          {/* Address Card matching Figma screenshot */}
          <SelectionCard
            variant="info"
            headerLabel={fulfilmentType === 'delivery' ? 'Delivery Address' : 'Pickup Address'}
            title={fulfilmentType === 'delivery' ? (selectedAddress?.label || 'Home') : (supermarket?.name || 'Supermarket')}
            subtitle={
              fulfilmentType === 'delivery'
                ? `${selectedAddress?.addressLine}, ${selectedAddress?.city}`
                : (supermarket?.address || 'No 3 Precious road Upper oneday busstop agbani road, enugu')
            }
            onAction={() => setShowAddressModal(true)}
          />

          {/* Delivery Time Card matching Figma screenshot */}
          <SelectionCard
            variant="info"
            headerLabel={fulfilmentType === 'delivery' ? 'Delivery Time' : 'Pickup Time'}
            title={deliveryTime.split('(')[0].trim()}
            subtitle={deliveryTime.includes('(') ? deliveryTime.split('(')[1].replace(')', '') : '20 - 30 mins'}
            onAction={() => setShowTimeModal(true)}
          />

          {/* Payment Method Card matching Figma screenshot */}
          <SelectionCard
            variant="info"
            headerLabel="Payment Method"
            title={paymentMethod}
            onAction={() => setShowPaymentModal(true)}
          />

          {/* Order Summary breakdown */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '16px 18px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
              border: '1px solid #F1F5F9',
              marginTop: '16px',
              marginBottom: '20px',
            }}
          >
            <OrderSummary
              productTotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
            />
          </div>

          {/* Place Order Button matching Figma screenshot */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            onClick={handlePlaceOrder}
            style={{
              backgroundColor: '#162544',
              borderRadius: '14px',
              boxShadow: '0 6px 20px rgba(22, 37, 68, 0.25)',
              fontSize: '16px',
              fontWeight: '700',
            }}
          >
            Place Order
          </Button>
        </div>

        {/* Change Address Modal */}
        <IonModal
          isOpen={showAddressModal}
          onDidDismiss={() => setShowAddressModal(false)}
          initialBreakpoint={0.6}
          breakpoints={[0, 0.6, 0.9]}
        >
          <div style={{ padding: '20px 16px', backgroundColor: '#F8F9FD', height: '100%', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '17px', fontWeight: '800', color: '#162544' }}>
              Select Delivery Address
            </h3>
            {addresses.map(a => (
              <div
                key={a.id}
                onClick={() => {
                  setSelectedAddressId(a.id);
                  setShowAddressModal(false);
                }}
                role="button"
                tabIndex={0}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  marginBottom: '10px',
                  border: a.id === selectedAddressId ? '2px solid #162544' : '1px solid #E2E8F0',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#162544' }}>{a.label}</div>
                <div style={{ fontSize: '13px', color: '#64748B', marginTop: '3px' }}>
                  {a.addressLine}, {a.city}
                </div>
              </div>
            ))}
          </div>
        </IonModal>

        {/* Change Time Modal */}
        <IonModal
          isOpen={showTimeModal}
          onDidDismiss={() => setShowTimeModal(false)}
          initialBreakpoint={0.5}
          breakpoints={[0, 0.5, 0.8]}
        >
          <div style={{ padding: '20px 16px', backgroundColor: '#F8F9FD', height: '100%', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '17px', fontWeight: '800', color: '#162544' }}>
              Select Fulfilment Time
            </h3>
            {timeOptions.map((opt, i) => (
              <div
                key={i}
                onClick={() => {
                  setDeliveryTime(`${opt.label} (${opt.sub})`);
                  setShowTimeModal(false);
                }}
                role="button"
                tabIndex={0}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  marginBottom: '10px',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#162544' }}>{opt.label}</div>
                <div style={{ fontSize: '13px', color: '#64748B', marginTop: '3px' }}>{opt.sub}</div>
              </div>
            ))}
          </div>
        </IonModal>

        {/* Change Payment Method Modal */}
        <IonModal
          isOpen={showPaymentModal}
          onDidDismiss={() => setShowPaymentModal(false)}
          initialBreakpoint={0.6}
          breakpoints={[0, 0.6, 0.9]}
        >
          <div style={{ padding: '20px 16px', backgroundColor: '#F8F9FD', height: '100%', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '17px', fontWeight: '800', color: '#162544' }}>
              Select Payment Method
            </h3>
            {paymentMethods.map(p => (
              <div
                key={p.id}
                onClick={() => {
                  setPaymentMethod(p.name);
                  setShowPaymentModal(false);
                }}
                role="button"
                tabIndex={0}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  marginBottom: '10px',
                  border: p.name === paymentMethod ? '2px solid #162544' : '1px solid #E2E8F0',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#162544' }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>{p.description}</div>
              </div>
            ))}
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default CheckoutPage;

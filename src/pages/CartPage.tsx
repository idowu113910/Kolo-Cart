import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonFooter,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { arrowBack, gridOutline, trashOutline, bagHandleOutline } from 'ionicons/icons';
import { useCartStore } from '../store/cartStore';
import { CartItem } from '../components/CartItem';
import { OrderSummary } from '../components/OrderSummary';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    supermarket,
    items,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    setQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  return (
    <IonPage className="kolocart-cart-page">
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ padding: '8px 12px 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
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
                My Cart ({itemCount})
              </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={() => clearCart()}
                  style={{
                    border: 'none',
                    background: '#FEE2E2',
                    color: '#EF4444',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  aria-label="Clear cart"
                >
                  <IonIcon icon={trashOutline} style={{ fontSize: '13px' }} />
                  <span>Clear</span>
                </button>
              )}

              <button
                type="button"
                style={{
                  border: 'none',
                  background: 'none',
                  color: '#162544',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label="Grid view options"
              >
                <IonIcon icon={gridOutline} style={{ fontSize: '20px' }} />
              </button>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto', paddingBottom: '120px' }}>
          {items.length === 0 ? (
            <EmptyState
              icon={bagHandleOutline}
              title="Your Cart is Empty"
              description="Explore supermarkets and fill your cart with fresh groceries and essentials."
              actionText="Explore Supermarkets"
              onAction={() => navigate('/tab1')}
              style={{ marginTop: '40px' }}
            />
          ) : (
            <>
              {/* Store origin header banner */}
              {supermarket && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '12px 14px',
                    marginBottom: '16px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={supermarket.logoUrl}
                      alt={supermarket.name}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '500' }}>Order from:</div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#162544' }}>
                        {supermarket.name}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      backgroundColor: '#EEF0FD',
                      color: '#162544',
                      padding: '4px 8px',
                      borderRadius: '8px',
                    }}
                  >
                    Rank #{supermarket.rank}
                  </span>
                </div>
              )}

              {/* Items List */}
              <div style={{ marginBottom: '20px' }}>
                {items.map(item => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onIncrease={() => setQuantity(item.product.id, item.quantity + 1)}
                    onDecrease={() => setQuantity(item.product.id, item.quantity - 1)}
                    onViewDetails={() => navigate(`/product/${item.product.id}`)}
                  />
                ))}
              </div>

              {/* Order Summary breakdown */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '16px 18px',
                  border: '1px solid #F1F5F9',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
                  marginBottom: '20px',
                }}
              >
                <OrderSummary
                  productTotal={subtotal}
                  deliveryFee={deliveryFee}
                  total={total}
                />
              </div>

              {/* Prominent Check Out Button */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => navigate('/checkout')}
                style={{
                  backgroundColor: '#162544',
                  boxShadow: '0 6px 20px rgba(22, 37, 68, 0.25)',
                  fontSize: '16px',
                  fontWeight: '700',
                  borderRadius: '14px',
                }}
              >
                Check Out
              </Button>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CartPage;

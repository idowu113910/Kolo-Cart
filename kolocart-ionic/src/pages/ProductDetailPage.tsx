import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonToast,
} from '@ionic/react';
import { useParams, useNavigate } from 'react-router-dom';
import { arrowBack, gridOutline, cartOutline } from 'ionicons/icons';
import { getProductById, getRelatedProducts, getSupermarketById } from '../data';
import { useCartStore, CartConflictInfo } from '../store/cartStore';
import { QuantityStepper } from '../components/QuantityStepper';
import { Button } from '../components/Button';
import { NewCartDialog } from '../components/NewCartDialog';
import { formatCurrency } from '../utils/format';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, forceAddItem } = useCartStore();

  const product = getProductById(id || '') || getProductById('prod-ice-1')!;
  const supermarket = getSupermarketById(product.supermarketId);
  const relatedProducts = getRelatedProducts(product.id, 4);

  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState('');
  const [conflictInfo, setConflictInfo] = useState<CartConflictInfo | null>(null);

  const handleAddToCart = () => {
    let result = addItem(product, product.supermarketId);
    if (!result.success && result.conflict) {
      setConflictInfo(result.conflict);
      return;
    }
    // If quantity > 1, add the remaining
    for (let i = 1; i < quantity; i++) {
      addItem(product, product.supermarketId);
    }
    setToastMessage(`Added ${quantity}x ${product.name} to cart`);
  };

  const handleConfirmNewCart = () => {
    if (conflictInfo) {
      forceAddItem(conflictInfo.incomingProduct, conflictInfo.incomingSupermarketId);
      for (let i = 1; i < quantity; i++) {
        addItem(product, product.supermarketId);
      }
      setToastMessage(`Started new cart with ${conflictInfo.incomingProduct.name}`);
      setConflictInfo(null);
    }
  };

  return (
    <IonPage className="kolocart-product-detail-page">
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
                {product.name}
              </h1>
            </div>

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
              aria-label="Options"
            >
              <IonIcon icon={gridOutline} style={{ fontSize: '20px' }} />
            </button>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto', paddingBottom: '120px' }}>
          {/* Hero Image Card matching Figma screenshot */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              backgroundColor: '#162544',
              boxShadow: '0 8px 24px rgba(22, 37, 68, 0.15)',
              marginBottom: '16px',
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: '100%', height: '240px', objectFit: 'cover' }}
            />
            {/* Carousel Dots */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '6px',
              }}
            >
              <span style={{ width: '20px', height: '4px', borderRadius: '2px', backgroundColor: '#10B981' }} />
              <span style={{ width: '8px', height: '4px', borderRadius: '2px', backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
              <span style={{ width: '8px', height: '4px', borderRadius: '2px', backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
            </div>
          </div>

          {/* Product Header Information */}
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: '800', color: '#162544' }}>
              {product.name}
            </h2>

            <div style={{ fontSize: '20px', fontWeight: '800', color: '#162544', marginBottom: '4px' }}>
              {formatCurrency(product.price, false)}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94A3B8' }}>
              <span>Uploaded {product.uploadedAgo}</span>
              {supermarket && (
                <>
                  <span>•</span>
                  <span style={{ color: '#64748B', fontWeight: '600' }}>{supermarket.name}</span>
                </>
              )}
            </div>
          </div>

          {/* Product Details Section matching Figma screenshot */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '18px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
              marginBottom: '20px',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: '700', color: '#162544' }}>
              Product Details
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: '1.6' }}>
              {product.description}
            </p>
          </div>

          {/* You May Also Like Section matching Figma screenshot */}
          {relatedProducts.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#162544', marginBottom: '12px' }}>
                You may also like
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {relatedProducts.map(rp => (
                  <div
                    key={rp.id}
                    onClick={() => navigate(`/product/${rp.id}`)}
                    role="button"
                    tabIndex={0}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '14px',
                      padding: '8px',
                      textAlign: 'center',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                      border: '1px solid #F1F5F9',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={rp.imageUrl}
                      alt={rp.name}
                      style={{ width: '100%', height: '54px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: '#162544',
                        marginTop: '6px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {rp.name.split(' ')[0]} +
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Fixed Action Bar matching Figma screenshot */}
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid #E2E8F0',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              zIndex: 100,
              boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div style={{ maxWidth: '640px', width: '100%', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <QuantityStepper
                quantity={quantity}
                onIncrease={() => setQuantity(q => q + 1)}
                onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                min={1}
                size="md"
              />

              <Button
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<IonIcon icon={cartOutline} style={{ fontSize: '18px' }} />}
                onClick={handleAddToCart}
                style={{
                  backgroundColor: '#162544',
                  boxShadow: '0 6px 18px rgba(22, 37, 68, 0.25)',
                }}
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>

        {/* New Cart Dialog */}
        <NewCartDialog
          isOpen={!!conflictInfo}
          conflictInfo={conflictInfo}
          onConfirm={handleConfirmNewCart}
          onCancel={() => setConflictInfo(null)}
        />

        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setToastMessage('')}
          position="top"
          color="dark"
        />
      </IonContent>
    </IonPage>
  );
};

export default ProductDetailPage;

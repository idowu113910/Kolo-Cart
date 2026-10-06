import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonToast,
} from '@ionic/react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSupermarketById, getProductsBySupermarket, getCategoriesForSupermarket } from '../data';
import { useSupermarketStore } from '../store/supermarketStore';
import { useCartStore, CartConflictInfo } from '../store/cartStore';
import { StoreHeader } from '../components/StoreHeader';
import { ProductCard } from '../components/ProductCard';
import { NewCartDialog } from '../components/NewCartDialog';
import { formatCurrency } from '../utils/format';
import { Product } from '../types';

export const SupermarketPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectSupermarket } = useSupermarketStore();
  const { items, subtotal, addItem, forceAddItem } = useCartStore();

  const supermarket = getSupermarketById(id || '') || getSupermarketById('icecold-bird')!;
  const [activeTab, setActiveTab] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState('');
  const [conflictInfo, setConflictInfo] = useState<CartConflictInfo | null>(null);

  // Set as selected in store
  React.useEffect(() => {
    if (supermarket) {
      selectSupermarket(supermarket.id);
    }
  }, [supermarket, selectSupermarket]);

  const categories = getCategoriesForSupermarket(supermarket.id);
  const allProducts = getProductsBySupermarket(supermarket.id);

  const displayedProducts = activeTab === 'all'
    ? allProducts
    : allProducts.filter(p => p.categoryId === activeTab);

  const handleAddToCart = (product: Product) => {
    const result = addItem(product, supermarket.id);
    if (!result.success && result.conflict) {
      setConflictInfo(result.conflict);
    } else {
      setToastMessage(`Added ${product.name} to cart`);
    }
  };

  const handleConfirmNewCart = () => {
    if (conflictInfo) {
      forceAddItem(conflictInfo.incomingProduct, conflictInfo.incomingSupermarketId);
      setToastMessage(`Started new cart with ${conflictInfo.incomingProduct.name}`);
      setConflictInfo(null);
    }
  };

  const cartItemsForThisStore = items.filter(i => i.product.supermarketId === supermarket.id);
  const addedCount = cartItemsForThisStore.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <IonPage className="kolocart-supermarket-page">
      <IonContent>
        <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto', paddingBottom: '90px' }}>
          {/* Store Hero Banner matching Figma */}
          <StoreHeader
            supermarket={supermarket}
            onBack={() => navigate(-1)}
            addedCount={addedCount}
            totalPrice={formatCurrency(subtotal, false)}
            orderType="Click & Collect"
            style={{ marginBottom: '18px' }}
          />

          {/* Category Tabs matching Figma Screenshot ("Recent", "Grains & Pasta", "Fruits", "Vegetable", "Beverages") */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#162544', marginBottom: '10px' }}>
              Our Products
            </div>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '4px',
                scrollbarWidth: 'none',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: activeTab === 'all' ? '#162544' : '#FFFFFF',
                  color: activeTab === 'all' ? '#FFFFFF' : '#64748B',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                }}
              >
                Recent
              </button>

              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    border: 'none',
                    backgroundColor: activeTab === cat.id ? '#162544' : '#FFFFFF',
                    color: activeTab === cat.id ? '#FFFFFF' : '#64748B',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products List in List View matching Figma screenshot */}
          <div>
            {displayedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode="list"
                onAddToCart={handleAddToCart}
                onClick={() => navigate(`/product/${product.id}`)}
              />
            ))}
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
          position="bottom"
          color="dark"
        />
      </IonContent>
    </IonPage>
  );
};

export default SupermarketPage;

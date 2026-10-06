import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonToast,
  IonModal,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { useSupermarketStore } from '../store/supermarketStore';
import { useCartStore, CartConflictInfo } from '../store/cartStore';
import { getCategoriesForSupermarket, searchProducts } from '../data';
import { CategoryRow } from '../components/CategoryRow';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { NewCartDialog } from '../components/NewCartDialog';
import { SupermarketCard } from '../components/SupermarketCard';
import { Product } from '../types';

export const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedId, selectedSupermarket, selectSupermarket, rankedSupermarkets } = useSupermarketStore();
  const { addItem, forceAddItem } = useCartStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showStoreSwitcher, setShowStoreSwitcher] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [conflictInfo, setConflictInfo] = useState<CartConflictInfo | null>(null);

  // Active categories for the selected supermarket
  const storeCategories = getCategoriesForSupermarket(selectedId);

  // If user searches, find matching products within this supermarket
  const searchResults = searchQuery.trim() ? searchProducts(selectedId, searchQuery) : [];

  const handleAddToCart = (product: Product) => {
    const result = addItem(product, selectedId);
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

  return (
    <IonPage className="kolocart-category-page">
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ padding: '8px 12px 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Store Catalog
              </div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#162544', marginTop: '2px' }}>
                {selectedSupermarket?.name || 'All Categories'}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowStoreSwitcher(true)}
              style={{
                backgroundColor: '#EEF0FD',
                color: '#162544',
                border: 'none',
                borderRadius: '12px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              Switch Store
            </button>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto' }}>
          {/* Search Bar */}
          <div style={{ marginBottom: '16px' }}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Search ${selectedSupermarket?.name || 'supermarket'}...`}
            />
          </div>

          {/* Active Store Banner Info */}
          {selectedSupermarket && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '10px 14px',
                marginBottom: '16px',
                border: '1px solid #E2E8F0',
                fontSize: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                <span style={{ color: '#1E293B', fontWeight: '600' }}>
                  Rank #{selectedSupermarket.rank} • Open by {selectedSupermarket.openingTime}
                </span>
              </div>
              <span style={{ color: '#64748B' }}>
                {storeCategories.length} Categories Available
              </span>
            </div>
          )}

          {/* If searching: show product results */}
          {searchQuery.trim() ? (
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#162544', marginBottom: '12px' }}>
                Search Results ({searchResults.length})
              </div>

              {searchResults.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 16px', color: '#64748B' }}>
                  No products found for "{searchQuery}" in {selectedSupermarket?.name}.
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {searchResults.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode="grid"
                      onAddToCart={handleAddToCart}
                      onClick={() => navigate(`/product/${product.id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Otherwise: show list of categories for chosen store matching Figma screenshot */
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Supermarket Categories
              </div>

              {storeCategories.map(cat => (
                <CategoryRow
                  key={cat.id}
                  category={cat}
                  onClick={() => navigate(`/category/${cat.id}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Store Switcher Modal */}
        <IonModal
          isOpen={showStoreSwitcher}
          onDidDismiss={() => setShowStoreSwitcher(false)}
          initialBreakpoint={0.7}
          breakpoints={[0, 0.7, 0.95]}
        >
          <div style={{ padding: '20px 16px', backgroundColor: '#F8F9FD', height: '100%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#162544' }}>
                  Choose Supermarket
                </h3>
                <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#64748B' }}>
                  Select a store to view its category catalog and prices
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowStoreSwitcher(false)}
                style={{
                  border: 'none',
                  background: '#E2E8F0',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  cursor: 'pointer',
                  fontWeight: '700',
                }}
              >
                ✕
              </button>
            </div>

            {rankedSupermarkets.map(store => (
              <SupermarketCard
                key={store.id}
                supermarket={store}
                isSelected={store.id === selectedId}
                onSelect={(s) => {
                  selectSupermarket(s.id);
                  setShowStoreSwitcher(false);
                }}
              />
            ))}
          </div>
        </IonModal>

        {/* New Cart Conflict Dialog */}
        <NewCartDialog
          isOpen={!!conflictInfo}
          conflictInfo={conflictInfo}
          onConfirm={handleConfirmNewCart}
          onCancel={() => setConflictInfo(null)}
        />

        {/* Toast confirmation */}
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

export default CategoryPage;

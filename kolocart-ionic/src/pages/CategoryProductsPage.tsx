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
import { arrowBack, gridOutline, listOutline } from 'ionicons/icons';
import { useSupermarketStore } from '../store/supermarketStore';
import { useCartStore, CartConflictInfo } from '../store/cartStore';
import { categories, getProductsBySupermarket } from '../data';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { NewCartDialog } from '../components/NewCartDialog';
import { Product } from '../types';

export const CategoryProductsPage: React.FC = () => {
  const { id: categoryId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedId, selectedSupermarket } = useSupermarketStore();
  const { addItem, forceAddItem } = useCartStore();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [conflictInfo, setConflictInfo] = useState<CartConflictInfo | null>(null);

  const category = categories.find(c => c.id === categoryId);
  const categoryName = category?.name || 'Category Products';

  // Products belonging to the currently selected supermarket in this category!
  const storeProducts = getProductsBySupermarket(selectedId, categoryId);

  const filteredProducts = storeProducts.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
  });

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
    <IonPage className="kolocart-category-products-page">
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

              <div>
                <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#162544' }}>
                  {categoryName}
                </h1>
                {selectedSupermarket && (
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    {selectedSupermarket.name}
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')}
              style={{
                border: 'none',
                background: '#EEF0FD',
                color: '#162544',
                borderRadius: '8px',
                padding: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Toggle view layout"
            >
              <IonIcon icon={viewMode === 'grid' ? listOutline : gridOutline} style={{ fontSize: '18px' }} />
            </button>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto', paddingBottom: '80px' }}>
          {/* Search bar matching Figma screenshot */}
          <div style={{ marginBottom: '16px' }}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Search ${categoryName.toLowerCase()}...`}
            />
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 16px', color: '#64748B' }}>
              No products found in {categoryName} for {selectedSupermarket?.name || 'this supermarket'}.
            </div>
          ) : viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode="grid"
                  onAddToCart={handleAddToCart}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              ))}
            </div>
          ) : (
            <div>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode="list"
                  onAddToCart={handleAddToCart}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              ))}
            </div>
          )}
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

export default CategoryProductsPage;

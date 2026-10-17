import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { useSupermarketStore } from '../store/supermarketStore';
import { SupermarketCard } from '../components/SupermarketCard';
import { SearchBar } from '../components/SearchBar';
import { categories } from '../data';
import { Supermarket } from '../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedId, selectSupermarket, rankedSupermarkets } = useSupermarketStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = rankedSupermarkets.filter(store => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return store.name.toLowerCase().includes(q) || store.address.toLowerCase().includes(q);
  });

  const handleSelectStore = (store: Supermarket) => {
    selectSupermarket(store.id);
    navigate(`/supermarket/${store.id}`);
  };

  return (
    <IonPage className="kolocart-home-page">
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ padding: '10px 16px 4px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>
              Nigerian
            </div>
            <h1 style={{ margin: '2px 0 0', fontSize: '20px', fontWeight: '800', color: '#162544' }}>
              Ranked Supermarkets
            </h1>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto', paddingBottom: '80px' }}>
          {/* Search */}
          <div style={{ marginBottom: '16px' }}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search ranked supermarkets..."
            />
          </div>

          {/* Quick Categories Bar */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B', marginBottom: '10px', textTransform: 'uppercase' }}>
              Explore Categories
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
              {categories.slice(0, 6).map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => navigate('/category')}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '20px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#162544',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Supermarkets List Ranked */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#162544' }}>
                All Supermarkets ({filteredStores.length})
              </span>
              <span style={{ fontSize: '12px', color: '#64748B' }}>
                Ranked by quality & price
              </span>
            </div>

            {filteredStores.map(store => (
              <SupermarketCard
                key={store.id}
                supermarket={store}
                isSelected={store.id === selectedId}
                onSelect={handleSelectStore}
              />
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

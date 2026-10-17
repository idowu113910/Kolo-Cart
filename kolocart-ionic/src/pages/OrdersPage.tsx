import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { storefrontOutline } from 'ionicons/icons';
import { useOrderStore } from '../store/orderStore';
import { OrderCard } from '../components/OrderCard';
import { EmptyState } from '../components/EmptyState';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { orders } = useOrderStore();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'delivered'>('all');

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'active') return o.status !== 'delivered' && o.status !== 'cancelled';
    if (activeTab === 'delivered') return o.status === 'delivered';
    return true;
  });

  return (
    <IonPage className="kolocart-orders-page">
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ padding: '10px 16px 4px' }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#162544' }}>
            My Orders
          </h1>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto', paddingBottom: '80px' }}>
          {/* Tab Filter */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {(['all', 'active', 'delivered'] as const).map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: activeTab === tab ? '#162544' : '#FFFFFF',
                  color: activeTab === tab ? '#FFFFFF' : '#64748B',
                  fontSize: '13px',
                  fontWeight: '700',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                }}
              >
                {tab === 'all' ? 'All Orders' : tab}
              </button>
            ))}
          </div>

          {filteredOrders.length === 0 ? (
            <EmptyState
              icon={storefrontOutline}
              title="No Orders Found"
              description="You have no orders in this category yet. Start shopping from your favorite supermarket!"
              actionText="Shop Now"
              onAction={() => navigate('/tab1')}
              style={{ marginTop: '40px' }}
            />
          ) : (
            <div>
              {filteredOrders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onClick={() => navigate(`/order/${order.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OrdersPage;

import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  homeOutline,
  gridOutline,
  storefrontOutline,
  cartOutline,
  personOutline,
} from 'ionicons/icons';

// Pages
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import OrdersPage from './pages/OrdersPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import SupermarketPage from './pages/SupermarketPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmedPage from './pages/OrderConfirmedPage';
import OrderDetailPage from './pages/OrderDetailPage';

// Account Sub-pages
import AddressListPage from './pages/account/AddressListPage';
import AddressFormPage from './pages/account/AddressFormPage';
import PaymentPage from './pages/account/PaymentPage';
import NotificationsPage from './pages/account/NotificationsPage';
import HelpPage from './pages/account/HelpPage';
import AboutPage from './pages/account/AboutPage';
import SettingsPage from './pages/account/SettingsPage';
import EditProfilePage from './pages/account/EditProfilePage';

// Stores
import { useCartStore } from './store/cartStore';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact({
  mode: 'ios', // Use polished iOS typography and transitions
});

const App: React.FC = () => {
  const { itemCount } = useCartStore();

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {/* 5 Tabs Routes */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountPage />} />

            {/* Fallback routes matching standard starters */}
            <Route path="/tab1" element={<Navigate to="/home" replace />} />
            <Route path="/tab2" element={<Navigate to="/category" replace />} />
            <Route path="/tab3" element={<Navigate to="/cart" replace />} />

            {/* Stack Detail Routes */}
            <Route path="/supermarket/:id" element={<SupermarketPage />} />
            <Route path="/category/:id" element={<CategoryProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmed" element={<OrderConfirmedPage />} />
            <Route path="/order/:id" element={<OrderDetailPage />} />

            {/* Account Sub-routes */}
            <Route path="/account/address" element={<AddressListPage />} />
            <Route path="/account/address-form" element={<AddressFormPage />} />
            <Route path="/account/payment" element={<PaymentPage />} />
            <Route path="/account/notifications" element={<NotificationsPage />} />
            <Route path="/account/help" element={<HelpPage />} />
            <Route path="/account/about" element={<AboutPage />} />
            <Route path="/account/settings" element={<SettingsPage />} />
            <Route path="/account/edit-profile" element={<EditProfilePage />} />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/home" replace />} />
          </IonRouterOutlet>

          {/* 5-Tab Bar matching Figma design */}
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon aria-hidden="true" icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton tab="category" href="/category">
              <IonIcon aria-hidden="true" icon={gridOutline} />
              <IonLabel>Category</IonLabel>
              <span className="tab-badge-pill">1</span>
            </IonTabButton>

            <IonTabButton tab="orders" href="/orders">
              <IonIcon aria-hidden="true" icon={storefrontOutline} />
              <IonLabel>Orders</IonLabel>
            </IonTabButton>

            <IonTabButton tab="cart" href="/cart">
              <IonIcon aria-hidden="true" icon={cartOutline} />
              <IonLabel>Cart</IonLabel>
              {itemCount > 0 && (
                <span className="tab-badge-pill">{itemCount}</span>
              )}
            </IonTabButton>

            <IonTabButton tab="account" href="/account">
              <IonIcon aria-hidden="true" icon={personOutline} />
              <IonLabel>Account</IonLabel>
              <span className="tab-badge-pill">2</span>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

import React from 'react';
import { IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import { Product } from '../types';
import { formatCurrency } from '../utils/format';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  onAddToCart: (product: Product) => void;
  onClick?: (product: Product) => void;
  style?: React.CSSProperties;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = 'grid',
  onAddToCart,
  onClick,
  style,
}) => {
  const handleClick = () => {
    if (onClick) onClick(product);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={handleClick}
        role="button"
        tabIndex={0}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 14px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          gap: '14px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
          border: '1px solid #F1F5F9',
          marginBottom: '10px',
          cursor: 'pointer',
          ...style,
        }}
        className="product-card-list"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '12px',
            objectFit: 'cover',
            backgroundColor: '#F1F5F9',
            flexShrink: 0,
          }}
          loading="lazy"
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1E293B',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.name}
          </div>
          <div
            style={{
              fontSize: '15px',
              fontWeight: '700',
              color: '#162544',
              marginTop: '4px',
            }}
          >
            {formatCurrency(product.price, false)}
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
            Uploaded {product.uploadedAgo}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EEF0FD',
            border: 'none',
            borderRadius: '12px',
            padding: '8px 12px',
            minWidth: '54px',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
          }}
          aria-label={`Add ${product.name} to cart`}
        >
          <IonIcon icon={add} style={{ fontSize: '18px', color: '#162544' }} />
          <span style={{ fontSize: '9px', fontWeight: '600', color: '#162544', marginTop: '2px' }}>
            View details
          </span>
        </button>
      </div>
    );
  }

  // Grid view (2 columns) matching Figma Screenshot Image 13!
  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
        border: '1px solid #F1F5F9',
        cursor: 'pointer',
        height: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
      className="product-card-grid"
    >
      <div style={{ position: 'relative', width: '100%', paddingTop: '75%', marginBottom: '10px' }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '12px',
            objectFit: 'cover',
            backgroundColor: '#F8FAFC',
          }}
          loading="lazy"
        />
      </div>

      <div
        style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#1E293B',
          lineHeight: '1.3',
          minHeight: '34px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {product.name}
      </div>

      <div
        style={{
          fontSize: '14px',
          fontWeight: '700',
          color: '#162544',
          marginTop: '6px',
        }}
      >
        {formatCurrency(product.price, false)}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '6px',
        }}
      >
        <span style={{ fontSize: '11px', color: '#94A3B8' }}>
          Uploaded {product.uploadedAgo}
        </span>

        <button
          type="button"
          onClick={handleAdd}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EEF0FD',
            border: 'none',
            borderRadius: '8px',
            width: '26px',
            height: '26px',
            cursor: 'pointer',
            color: '#162544',
            fontSize: '16px',
          }}
          aria-label={`Add ${product.name} to cart`}
        >
          <IonIcon icon={add} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import React from 'react';
import { IonIcon } from '@ionic/react';
import {
  chevronForwardOutline,
  nutritionOutline,
  eggOutline,
  fastFoodOutline,
  cafeOutline,
  serverOutline,
  restaurantOutline,
  wineOutline,
  leafOutline,
  sparklesOutline,
  heartOutline,
} from 'ionicons/icons';
import { Category } from '../types';

interface CategoryRowProps {
  category: Category & { productCount?: number };
  onClick: () => void;
  style?: React.CSSProperties;
}

const iconMap: Record<string, string> = {
  'fruits-vegetables': nutritionOutline,
  'protein-dairy': eggOutline,
  'snacks': fastFoodOutline,
  'beverages': cafeOutline,
  'grains-pasta': serverOutline,
  'bakery': restaurantOutline,
  'drinks': wineOutline,
  'fresh-produce': leafOutline,
  'household-cleaning': sparklesOutline,
  'personal-care': heartOutline,
};

export const CategoryRow: React.FC<CategoryRowProps> = ({
  category,
  onClick,
  style,
}) => {
  const icon = iconMap[category.id] || nutritionOutline;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '14px 18px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        gap: '14px',
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        marginBottom: '10px',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        ...style,
      }}
      className="category-row-card"
    >
      <div
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          backgroundColor: '#EEF0FD',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#162544',
          fontSize: '20px',
          flexShrink: 0,
        }}
      >
        <IonIcon icon={icon} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '15px', fontWeight: '600', color: '#162544' }}>
          {category.name}
        </div>
        {category.productCount !== undefined && (
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
            {category.productCount} {category.productCount === 1 ? 'product' : 'products'} available
          </div>
        )}
      </div>

      <IonIcon
        icon={chevronForwardOutline}
        style={{ fontSize: '18px', color: '#94A3B8', flexShrink: 0 }}
      />
    </div>
  );
};

export default CategoryRow;

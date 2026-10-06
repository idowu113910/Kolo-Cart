import React from 'react';
import { IonAlert } from '@ionic/react';
import { CartConflictInfo } from '../store/cartStore';

interface NewCartDialogProps {
  isOpen: boolean;
  conflictInfo: CartConflictInfo | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const NewCartDialog: React.FC<NewCartDialogProps> = ({
  isOpen,
  conflictInfo,
  onConfirm,
  onCancel,
}) => {
  if (!conflictInfo) return null;

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onCancel}
      header="Start a new cart?"
      subHeader={`Your cart contains items from ${conflictInfo.currentSupermarketName}`}
      message={`Would you like to clear your existing items and add "${conflictInfo.incomingProduct.name}" from ${conflictInfo.incomingSupermarketName}?`}
      buttons={[
        {
          text: 'Cancel',
          role: 'cancel',
          handler: onCancel,
        },
        {
          text: 'Start New Cart',
          role: 'destructive',
          handler: onConfirm,
        },
      ]}
    />
  );
};

export default NewCartDialog;

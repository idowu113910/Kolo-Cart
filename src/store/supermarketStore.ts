import { useState, useEffect } from 'react';
import { Supermarket } from '../types';
import { getSupermarketById, getRankedSupermarkets } from '../data';

const STORAGE_KEY = 'kolocart_selected_supermarket';

type Listener = () => void;
const listeners = new Set<Listener>();

let selectedSupermarketId: string = (() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && getSupermarketById(saved)) {
    return saved;
  }
  // Default to the top-ranked supermarket
  const ranked = getRankedSupermarkets();
  return ranked[0]?.id || 'icecold-bird';
})();

function emitChange() {
  localStorage.setItem(STORAGE_KEY, selectedSupermarketId);
  listeners.forEach(listener => listener());
}

export const supermarketStore = {
  getSelectedId(): string {
    return selectedSupermarketId;
  },

  getSelectedSupermarket(): Supermarket | undefined {
    return getSupermarketById(selectedSupermarketId);
  },

  select(id: string) {
    if (selectedSupermarketId !== id) {
      selectedSupermarketId = id;
      emitChange();
    }
  },

  clear() {
    const ranked = getRankedSupermarkets();
    selectedSupermarketId = ranked[0]?.id || 'icecold-bird';
    emitChange();
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }
};

/**
 * Custom React hook for subscribing to supermarket state
 */
export function useSupermarketStore() {
  const [selectedId, setSelectedId] = useState<string>(supermarketStore.getSelectedId());

  useEffect(() => {
    return supermarketStore.subscribe(() => {
      setSelectedId(supermarketStore.getSelectedId());
    });
  }, []);

  const selectedSupermarket = supermarketStore.getSelectedSupermarket();

  return {
    selectedId,
    selectedSupermarket,
    selectSupermarket: supermarketStore.select,
    clearSupermarket: supermarketStore.clear,
    rankedSupermarkets: getRankedSupermarkets(),
  };
}

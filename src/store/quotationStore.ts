import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { QuotationItem } from '@features/quotations/types';

interface QuotationState {
  /** Items del carrito de cotización */
  items: QuotationItem[];
  /** Datos del cliente y finca */
  clientName: string;
  farmName: string;
  vendorName: string;

  // Items
  addItem: (item: Omit<QuotationItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateItemPrice: (id: string, price: number) => void;
  updateItemPresentation: (id: string, presentation: string) => void;
  clearItems: () => void;

  // Cliente
  setClientName: (name: string) => void;
  setFarmName: (name: string) => void;
  setVendorName: (name: string) => void;

  // Selectores
  total: () => number;
  count: () => number;
  reset: () => void;
}

const generateId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

export const useQuotationStore = create<QuotationState>()(
  persist(
    (set, get) => ({
      items: [],
      clientName: '',
      farmName: '',
      vendorName: 'Asesor Aurofarma',

      addItem: (item) =>
        set((state) => ({
          items: [...state.items, { ...item, id: generateId() }],
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateItemPrice: (id, price) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, precioUnitario: price } : i)),
        })),

      updateItemPresentation: (id, presentation) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, presentacion: presentation } : i,
          ),
        })),

      clearItems: () => set({ items: [] }),

      setClientName: (clientName) => set({ clientName }),
      setFarmName: (farmName) => set({ farmName }),
      setVendorName: (vendorName) => set({ vendorName }),

      total: () => {
        const items = get().items;
        return items.reduce((acc, item) => acc + item.precioUnitario, 0);
      },

      count: () => get().items.length,

      reset: () =>
        set({
          items: [],
          clientName: '',
          farmName: '',
          vendorName: 'Asesor Aurofarma',
        }),
    }),
    {
      name: 'auroapp.quotation',
      storage: createJSONStorage(() => AsyncStorage),
      // Selectores de qué se persiste
      partialize: (state) => ({
        items: state.items,
        clientName: state.clientName,
        farmName: state.farmName,
        vendorName: state.vendorName,
      }),
    },
  ),
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define theme type
export type Theme = 'light' | 'dark' | 'system';

// Define the UI state interface
interface UIState {
  theme: Theme;
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  
  // Actions
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

// Create the UI store
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Initial state
      theme: 'system',
      isSidebarOpen: true,
      isMobileMenuOpen: false,
      isModalOpen: false,
      modalContent: null,
      
      // Actions
      setTheme: (theme) => set({ theme }),
      
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
      
      openModal: (content) => set({ isModalOpen: true, modalContent: content }),
      closeModal: () => set({ isModalOpen: false, modalContent: null }),
    }),
    {
      name: 'ui-storage', // name of the item in localStorage
      partialize: (state) => ({ 
        theme: state.theme,
        isSidebarOpen: state.isSidebarOpen,
      }), // only persist these fields
    }
  )
); 
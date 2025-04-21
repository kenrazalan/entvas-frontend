import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the user type
export interface User {
  id: number;
  name: string;
  email: string;
}

// Define the auth state interface
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
}

// Create the auth store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Actions
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // This would be replaced with your actual API call
          // const response = await api.post('/auth/login', { email, password });
          // const { user, token } = response.data;
          
          // Mock response for demonstration
          const mockUser = { id: 1, name: 'Test User', email };
          const mockToken = 'mock-jwt-token';
          
          // Update localStorage for API service
          localStorage.setItem('token', mockToken);
          
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: (error as Error).message || 'Login failed',
            isLoading: false,
          });
        }
      },
      
      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          // This would be replaced with your actual API call
          // const response = await api.post('/auth/register', { name, email, password });
          // const { user, token } = response.data;
          
          // Mock response for demonstration
          const mockUser = { id: 1, name, email };
          const mockToken = 'mock-jwt-token';
          
          // Update localStorage for API service
          localStorage.setItem('token', mockToken);
          
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: (error as Error).message || 'Registration failed',
            isLoading: false,
          });
        }
      },
      
      logout: () => {
        // Clear localStorage
        localStorage.removeItem('token');
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },
      
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setError: (error) => set({ error }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }), // only persist these fields
    }
  )
); 
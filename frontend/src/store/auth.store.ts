import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  last_name: string;
  username: string;
  foto?: string; 
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUserPhoto: (newPhotoUrl: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      login: (token, user) => {
        set({
          token: token,
          user: user,
        });
      },

      logout: () => {
        set({
          token: null,
          user: null,
        });
      },

      updateUserPhoto: (newPhotoUrl) => {
        set((state) => ({
     
          user: state.user
            ? { ...state.user, foto: newPhotoUrl }
            : null,
        }));
      },
    }),
    {
      name: 'foodboxd-auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

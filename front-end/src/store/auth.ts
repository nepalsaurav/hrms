import { AuthModel } from 'pocketbase'
import { create } from 'zustand'
import { pb } from './pb'

// create authstore for check login user

interface AuthStore {
    currentUser: AuthModel
    setCurrentUser: (currentUser: AuthModel) => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
    currentUser: pb.authStore.model,
    setCurrentUser: (currentUser: AuthModel) => set(() => ({ currentUser: currentUser })),
}))
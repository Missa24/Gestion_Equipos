import { persist } from "zustand/middleware"
import { create } from "zustand";
import { LoginResponse } from "@/features/Auth/schema/AuthSchema"

interface AuthState {
    token: string | null;
    user: LoginResponse["data"]["userData"] | null;
    login: (response: LoginResponse) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,

            login: (response: LoginResponse) =>
                set({
                    token: response.data.accessToken,
                    user: response.data.userData,
                }),

            logout: () =>
                set({
                    token: null,
                    user: null,
                }),
        }),
        {
            name: "auth-storage",
        }
    )
);
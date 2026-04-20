import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";

const apiService = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

apiService.interceptors.request.use(config => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            const { logout } = useAuthStore.getState();
            logout();
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export { apiService };
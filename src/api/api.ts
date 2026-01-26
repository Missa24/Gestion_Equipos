import axios from "axios";

const apiService = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

apiService.interceptors.request.use(config => {
    const token = "12321";
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export { apiService };
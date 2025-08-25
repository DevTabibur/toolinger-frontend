import axios from "axios";

const API_BASE_URL = 'http://localhost:5000/api/v1';

// Helper to build dynamic API URLs
function buildUrl(path: string) {
    if (API_BASE_URL.endsWith("/") && path.startsWith("/")) {
        return API_BASE_URL + path.slice(1);
    }
    if (!API_BASE_URL.endsWith("/") && !path.startsWith("/")) {
        return API_BASE_URL + "/" + path;
    }
    return API_BASE_URL + path;
}

// Register New User
export async function registerNewUser(data: any) {
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/register`, data);
        return res.data;
    } catch (error: any) {
        // You can handle error as needed
        console.log("Register error", error);
        // throw error?.response?.data || error;
    }
}

// Login Existing User
export async function loginExistingUser(data: any) {
    try {
        const res = await axios.post(buildUrl("/auth/login"), data);
        return res.data;
    } catch (error: any) {
        console.log("Login error", error);
        // throw error?.response?.data || error;
    }
}

// Change Password
export async function changePassword(data: any) {
    try {
        const res = await axios.post(buildUrl("/auth/change-password"), data);
        return res.data;
    } catch (error: any) {
        console.log("Change password error", error);
        // throw error?.response?.data || error;
    }
}

// Forgot Password
export async function forgotPassword(data: any) {
    try {
        const res = await axios.post(buildUrl("/auth/forgot-password"), data);
        return res.data;
    } catch (error: any) {
        console.log("Forgot password error", error);
        // throw error?.response?.data || error;
    }
}

// Reset Password
export async function resetPassword(data: any) {
    try {
        const res = await axios.post(buildUrl("/auth/reset-password"), data);
        return res.data;
    } catch (error: any) {
        console.log("Reset password error", error);
        // throw error?.response?.data || error;
    }
}

// Log Out User
export async function logOutUser(userId: string) {
    try {
        const res = await axios.post(buildUrl(`/auth/log-out/${userId}`));
        return res.data;
    } catch (error: any) {
        console.log("Log out error", error);
        // throw error?.response?.data || error;
    }
}

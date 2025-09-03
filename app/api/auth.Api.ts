import { getFromLocalStorage } from "@/lib/local-storage";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Register New User
export async function registerNewUser(data: any) {
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/register`, data);
        return res.data;
    } catch (error: any) {
        console.log("Register error", error);
        // throw error?.response?.data || error;
    }
}

// Login Existing User
export async function loginExistingUser(data: any) {
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/login`, data);
        return res.data;
    } catch (error: any) {
        console.log("Login error", error);
        // throw error?.response?.data || error;
    }
}

// Change Password
export async function changePassword(data: any) {
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/change-password`, data);
        return res.data;
    } catch (error: any) {
        console.log("Change password error", error);
        // throw error?.response?.data || error;
    }
}

// Forgot Password
export async function forgotPassword(data: any) {
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/forgot-password`, data);
        return res.data;
    } catch (error: any) {
        console.log("Forgot password error", error);
        // throw error?.response?.data || error;
    }
}

// Reset Password
export async function resetPassword(data: any) {
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/reset-password`, data);
        return res.data;
    } catch (error: any) {
        console.log("Reset password error", error);
        // throw error?.response?.data || error;
    }
}

// Log Out User
export async function logOutUser() {
    try {
        const adsToken = getFromLocalStorage("toolinger");

        if (!adsToken) {
            console.log("No toolinger found in localStorage");
            return;
        }
        const res = await axios.post(
            `${API_BASE_URL}/auth/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${adsToken}`,
                },
            }
        );
        return res.data;
    } catch (error: any) {
        console.log("Log out error", error);
        // throw error?.response?.data || error;
    }
}

export const getMe = async () => {
    try {
        const adsToken = getFromLocalStorage("toolinger");

        if (!adsToken) {
            console.log("No toolinger found in localStorage");
            return;
        }
        const response = await axios.get(`${API_BASE_URL}/auth/get-me`, {
            headers: {
                Authorization: `${adsToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error getting me", error);
        // throw error;
    }
};
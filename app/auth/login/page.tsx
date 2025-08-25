"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { loginExistingUser } from "@/app/api/auth.Api";
import { useRouter } from "next/navigation";
import { setToLocalStorage } from "@/lib/local-storage";

// Toolinger brand color (from image): #00b6d6
const TOOLINGER_COLOR = "#00b6d6";
const TOOLINGER_GRADIENT_FROM = "#00b6d6";
const TOOLINGER_GRADIENT_TO = "#1ed6e6";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Enter a valid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter()



    // handleSubmit function
    const handleSubmit = async (
        values: {

            email: string;
            password: string;
        },
        { setSubmitting }: FormikHelpers<{

            email: string;
            password: string;
        }>
    ) => {
        try {
            const res = await loginExistingUser(values);
            console.log("res", res)
            if (res?.statusCode === 200) {
                // Registration successful, you can redirect or show a success message here
                console.log("login successful:", res);
                toast.success(res?.message)
                setToLocalStorage("accessToken", res?.data?.accessToken)
                router.push('/dashboard')
            } else {
                // Handle unexpected response
                toast.error("Something went wrong")
                console.log("Unexpected response from login:", res);
            }
        } catch (error) {
            // Handle network or unexpected errors
            console.log("An error occurred during login:", error);
        }

    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center bg-background px-4 py-8"
            style={{ backgroundColor: "#0a1622" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="w-full max-w-md bg-white dark:bg-[#101c2b] rounded-2xl shadow-xl p-8 border border-[#0e2a3a]"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
            >
                <motion.div
                    className="mb-8 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Link href="/" className="inline-flex items-center space-x-2">
                        <motion.div
                            className="gradient-bg p-2 rounded-lg"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                        >
                            <Wrench className="h-6 w-6 text-white" />
                        </motion.div>
                        <motion.span
                            className="text-xl font-bold gradient-text"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.22 }}
                        >
                            Toolinger
                        </motion.span>
                    </Link>
                    <motion.h2
                        className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.28 }}
                    >
                        Sign in to your account
                    </motion.h2>
                    <motion.p
                        className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.34 }}
                    >
                        Or{" "}
                        <Link
                            href="/auth/register"
                            className="font-medium"
                            style={{
                                color: TOOLINGER_COLOR,
                            }}
                        >
                            create a new account
                        </Link>
                    </motion.p>
                </motion.div>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 }}
                            >
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        className="block w-full rounded-lg border border-gray-300 dark:border-[#1ed6e6] bg-gray-50 dark:bg-[#14283a] px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: TOOLINGER_COLOR,
                                            boxShadow: "none",
                                        }}
                                    />
                                    <ErrorMessage
                                        name="email"
                                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                                    />
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.18 }}
                            >
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Password
                                </label>
                                <div className="mt-1 relative">
                                    <Field
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="block w-full rounded-lg border border-gray-300 dark:border-[#1ed6e6] bg-gray-50 dark:bg-[#14283a] px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 pr-12"
                                        style={{
                                            borderColor: TOOLINGER_COLOR,
                                            boxShadow: "none",
                                        }}
                                    />
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center text-gray-400 hover:text-cyan-400"
                                        onClick={() => setShowPassword((v) => !v)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    // style={{
                                    //     height: "2rem", // Ensures the button is tall enough for vertical centering
                                    //     display: "flex",
                                    //     alignItems: "center",
                                    //     justifyContent: "center",
                                    //     padding: 0,
                                    //     background: "none",
                                    //     border: "none",
                                    // }}
                                    >
                                        <AnimatePresence mode="wait" initial={false}>
                                            {showPassword ? (
                                                <motion.svg
                                                    key="eye-off"
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    viewBox="0 0 24 24"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.18 }}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M6.343 6.343A8.001 8.001 0 0112 4c4.418 0 8 3.582 8 8 0 1.657-.336 3.236-.938 4.675M17.657 17.657A8.001 8.001 0 0112 20c-4.418 0-8-3.582-8-8 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <line
                                                        x1="3"
                                                        y1="3"
                                                        x2="21"
                                                        y2="21"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                    />
                                                </motion.svg>
                                            ) : (
                                                <motion.svg
                                                    key="eye"
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    viewBox="0 0 24 24"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.18 }}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M1.458 12C2.732 7.943 6.523 5 12 5c5.477 0 9.268 2.943 10.542 7-1.274 4.057-5.065 7-10.542 7-5.477 0-9.268-2.943-10.542-7z"
                                                    />
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="3"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    />
                                                </motion.svg>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                    <ErrorMessage
                                        name="password"
                                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                                    />
                                </div>
                            </motion.div>
                            <motion.div
                                className="flex items-center justify-between"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.22 }}
                            >
                                <div className="flex items-center">
                                    <Field
                                        id="remember"
                                        name="remember"
                                        type="checkbox"
                                        className="h-4 w-4"
                                        style={{
                                            accentColor: TOOLINGER_COLOR,
                                        }}
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <Link
                                        href="/auth/forgot"
                                        className="font-medium"
                                        style={{
                                            color: TOOLINGER_COLOR,
                                        }}
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            </motion.div>
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center px-4 py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition gradient-bg"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.28 }}
                            >
                                {isSubmitting ? (
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8z"
                                        ></path>
                                    </svg>
                                ) : null}
                                Sign In
                            </motion.button>
                        </Form>
                    )}
                </Formik>
                <motion.div
                    className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                >
                    &copy; {new Date().getFullYear()} <span style={{ color: TOOLINGER_COLOR }}>Toolinger</span>. All rights reserved.
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

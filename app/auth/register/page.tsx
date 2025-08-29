"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Wrench, Eye, EyeOff } from "lucide-react";
import { registerNewUser } from "@/app/api/auth.Api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setToLocalStorage } from "@/lib/local-storage";

const TOOLINGER_COLOR = "#00b6d6";
const TOOLINGER_GRADIENT_FROM = "#00b6d6";
const TOOLINGER_GRADIENT_TO = "#1ed6e6";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(32, "First name too long")
    .required("First name is required"),
  lastName: Yup.string()
    .max(32, "Last name too long")
    .required("Last name is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter()

  // handleSubmit function
  const handleSubmit = async (
    values: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
      role: "user";
      status: "active";
    },
    { setSubmitting }: FormikHelpers<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
      role: "user";
      status: "active";
    }>
  ) => {
    const { confirmPassword, ...rest } = values;
    try {
      const res = await registerNewUser(rest);
      console.log("res", res)
      if (res?.statusCode === 200) {
        // Registration successful, you can redirect or show a success message here
        // console.log("Registration successful:", res);
        toast.success(res?.message)
        setToLocalStorage("toolinger", res?.data?.accessToken)
        router.push('/dashboard')
      } else {
        // Handle unexpected response
        console.log("Unexpected response from registerNewUser:", res);
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.log("An error occurred during registration:", error);
    }

  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background px-4 py-8"
      style={{ backgroundColor: "#0a1622" }}
    >
      <div className="w-full max-w-md bg-white dark:bg-[#101c2b] rounded-2xl shadow-xl p-8 border border-[#0e2a3a]">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div
              className="gradient-bg p-2 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${TOOLINGER_GRADIENT_FROM}, ${TOOLINGER_GRADIENT_TO})`,
              }}
            >
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <span
              className="text-xl font-bold gradient-text"
              style={{
                background: `linear-gradient(90deg, ${TOOLINGER_GRADIENT_FROM}, ${TOOLINGER_GRADIENT_TO})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Toolinger
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Or{" "}
            <Link
              href="/auth/login"
              className="font-medium underline"
              style={{
                color: TOOLINGER_COLOR,
              }}
            >
              sign in to your account
            </Link>
          </p>
        </div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            status: "active",
            role: "user",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    First Name
                  </label>
                  <div className="mt-1">
                    <Field
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="First name"
                      className="block w-full rounded-lg border border-gray-300 dark:border-[#1ed6e6] bg-gray-50 dark:bg-[#14283a] px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2"
                      style={{
                        borderColor: TOOLINGER_COLOR,
                        boxShadow: "none",
                      }}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-400"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Last Name
                  </label>
                  <div className="mt-1">
                    <Field
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Last name"
                      className="block w-full rounded-lg border border-gray-300 dark:border-[#1ed6e6] bg-gray-50 dark:bg-[#14283a] px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2"
                      style={{
                        borderColor: TOOLINGER_COLOR,
                        boxShadow: "none",
                      }}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-400"
                    />
                  </div>
                </div>
              </div>
              <div>
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
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                  />
                </div>
              </div>
              <div>
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
                    autoComplete="new-password"
                    placeholder="Password"
                    className="block w-full rounded-lg border border-gray-300 dark:border-[#1ed6e6] bg-gray-50 dark:bg-[#14283a] px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 pr-10"
                    style={{
                      borderColor: TOOLINGER_COLOR,
                      boxShadow: "none",
                    }}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-300"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    className="block w-full rounded-lg border border-gray-300 dark:border-[#1ed6e6] bg-gray-50 dark:bg-[#14283a] px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 pr-10"
                    style={{
                      borderColor: TOOLINGER_COLOR,
                      boxShadow: "none",
                    }}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-300"
                    onClick={() => setShowConfirm((v) => !v)}
                  >
                    {showConfirm ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white"
                  style={{
                    background: `linear-gradient(90deg, ${TOOLINGER_GRADIENT_FROM}, ${TOOLINGER_GRADIENT_TO})`,
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

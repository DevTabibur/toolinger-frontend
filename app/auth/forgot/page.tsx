"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Wrench } from "lucide-react";
import { useState } from "react";

// Toolinger brand color and gradient
const TOOLINGER_COLOR = "#00b6d6";
const TOOLINGER_GRADIENT_FROM = "#00b6d6";
const TOOLINGER_GRADIENT_TO = "#1ed6e6";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
});

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  // handleSubmit function that logs the values
  const handleSubmit = (
    values: { email: string },
    { setSubmitting }: FormikHelpers<{ email: string }>
  ) => {
    console.log("Forgot password form values:", values);
    // Here you would typically call your API to send the reset email
    
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background px-4 py-8"
      style={{ backgroundColor: "#0a1622" }}
    >
      <div className="w-full max-w-md bg-white dark:bg-[#101c2b] rounded-2xl shadow-xl p-8 border border-[#0e2a3a]">
        <div className="mb-8 text-center">
          <Link href="/" className="flex items-center space-x-2 justify-center">
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
                color: "transparent",
              }}
            >
              Toolinger
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Forgot your password?
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-2xl mb-2" style={{ color: TOOLINGER_COLOR }}>
              Check your email
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              If an account exists for that email, you’ll receive a password reset link shortly.
            </div>
            <Link
              href="/auth/login"
              className="inline-block mt-6 px-4 py-2 rounded-lg font-semibold gradient-bg text-white"
              style={{
                background: `linear-gradient(90deg, ${TOOLINGER_GRADIENT_FROM}, ${TOOLINGER_GRADIENT_TO})`,
              }}
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
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
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white gradient-bg focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{
                      background: `linear-gradient(90deg, ${TOOLINGER_GRADIENT_FROM}, ${TOOLINGER_GRADIENT_TO})`,
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </button>
                </div>
                <div className="text-center mt-4">
                  <Link
                    href="/auth/login"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Back to Sign In
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}

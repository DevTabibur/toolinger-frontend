"use client"
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const DiscountCalculator = (props: { article?: any, seo?: any }) => {
  const [saving, setSaving] = React.useState<number | null>(null);
  const [remaining, setRemaining] = React.useState<number | null>(null);

  const formik = useFormik({
    initialValues: {
      originalPrice: "",
      discount: "",
    },
    validationSchema: Yup.object({
      originalPrice: Yup.number()
        .typeError("Must be a number")
        .positive("Must be greater than zero")
        .required("Required"),
      discount: Yup.number()
        .typeError("Must be a number")
        .min(0, "Cannot be negative")
        .max(100, "Cannot exceed 100%")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const price = parseFloat(values.originalPrice);
      const discount = parseFloat(values.discount);
      const savingAmount = (price * discount) / 100;
      const remainingAmount = price - savingAmount;
      setSaving(savingAmount);
      setRemaining(remainingAmount);
    },
  });

  return (
    <>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary flex items-center"
          >
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link
            href="/category/calculators"
            className="text-muted-foreground hover:text-primary"
          >
            Calculator Tools
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground font-medium">Discount Calculator</span>
        </nav>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* First column: col-span-7 on md+ */}
          <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
              Discount Calculator
            </h2>
            <form onSubmit={formik.handleSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <label
                    htmlFor="originalPrice"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Original price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">$</span>
                    <input
                      id="originalPrice"
                      name="originalPrice"
                      type="text"
                      placeholder="$"
                      className={`pl-7 pr-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 ${formik.touched.originalPrice && formik.errors.originalPrice
                        ? "border-red-500"
                        : "border-green-400"
                        }`}
                      value={formik.values.originalPrice}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                  </div>
                  {formik.touched.originalPrice && formik.errors.originalPrice ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.originalPrice}</div>
                  ) : null}
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="discount"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Discount %
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">%</span>
                    <input
                      id="discount"
                      name="discount"
                      type="text"
                      placeholder="%"
                      className={`pl-7 pr-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 ${formik.touched.discount && formik.errors.discount
                        ? "border-red-500"
                        : "border-green-400"
                        }`}
                      value={formik.values.discount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                  </div>
                  {formik.touched.discount && formik.errors.discount ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.discount}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-8 rounded shadow transition-colors"
                >
                  Calculate
                </button>
              </div>
            </form>
            {(saving !== null && remaining !== null) && (
              <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
                <div className="flex-1 max-w-xs border border-blue-400 rounded p-4 text-center mx-auto">
                  <div className="text-xl font-semibold text-blue-700 mb-1">Saving</div>
                  <div className="text-lg text-gray-800 dark:text-gray-100">${saving.toFixed(2)}</div>
                </div>
                <div className="flex-1 max-w-xs border border-blue-400 rounded p-4 text-center mx-auto">
                  <div className="text-xl font-semibold text-blue-700 mb-1">Remaining</div>
                  <div className="text-lg text-gray-800 dark:text-gray-100">${remaining.toFixed(2)}</div>
                </div>
              </div>
            )}
          </div>
          {/* Second column: col-span-5 on md+ */}
          <div className="md:col-span-5 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
            {/* You can place content for the second column here */}
            Advertiesment
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* First column: col-span-6 on md+ */}
          <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
            Advertiesment
          </div>
          {/* Second column: col-span-6 on md+ */}
          <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
            Advertiesment
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 ">
                        <div className="border-t border-gray-200 dark:border-gray-700">
                            {props?.article && (
                                <div
                                    className="prose max-w-none mt-8 "
                                    dangerouslySetInnerHTML={{ __html: props?.article || ""}}
                                />
                            )}
                        </div>
                    </div>
                    {/* Second column: col-span-5 on md+ */}
                    <div className="md:col-span-5 col-span-1 ">
                        {/* You can place content for the second column here */}
                        {/* Advertiesment */}
                    </div>
                </div>
            </div>
    </>
  );
};

export default DiscountCalculator;

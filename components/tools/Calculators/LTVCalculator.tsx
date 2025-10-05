"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import ReleavantToolsSidebar from "@/components/ReleavantToolsSidebar";
import { popularTools } from "@/lib/categories";

const otherTools = [
  {
    id: "adsense-calculator",
    name: "AdSense Calculator",
    description: "Calculate potential AdSense earnings",
    category: "Calculators",
    slug: "adsense-calculator",
    categorySlug: "calculators",
    icon: "💵",
  },
  {
    id: "discount-calculator",
    name: "Discount Calculator",
    description: "Calculate discounts and final prices",
    category: "Calculators",
    slug: "discount-calculator",
    categorySlug: "calculators",
    icon: "🏷️",
  },
  {
    id: "binary-calculator",
    name: "Binary Calculator",
    description: "Perform calculations in binary number system",
    category: "Calculators",
    slug: "binary-calculator",
    categorySlug: "calculators",
    icon: "🔢",
  },
  {
    id: "hex-calculator",
    name: "HEX Calculator",
    description: "Perform calculations in hexadecimal number system",
    category: "Calculators",
    slug: "hex-calculator",
    categorySlug: "calculators",
    icon: "🔷",
  },
  {
    id: "octal-calculator",
    name: "Octal Calculator",
    description: "Perform calculations in octal number system",
    category: "Calculators",
    slug: "octal-calculator",
    categorySlug: "calculators",
    icon: "🧮",
  },
  {
    id: "earnings-per-share-calculator",
    name: "Earnings Per Share Calculator",
    description: "Calculate earnings per share",
    category: "Calculators",
    slug: "earnings-per-share-calculator",
    categorySlug: "calculators",
    icon: "💹",
  },
  {
    id: "probability-calculator",
    name: "Probability Calculator",
    description: "Calculate probabilities for various events",
    category: "Calculators",
    slug: "probability-calculator",
    categorySlug: "calculators",
    icon: "🎲",
  },
  {
    id: "gst-calculator",
    name: "GST Calculator",
    description: "Calculate GST (Goods and Services Tax)",
    category: "Calculators",
    slug: "gst-calculator",
    categorySlug: "calculators",
    icon: "🧾",
  },
  {
    id: "average-calculator",
    name: "Average Calculator",
    description: "Calculate mean, median, and mode",
    category: "Calculators",
    slug: "average-calculator",
    categorySlug: "calculators",
    icon: "📊",
  },
  {
    id: "sales-tax-calculator",
    name: "Sales Tax Calculator",
    description: "Calculate sales tax and gross price",
    category: "Calculators",
    slug: "sales-tax-calculator",
    categorySlug: "calculators",
    icon: "💰",
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate age in years, months, and days",
    category: "Calculators",
    slug: "age-calculator",
    categorySlug: "calculators",
    icon: "🧓",
  },
  {
    id: "pre-and-post-money-valuation",
    name: "Pre and Post Money Valuation",
    description: "Calculate pre and post money valuation for startups",
    category: "Calculators",
    slug: "pre-and-post-money-valuation",
    categorySlug: "calculators",
    icon: "🏦",
  },
];

// LTV calculation options
const ltvOptions = [
  {
    value: "deposit",
    label: "Deposit amount - To Calculate LTV and Loan Amount",
  },
  {
    value: "loan",
    label: "Loan amount - To Calculate LTV and Deposit Amount",
  },
  {
    value: "ltv",
    label: "LTV - To Calculate Loan Amount and Deposit Amount",
  },
];

// Validation helper
function validate(mode: string, values: any) {
  const errors: any = {};
  if (!values.purchasePrice || isNaN(Number(values.purchasePrice)) || Number(values.purchasePrice) <= 0) {
    errors.purchasePrice = "Required";
  }
  if (mode === "deposit") {
    if (values.depositAmount === "" || isNaN(Number(values.depositAmount)) || Number(values.depositAmount) < 0) {
      errors.depositAmount = "Required";
    }
  }
  if (mode === "loan") {
    if (values.loanAmount === "" || isNaN(Number(values.loanAmount)) || Number(values.loanAmount) < 0) {
      errors.loanAmount = "Required";
    }
  }
  if (mode === "ltv") {
    if (values.ltv === "" || isNaN(Number(values.ltv)) || Number(values.ltv) < 0) {
      errors.ltv = "Required";
    } else if (Number(values.ltv) > 100) {
      errors.ltv = "Cannot exceed 100";
    }
  }
  return errors;
}

// Calculation logic
function calculateResults(mode: string, values: any) {
  const purchasePrice = parseFloat(values.purchasePrice);
  const depositAmount = parseFloat(values.depositAmount);
  const loanAmount = parseFloat(values.loanAmount);
  const ltv = parseFloat(values.ltv);

  if (isNaN(purchasePrice) || purchasePrice <= 0) return null;

  switch (mode) {
    case "deposit":
      if (isNaN(depositAmount)) return null;
      const loanAmt = purchasePrice - depositAmount;
      const ltvVal = (loanAmt / purchasePrice) * 100;
      return {
        loanAmount: loanAmt,
        ltv: ltvVal,
        depositAmount,
        purchasePrice,
      };
    case "loan":
      if (isNaN(loanAmount)) return null;
      const depositAmt = purchasePrice - loanAmount;
      const ltvValue = (loanAmount / purchasePrice) * 100;
      return {
        loanAmount,
        ltv: ltvValue,
        depositAmount: depositAmt,
        purchasePrice,
      };
    case "ltv":
      if (isNaN(ltv)) return null;
      const loanAmountFromLtv = (ltv / 100) * purchasePrice;
      const depositAmountFromLtv = purchasePrice - loanAmountFromLtv;
      return {
        loanAmount: loanAmountFromLtv,
        ltv,
        depositAmount: depositAmountFromLtv,
        purchasePrice,
      };
    default:
      return null;
  }
}

const LTVCalculator = (props: { article?: any, seo?: any }) => {
  const [mode, setMode] = useState("deposit");
  const [values, setValues] = useState({
    purchasePrice: "",
    depositAmount: "",
    loanAmount: "",
    ltv: "",
  });
  const [touched, setTouched] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  // Reset form when mode changes
  React.useEffect(() => {
    setValues({
      purchasePrice: "",
      depositAmount: "",
      loanAmount: "",
      ltv: "",
    });
    setTouched({});
    setErrors({});
    setSubmitted(false);
  }, [mode]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouched((prev: any) => ({
      ...prev,
      [name]: true,
    }));
    setSubmitted(false);
  };

  // Handle blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev: any) => ({
      ...prev,
      [name]: true,
    }));
  };

  // Validate on every change
  React.useEffect(() => {
    setErrors(validate(mode, values));
  }, [mode, values]);

  // Calculate results only when submitted and valid
  const results = useMemo(() => {
    if (!submitted) return null;
    if (Object.keys(errors).length > 0) return null;
    return calculateResults(mode, values);
  }, [submitted, errors, values, mode]);

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      purchasePrice: true,
      depositAmount: true,
      loanAmount: true,
      ltv: true,
    });
    const validationErrors = validate(mode, values);
    setErrors(validationErrors);
    setSubmitted(true);
  };

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
          <span className="text-foreground font-medium">LTV Calculator</span>
        </nav>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* First column: col-span-7 on md+ */}
          <div className="md:col-span-7 col-span-1">
            <div className=" border rounded-lg p-4 mb-8 bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700">
              <h1 className="text-2xl font-bold mb-4 text-center">LTV Calculator</h1>
              <p className="text-center mb-6">
                To use the <b>LTV (Loan-to-Value) Calculator</b>, enter the property purchase price, your deposit amount, and the loan amount. Then press the <b>Calculate</b> button to see your LTV ratio and related results.
              </p>
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 shadow rounded px-4 py-6 mb-4 w-full max-w-2xl mx-auto"
                noValidate
              >
                {/* Dropdown */}
                <div className="mb-6">
                  <select
                    id="ltvMode"
                    name="ltvMode"
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="w-full border border-green-400 rounded px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {ltvOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Purchase Price */}
                  <div>
                    <label
                      htmlFor="purchasePrice"
                      className="block text-gray-700 dark:text-gray-300 text-sm mb-1"
                    >
                      Purchase Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">$</span>
                      <input
                        id="purchasePrice"
                        name="purchasePrice"
                        type="number"
                        min="0"
                        step="any"
                        placeholder=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.purchasePrice}
                        className="pl-7 pr-2 py-2 w-full border border-green-400 rounded bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    {touched.purchasePrice && errors.purchasePrice ? (
                      <div className="text-red-500 text-xs italic mt-1">
                        {errors.purchasePrice}
                      </div>
                    ) : null}
                  </div>
                  {/* Second input depends on mode */}
                  {mode === "deposit" && (
                    <div>
                      <label
                        htmlFor="depositAmount"
                        className="block text-gray-700 dark:text-gray-300 text-sm mb-1"
                      >
                        Deposit amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">$</span>
                        <input
                          id="depositAmount"
                          name="depositAmount"
                          type="number"
                          min="0"
                          step="any"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.depositAmount}
                          className="pl-7 pr-2 py-2 w-full border border-green-400 rounded bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      {touched.depositAmount && errors.depositAmount ? (
                        <div className="text-red-500 text-xs italic mt-1">
                          {errors.depositAmount}
                        </div>
                      ) : null}
                    </div>
                  )}
                  {mode === "loan" && (
                    <div>
                      <label
                        htmlFor="loanAmount"
                        className="block text-gray-700 dark:text-gray-300 text-sm mb-1"
                      >
                        Loan amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">$</span>
                        <input
                          id="loanAmount"
                          name="loanAmount"
                          type="number"
                          min="0"
                          step="any"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.loanAmount}
                          className="pl-7 pr-2 py-2 w-full border border-green-400 rounded bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      {touched.loanAmount && errors.loanAmount ? (
                        <div className="text-red-500 text-xs italic mt-1">
                          {errors.loanAmount}
                        </div>
                      ) : null}
                    </div>
                  )}
                  {mode === "ltv" && (
                    <div>
                      <label
                        htmlFor="ltv"
                        className="block text-gray-700 dark:text-gray-300 text-sm mb-1"
                      >
                        LTV (%)
                      </label>
                      <div className="relative">
                        <input
                          id="ltv"
                          name="ltv"
                          type="number"
                          min="0"
                          max="100"
                          step="any"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.ltv}
                          className="pl-3 pr-2 py-2 w-full border border-green-400 rounded bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">%</span>
                      </div>
                      {touched.ltv && errors.ltv ? (
                        <div className="text-red-500 text-xs italic mt-1">
                          {errors.ltv}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center mt-6">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-60"
                    disabled={false}
                  >
                    Calculate
                  </button>
                </div>
              </form>
            </div>
            {/* Results */}
            {submitted && results && (
              <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded shadow p-6 mt-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-gray-600 dark:text-gray-300">Purchase Price:</span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      ${results.purchasePrice?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-600 dark:text-gray-300">Deposit Amount:</span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      ${results.depositAmount?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-600 dark:text-gray-300">Loan Amount:</span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      ${results.loanAmount?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-600 dark:text-gray-300">LTV:</span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      {results.ltv?.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Second column: col-span-5 on md+ */}
          <div className="md:col-span-5 col-span-1">
            {/* You can place content for the second column here */}
            {/* Advertisement */}
            <ReleavantToolsSidebar title="Popular Tools" tools={popularTools as any} />
            <ReleavantToolsSidebar title="Other Tools" tools={otherTools as any} />
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
            Advertisement
          </div>
          <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
            Advertisement
          </div>
        </div> */}
      </div>

    </>
  );
};

export default LTVCalculator;

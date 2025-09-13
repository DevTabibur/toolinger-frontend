"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

// Margin calculation logic for each type
function calculateAll(
  marginType: string,
  totalSale: number,
  cost: number,
  operatingProfit: number,
  netProfit: number
) {
  let margin = 0;
  let profit = 0;
  let markup = 0;
  let usedProfit = 0;
  let usedLabel = "";

  if (totalSale === 0) {
    return { margin: 0, profit: 0, markup: 0, usedLabel: "", usedProfit: 0 };
  }

  switch (marginType) {
    case "gross":
      usedProfit = totalSale - cost;
      margin = (usedProfit / totalSale) * 100;
      profit = usedProfit;
      markup = cost === 0 ? 0 : (usedProfit / cost) * 100;
      usedLabel = "Gross Profit";
      break;
    case "operating":
      usedProfit = operatingProfit;
      margin = (operatingProfit / totalSale) * 100;
      profit = operatingProfit;
      markup = cost === 0 ? 0 : (operatingProfit / cost) * 100;
      usedLabel = "Operating Profit";
      break;
    case "net":
      usedProfit = netProfit;
      margin = (netProfit / totalSale) * 100;
      profit = netProfit;
      markup = cost === 0 ? 0 : (netProfit / cost) * 100;
      usedLabel = "Net Profit";
      break;
    default:
      break;
  }
  return { margin, profit, markup, usedLabel, usedProfit };
}

const marginOptions = [
  { value: "gross", label: "Gross Margin" },
  { value: "operating", label: "Operating Profit Margin" },
  { value: "net", label: "Net Margin" },
];

const validationSchema = Yup.object().shape({
  marginType: Yup.string().required("Margin type is required"),
  totalSale: Yup.number()
    .typeError("Total Sale must be a number")
    .required("Total Sale is required")
    .moreThan(0, "Total Sale must be greater than 0"),
  cost: Yup.number()
    .typeError("Cost must be a number")
    .required("Cost is required")
    .min(0, "Cost cannot be negative"),
  operatingProfit: Yup.number()
    .typeError("Operating Profit must be a number")
    .required("Operating Profit is required"),
  netProfit: Yup.number()
    .typeError("Net Profit must be a number")
    .required("Net Profit is required"),
});

const Gauge = ({ value }: { value: number }) => {
  // Clamp value between 0 and 100 for the gauge
  const percent = Math.max(0, Math.min(100, value));
  const angle = (percent / 100) * 180;
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <svg width="120" height="60" viewBox="0 0 120 60">
        <path
          d="M10,60 A50,50 0 0,1 110,60"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="12"
        />
        <path
          d="M10,60 A50,50 0 0,1 110,60"
          fill="none"
          stroke="#10b981"
          strokeWidth="12"
          strokeDasharray={`${(angle / 180) * 157},157`}
        />
        <circle
          cx={60 + 50 * Math.cos(Math.PI - (angle * Math.PI) / 180)}
          cy={60 - 50 * Math.sin(Math.PI - (angle * Math.PI) / 180)}
          r="6"
          fill="#10b981"
        />
      </svg>
      <div className="text-center text-lg font-semibold mt-2">
        {percent.toFixed(2)}%
      </div>
    </div>
  );
};

const MarginCalculator= (props: { article?: any, seo?: any }) => {
  const [result, setResult] = useState<null | ReturnType<typeof calculateAll>>(null);

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
          <span className="text-foreground font-medium">Margin Calculator</span>
        </nav>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* First column: col-span-7 on md+ */}
          <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
              Margin Calculator
            </h2>
            <Formik
              initialValues={{
                marginType: "gross",
                totalSale: "",
                cost: "",
                operatingProfit: "",
                netProfit: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                const totalSale = parseFloat(values.totalSale as string);
                const cost = parseFloat(values.cost as string);
                const operatingProfit = parseFloat(values.operatingProfit as string);
                const netProfit = parseFloat(values.netProfit as string);
                const marginType = values.marginType;
                const res = calculateAll(
                  marginType,
                  isNaN(totalSale) ? 0 : totalSale,
                  isNaN(cost) ? 0 : cost,
                  isNaN(operatingProfit) ? 0 : operatingProfit,
                  isNaN(netProfit) ? 0 : netProfit
                );
                setResult(res);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                  <div className="mb-4">
                    <Field
                      as="select"
                      name="marginType"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setFieldValue("marginType", e.target.value);
                      }}
                    >
                      {marginOptions.map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="marginType"
                      component="div"
                      className="text-xs text-red-500 mt-1"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1 flex flex-col">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Total Sale
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
                          $
                        </span>
                        <Field
                          name="totalSale"
                          type="text"
                          placeholder=""
                          className="pl-7 w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <ErrorMessage
                        name="totalSale"
                        component="div"
                        className="text-xs text-red-500 mt-1"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cost
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
                          $
                        </span>
                        <Field
                          name="cost"
                          type="text"
                          placeholder=""
                          className="pl-7 w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <ErrorMessage
                        name="cost"
                        component="div"
                        className="text-xs text-red-500 mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1 flex flex-col">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Operating Profit
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
                          $
                        </span>
                        <Field
                          name="operatingProfit"
                          type="text"
                          placeholder=""
                          className="pl-7 w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <ErrorMessage
                        name="operatingProfit"
                        component="div"
                        className="text-xs text-red-500 mt-1"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Net Profit (After Taxes)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
                          $
                        </span>
                        <Field
                          name="netProfit"
                          type="text"
                          placeholder=""
                          className="pl-7 w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <ErrorMessage
                        name="netProfit"
                        component="div"
                        className="text-xs text-red-500 mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-2 rounded shadow transition"
                    >
                      Calculate
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            {result && (
              <div className="mt-8 bg-gray-50 dark:bg-gray-900 rounded shadow p-6">
                <h3 className="text-xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
                  Result
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2">
                    <table className="w-full text-sm mb-4">
                      <tbody>
                        <tr>
                          <td className="py-2 font-semibold text-gray-700 dark:text-gray-200">
                            % Margin
                          </td>
                          <td className="py-2 text-emerald-600 dark:text-emerald-400">
                            {result.margin.toFixed(4)}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 font-semibold text-gray-700 dark:text-gray-200">
                            Profit $
                          </td>
                          <td className="py-2 text-blue-600 dark:text-blue-400">
                            ${result.profit.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 font-semibold text-gray-700 dark:text-gray-200">
                            Markup %
                          </td>
                          <td className="py-2 text-purple-600 dark:text-purple-400">
                            {result.markup.toFixed(4)}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 font-semibold text-gray-700 dark:text-gray-200">
                            Type
                          </td>
                          <td className="py-2 text-gray-900 dark:text-gray-100">
                            {result.usedLabel}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="md:col-span-1 flex items-center justify-center">
                    <Gauge value={result.margin} />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Second column: col-span-5 on md+ */}
          <div className="md:col-span-5 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center justify-center min-h-[200px]">
            {/* Placeholder for advertisement or additional content */}
            <span className="text-gray-400 dark:text-gray-500">Advertisement</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* First column: col-span-6 on md+ */}
          <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center justify-center min-h-[120px]">
            <span className="text-gray-400 dark:text-gray-500">Advertisement</span>
          </div>
          {/* Second column: col-span-6 on md+ */}
          <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center justify-center min-h-[120px]">
            <span className="text-gray-400 dark:text-gray-500">Advertisement</span>
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
                                    dangerouslySetInnerHTML={{ __html: props.article }}
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

export default MarginCalculator;

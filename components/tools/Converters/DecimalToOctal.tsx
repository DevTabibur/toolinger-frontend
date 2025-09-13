"use client"

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

// Validation helpers
function isValidDecimal(str: string) {
  return /^-?\d+$/.test(str.trim());
}

const sampleData = "10";

function convertDecimal(decimalStr: string) {
  let trimmed = decimalStr.trim();
  if (!isValidDecimal(trimmed)) {
    return {
      octal: "",
      hex: "",
      calculation: "",
      error: "Enter a valid integer.",
    };
  }
  let value = parseInt(trimmed, 10);
  if (isNaN(value)) {
    return {
      octal: "",
      hex: "",
      calculation: "",
      error: "Enter a valid integer.",
    };
  }

  // Decimal to Octal conversion with calculation steps
  let absValue = Math.abs(value);
  let steps: string[] = [];
  let octalDigits: number[] = [];
  let n = absValue;
  let i = 0;
  if (n === 0) {
    steps.push("0 ÷ 8 = 0, remainder 0");
    octalDigits.push(0);
  } else {
    while (n > 0) {
      let remainder = n % 8;
      steps.push(`${n} ÷ 8 = ${Math.floor(n / 8)}, remainder ${remainder}`);
      octalDigits.unshift(remainder);
      n = Math.floor(n / 8);
      i++;
    }
  }
  let octalStr = octalDigits.join("");
  if (value < 0) octalStr = "-" + octalStr;

  // Calculation explanation (with brackets, as in the image)
  let calculationParts: string[] = [];
  for (let j = 0; j < octalDigits.length; j++) {
    let power = octalDigits.length - 1 - j;
    calculationParts.push(`(${octalDigits[j]} × 8^${power})`);
  }
  let total = octalDigits.reduce(
    (acc, digit, idx) =>
      acc + digit * Math.pow(8, octalDigits.length - 1 - idx),
    0
  );
  if (value < 0) total = -total;

  // Show the original decimal and the full calculation, e.g. 20 = (2 × 8^1) + (0 × 8^0) = 16
  let calculationString = `${value} = ${calculationParts.join(" + ")} = ${total}`;

  return {
    octal: octalStr,
    hex: value.toString(16).toUpperCase(),
    calculation: calculationString,
    error: "",
  };
}

const DecimalToOctal= (props: { article?: any, seo?: any }) => {
  const [decimalInput, setDecimalInput] = useState("");
  const [octalResult, setOctalResult] = useState("");
  const [hexResult, setHexResult] = useState("");
  const [calculation, setCalculation] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    const { octal, hex, calculation, error } = convertDecimal(decimalInput);
    setOctalResult(octal);
    setHexResult(hex);
    setCalculation(calculation);
    setError(error);
  };

  const handleSample = () => {
    setDecimalInput(sampleData);
    setOctalResult("");
    setHexResult("");
    setCalculation("");
    setError("");
  };

  const handleReset = () => {
    setDecimalInput("");
    setOctalResult("");
    setHexResult("");
    setCalculation("");
    setError("");
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
            href="/category/converters"
            className="text-muted-foreground hover:text-primary"
          >
            Converter Tools
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground font-medium">Decimal to Octal</span>
        </nav>
      </div>

      <div className="container mx-auto p-4">
        <div>
          <h1 className="text-2xl font-semibold text-center mb-6 dark:text-white">
            Decimal to Octal Converter
          </h1>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Input area */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={handleSample}
                >
                  Load sample data
                </button>
                <button
                  type="button"
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
              <textarea
                rows={4}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter decimal number (e.g. 10)"
                value={decimalInput}
                onChange={(e) => setDecimalInput(e.target.value)}
                spellCheck={false}
                autoComplete="off"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
                  onClick={handleConvert}
                >
                  Convert
                </button>
              </div>
              {error && (
                <div className="mt-2 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}
            </div>
            {/* Output area */}
            <div className="flex-1">
              <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 min-h-[120px]">
                <h2 className="text-lg font-semibold mb-2 dark:text-white">Result</h2>
                <div className="mb-2">
                  <span className="font-medium">Octal:</span>{" "}
                  <span className="text-primary">{octalResult || "--"}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium">Hexadecimal:</span>{" "}
                  <span className="text-primary">{hexResult || "--"}</span>
                </div>
                <div>
                  <span className="font-medium">Calculation:</span>
                  <div className="mt-1 text-sm text-gray-700 dark:text-gray-300 break-words whitespace-pre-line">
                    {calculation ? calculation : "--"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Advertisements or additional content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 mt-8">
          <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
            Advertisement
          </div>
          <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
            Advertisement
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

export default DecimalToOctal;

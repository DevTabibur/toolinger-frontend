
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

// Supported calendars
const CALENDARS = [
  { key: "gregorian", label: "English (Gregorian)" },
  { key: "bengali", label: "Bangla (Bengali)" },
  { key: "arabic", label: "Arabic (Hijri)" },
  { key: "roman", label: "Roman Numerals" },
  { key: "hindi", label: "Hindi (Devanagari)" },
];

// Bengali months
const BENGALI_MONTHS = [
  { name: "Boishakh", start: { month: 3, day: 14 } },
  { name: "Joishtho", start: { month: 4, day: 15 } },
  { name: "Ashar", start: { month: 5, day: 15 } },
  { name: "Srabon", start: { month: 6, day: 16 } },
  { name: "Bhadro", start: { month: 7, day: 17 } },
  { name: "Ashwin", start: { month: 8, day: 17 } },
  { name: "Kartik", start: { month: 9, day: 18 } },
  { name: "Ogrohayon", start: { month: 10, day: 18 } },
  { name: "Poush", start: { month: 11, day: 17 } },
  { name: "Magh", start: { month: 0, day: 15 } },
  { name: "Falgun", start: { month: 1, day: 13 } },
  { name: "Chaitra", start: { month: 2, day: 15 } },
];

// Helper: Convert Gregorian date to Bengali date (Bangla calendar)
function gregorianToBengali(date: Date) {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth();
  const gDay = date.getDate();

  let byear = gYear - 593;
  if (gMonth < 3 || (gMonth === 3 && gDay < 14)) {
    byear -= 1;
  }

  let bmonth = 0;
  let bday = 0;
  for (let i = 0; i < BENGALI_MONTHS.length; i++) {
    const { month, day } = BENGALI_MONTHS[i].start;
    let startYear = gYear;
    if (i >= 9 && gMonth < 3) startYear = gYear - 1;
    const startDate = new Date(startYear, month, day);
    const nextMonth = (i + 1) % 12;
    let nextStartYear = startYear;
    if (nextMonth === 0 && gMonth >= 3) nextStartYear = gYear + 1;
    if (nextMonth === 0 && gMonth < 3) nextStartYear = gYear;
    const nextStartDate = new Date(
      nextStartYear,
      BENGALI_MONTHS[nextMonth].start.month,
      BENGALI_MONTHS[nextMonth].start.day
    );

    if (date >= startDate && date < nextStartDate) {
      bmonth = i;
      bday =
        Math.floor(
          (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;
      break;
    }
  }
  if (bday === 0) {
    bmonth = 11;
    const { month, day } = BENGALI_MONTHS[11].start;
    let startYear = gYear;
    if (gMonth < 3) startYear = gYear - 1;
    const startDate = new Date(startYear, month, day);
    bday =
      Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) +
      1;
  }

  // Bengali numerals for day and year
  const digits = "০১২৩৪৫৬৭৮৯";
  const toBangla = (n: number) =>
    n
      .toString()
      .split("")
      .map((d) => digits[parseInt(d)] ?? d)
      .join("");

  return `${toBangla(bday)} ${BENGALI_MONTHS[bmonth].name}, ${toBangla(byear)}`;
}

// Hijri (Islamic) date conversion
function gregorianToHijri(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let m = month;
  let y = year;

  if (m < 3) {
    y -= 1;
    m += 12;
  }

  let a = Math.floor(y / 100);
  let b = 2 - a + Math.floor(a / 4);

  let jd =
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    b -
    1524.5;

  let islamicEpoch = 1948439.5;
  let days = Math.floor(jd) - Math.floor(islamicEpoch);

  let hYear = Math.floor((30 * days + 10646) / 10631);
  let hMonth = Math.min(
    12,
    Math.ceil((days - 29 - hijriToJD(hYear, 1, 1) + 1) / 29.5) + 1
  );
  let hDay = Math.floor(jd) - hijriToJD(hYear, hMonth, 1) + 1;

  const months = [
    "Muharram",
    "Safar",
    "Rabiʿ I",
    "Rabiʿ II",
    "Jumada I",
    "Jumada II",
    "Rajab",
    "Shaʿban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qiʿdah",
    "Dhu al-Ḥijjah",
  ];

  const digits = "٠١٢٣٤٥٦٧٨٩";
  const toArabic = (n: number) =>
    n
      .toString()
      .split("")
      .map((d) => digits[parseInt(d)] ?? d)
      .join("");

  return `${toArabic(hDay)} ${months[hMonth - 1]}, ${toArabic(hYear)} AH`;

  function hijriToJD(year: number, month: number, day: number) {
    return (
      day +
      Math.ceil(29.5 * (month - 1)) +
      (year - 1) * 354 +
      Math.floor((3 + 11 * year) / 30) +
      islamicEpoch -
      1
    );
  }
}

// Roman numerals
function toRoman(num: number): string {
  if (num <= 0) return "";
  const roman: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let result = "";
  for (const [n, r] of roman) {
    while (num >= n) {
      result += r;
      num -= n;
    }
  }
  return result;
}
function gregorianToRoman(date: Date): string {
  return `${toRoman(date.getDate())} ${toRoman(
    date.getMonth() + 1
  )} ${toRoman(date.getFullYear())}`;
}

// Hindi (Devanagari)
function toDevanagari(num: number): string {
  const digits = "०१२३४५६७८९";
  return num
    .toString()
    .split("")
    .map((d) => digits[parseInt(d)] ?? d)
    .join("");
}
function gregorianToHindi(date: Date): string {
  const months = [
    "जनवरी",
    "फ़रवरी",
    "मार्च",
    "अप्रैल",
    "मई",
    "जून",
    "जुलाई",
    "अगस्त",
    "सितंबर",
    "अक्टूबर",
    "नवंबर",
    "दिसंबर",
  ];
  return `${toDevanagari(date.getDate())} ${
    months[date.getMonth()]
  }, ${toDevanagari(date.getFullYear())}`;
}

// English (default)
function gregorianToEnglish(date: Date): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

// Main conversion function
function convertDate(date: Date, calendar: string): string {
  switch (calendar) {
    case "bengali":
      return gregorianToBengali(date);
    case "arabic":
      return gregorianToHijri(date);
    case "roman":
      return gregorianToRoman(date);
    case "hindi":
      return gregorianToHindi(date);
    case "gregorian":
    default:
      return gregorianToEnglish(date);
  }
}

const buttonClass =
  "w-full px-4 py-2 mb-2 rounded font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary-400 bg-emerald-500 hover:bg-emerald-600 text-white";

export default function MultiDateConverter() {
  const [inputDate, setInputDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });
  const [inputTime, setInputTime] = useState<string>(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  });
  const [fromCalendar, setFromCalendar] = useState<string>("gregorian");
  const [toCalendar, setToCalendar] = useState<string>("bengali");
  const [output, setOutput] = useState<string>("");

  // Convert on button click
  const handleConvert = () => {
    let [year, month, day] = inputDate.split("-").map(Number);
    let [hour, minute] = inputTime.split(":").map(Number);
    if (!year || !month || !day) {
      setOutput("Invalid date");
      return;
    }
    const date = new Date(year, month - 1, day, hour || 0, minute || 0);

    let result = convertDate(date, toCalendar);

    // Add time in 24h and 12h format
    let time24 = `${inputTime}`;
    let h = hour || 0,
      m = minute || 0;
    let ampm = h >= 12 ? "PM" : "AM";
    let h12 = h % 12 || 12;
    let time12 = `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;

    if (toCalendar === "roman") {
      time24 = `${toRoman(h)}:${toRoman(m)}`;
      time12 = `${toRoman(h12)}:${toRoman(m)} ${ampm}`;
    }
    if (toCalendar === "hindi") {
      time24 = `${toDevanagari(h)}:${toDevanagari(m)}`;
      time12 = `${toDevanagari(h12)}:${toDevanagari(m)} ${ampm}`;
    }
    if (toCalendar === "bengali") {
      const digits = "০১২৩৪৫৬৭৮৯";
      const toBangla = (n: number) =>
        n
          .toString()
          .split("")
          .map((d) => digits[parseInt(d)] ?? d)
          .join("");
      time24 = `${toBangla(h)}:${toBangla(m)}`;
      time12 = `${toBangla(h12)}:${toBangla(m)} ${ampm}`;
    }
    if (toCalendar === "arabic") {
      const digits = "٠١٢٣٤٥٦٧٨٩";
      const toArabic = (n: number) =>
        n
          .toString()
          .split("")
          .map((d) => digits[parseInt(d)] ?? d)
          .join("");
      time24 = `${toArabic(h)}:${toArabic(m)}`;
      time12 = `${toArabic(h12)}:${toArabic(m)} ${ampm}`;
    }

    setOutput(`${result}\nTime: ${time24} (24h)\n      ${time12} (12h)`);
  };

  // Load sample: 2024-04-14 10:30 (Bengali new year)
  const handleLoadSample = () => {
    setInputDate("2024-04-14");
    setInputTime("10:30");
    setFromCalendar("gregorian");
    setToCalendar("bengali");
    setOutput("");
  };

  // Clear all
  const handleClear = () => {
    const today = new Date();
    setInputDate(today.toISOString().slice(0, 10));
    setInputTime(today.toTimeString().slice(0, 5));
    setFromCalendar("gregorian");
    setToCalendar("bengali");
    setOutput("");
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
            Converters Tools
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground font-medium">
            Multi Date Calendar
          </span>
        </nav>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* Main column */}
          <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
            <div>
              <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
              Multi Date Calendar
              </h1>
              <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
                Convert date and time between{" "}
                <b>English (Gregorian)</b>, <b>Bangla (Bengali)</b>,{" "}
                <b>Arabic (Hijri)</b>, <b>Roman Numerals</b>, and{" "}
                <b>Hindi (Devanagari)</b> calendars.
              </p>
              <div className="flex flex-col md:flex-row gap-4 items-start">
                {/* Left Side: Input */}
                <div className="flex-1 w-full">
                  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                    Input Date & Time
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="date"
                      className="w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 dark:bg-gray-900 dark:text-gray-100"
                      value={inputDate}
                      onChange={(e) => setInputDate(e.target.value)}
                    />
                    <input
                      type="time"
                      className="w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 dark:bg-gray-900 dark:text-gray-100"
                      value={inputTime}
                      onChange={(e) => setInputTime(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 mb-2">
                    <div className="flex-1">
                      <label className="block text-xs mb-1 text-gray-600 dark:text-gray-300">
                        From
                      </label>
                      <select
                        className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-900 dark:text-gray-100"
                        value={fromCalendar}
                        onChange={(e) => setFromCalendar(e.target.value)}
                        disabled
                      >
                        {CALENDARS.map((cal) => (
                          <option key={cal.key} value={cal.key}>
                            {cal.label}
                          </option>
                        ))}
                      </select>
                      <span className="text-xs text-gray-400">
                        (Only Gregorian supported as input for now)
                      </span>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs mb-1 text-gray-600 dark:text-gray-300">
                        To
                      </label>
                      <select
                        className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-900 dark:text-gray-100"
                        value={toCalendar}
                        onChange={(e) => setToCalendar(e.target.value)}
                      >
                        {CALENDARS.map((cal) => (
                          <option key={cal.key} value={cal.key}>
                            {cal.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <button className={buttonClass} onClick={handleConvert}>
                      Convert
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <button
                      className="w-full px-4 py-2 mb-2 rounded font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100"
                      onClick={handleLoadSample}
                    >
                      Load Sample
                    </button>
                    <button
                      className="w-full px-4 py-2 mb-2 rounded font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary-400 bg-red-500 hover:bg-red-600 text-white"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                  </div>
                </div>
                {/* Right Side: Output */}
                <div className="flex-1 w-full">
                  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                    Output
                  </label>
                  <textarea
                    className="w-full h-40 p-3 border rounded bg-gray-100 dark:bg-gray-950 dark:text-gray-100 resize-none"
                    value={output}
                    readOnly
                    placeholder="Converted date and time will appear here..."
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Second column: col-span-5 on md+ */}
          <div className="md:col-span-5 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
            <div className="text-center text-gray-500 dark:text-gray-300">
              <h2 className="text-lg font-semibold mb-2">
                About Multi Date Converter
              </h2>
              <p>
                This tool allows you to convert dates and times between different
                calendar systems, including Bengali, Arabic (Hijri), Roman
                numerals, Hindi, and English (Gregorian).
              </p>
              <div className="mt-4">
                <b>Use Cases:</b>
                <ul className="list-disc list-inside text-left mt-2">
                  <li>Find Bengali or Hijri date for a given English date</li>
                  <li>Display dates in Roman numerals for fun</li>
                  <li>Convert to Hindi/Devanagari numerals</li>
                  <li>Educational and cultural purposes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
            Advertisement
          </div>
          <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
            Advertisement
          </div>
        </div>
      </div>
    </>
  );
}
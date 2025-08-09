import axios from "axios";
const URL = `https://toolsbackend.toolinger.com`;
//====================================MORE TOOLS====================================

// More Tools API functions

// Roman Numerals Date Converter
export async function convertRomanNumeralsDate(data: any) {
  try {
    const response = await axios.post(
      `${URL}/more-tools/roman-numerals-date-converter`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in convertRomanNumeralsDate:", error);
    throw error;
  }
}

// Binary Translator
export async function translateBinary(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/binary-translator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in translateBinary:", error);
    throw error;
  }
}

// Random Address Generator
export async function generateRandomAddress(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/random-address-generator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in generateRandomAddress:", error);
    throw error;
  }
}

// Discount Calculator
export async function calculateDiscount(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/discount-calculator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateDiscount:", error);
    throw error;
  }
}

// Binary to Hex
export async function convertBinaryToHex(data: any) {
  try {
    const response = await axios.post("`${URL}`more-tools/binary-to-hex", data);
    return response.data;
  } catch (error) {
    console.error("Error in convertBinaryToHex:", error);
    throw error;
  }
}

// Decimal to Octal
export async function convertDecimalToOctal(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/decimal-to-octal",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in convertDecimalToOctal:", error);
    throw error;
  }
}

// Octal to Decimal
export async function convertOctalToDecimal(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/octal-to-decimal",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in convertOctalToDecimal:", error);
    throw error;
  }
}

// Hex to RGB
export async function convertHEXToRGB(data: any) {
  try {
    const response = await axios.post("`${URL}`more-tools/hex-to-rgb", data);
    return response.data;
  } catch (error) {
    console.error("Error in convertHEXToRGB:", error);
    throw error;
  }
}

// Octal Calculator
export async function calculateOctal(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/octal-calculator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateOctal:", error);
    throw error;
  }
}

// Decimal to ASCII
export async function convertDecimalToASCII(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/decimal-to-ascii",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in convertDecimalToASCII:", error);
    throw error;
  }
}

// Text to HEX
export async function convertTextToHEX(data: any) {
  try {
    const response = await axios.post("`${URL}`more-tools/text-to-hex", data);
    return response.data;
  } catch (error) {
    console.error("Error in convertTextToHEX:", error);
    throw error;
  }
}

// Adsense Calculator
export async function calculateAdsense(data: any) {
  try {
    const response = await axios.post(
      `${URL}/more-tools/adsense-calculator`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateAdsense:", error);
    // throw error;
  }
}

// Paypal Fee Calculator
export async function calculatePaypalFee(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/paypal-fee-calculator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculatePaypalFee:", error);
    // throw error;
  }
}

// Upside Down Text Generator
export async function generateUpsideDownText(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/upside-down-text-generator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in generateUpsideDownText:", error);
    throw error;
  }
}

// Password Generator
export async function generatePassword(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/password-generator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in generatePassword:", error);
    throw error;
  }
}

// Reverse Text Generator
export async function generateReverseText(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/reverse-text-generator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in generateReverseText:", error);
    throw error;
  }
}

// Roman Numeral Converter
export async function convertRomanNumeral(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/roman-numeral-converter",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in convertRomanNumeral:", error);
    throw error;
  }
}

// LTV Calculator
export async function calculateLTV(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/ltv-calculator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateLTV:", error);
    throw error;
  }
}

// CPM Calculator
export async function calculateCPM(data: any) {
  try {
    const response = await axios.post(
      `${URL}/more-tools/cpm-calculator`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateCPM:", error);
    // throw error;
  }
}

// Text to HEX 2
export async function convertTextToHEX2(data: any) {
  try {
    const response = await axios.post("`${URL}`more-tools/text-to-hex-2", data);
    return response.data;
  } catch (error) {
    console.error("Error in convertTextToHEX2:", error);
    throw error;
  }
}

// Random Word Generator
export async function generateRandomWord(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/random-word-generator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in generateRandomWord:", error);
    throw error;
  }
}

// EPS Calculator
export async function calculateEPS(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/eps-calculator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateEPS:", error);
    throw error;
  }
}

// Sales Tax Calculator
export async function calculateSalesTax(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/sales-tax-calculator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateSalesTax:", error);
    throw error;
  }
}

// Average Calculator
export async function calculateAverage(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/average-calculator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateAverage:", error);
    throw error;
  }
}

// Probability Calculator
export async function calculateProbability(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/probability-calculator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateProbability:", error);
    throw error;
  }
}

// GST Calculator
export async function calculateGST(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/gst-calculator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateGST:", error);
    throw error;
  }
}

// Age Calculator
export async function calculateAge(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/age-calculator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateAge:", error);
    throw error;
  }
}

// Margin Calculator
export async function calculateMargin(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/margin-calculator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateMargin:", error);
    throw error;
  }
}

// Bounds Calculator
export async function calculateBounds(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/bounds-calculator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateBounds:", error);
    throw error;
  }
}

// Valuation Calculator
export async function calculateValuation(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`more-tools/valuation-calculator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateValuation:", error);
    throw error;
  }
}

//=================================TOOLS========================================

// Domain Age Checker
export async function checkDomainAge(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/domain-age-checker", data);
    return response.data;
  } catch (error) {
    console.error("Error in checkDomainAge:", error);
    throw error;
  }
}

// Whois Checker
export async function checkWhois(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/whois-check", data);
    return response.data;
  } catch (error) {
    console.error("Error in checkWhois:", error);
    throw error;
  }
}

// Broken Link Checker
export async function checkBrokenLink(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/broken-link-check", data);
    return response.data;
  } catch (error) {
    console.error("Error in checkBrokenLink:", error);
    throw error;
  }
}

// Plagiarism Checker
export async function checkPlagiarism(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/plagiarism-check", data);
    return response.data;
  } catch (error) {
    console.error("Error in checkPlagiarism:", error);
    throw error;
  }
}

// Backlink Maker
export async function backlinkMaker(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/backlink-check", data);
    return response.data;
  } catch (error) {
    console.error("Error in backlinkMaker:", error);
    throw error;
  }
}

// Online Ping Tool
export async function pingSubmit(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/online-ping-check", data);
    return response.data;
  } catch (error) {
    console.error("Error in pingSubmit:", error);
    throw error;
  }
}

// Link Analyzer (External/Internal)
export async function linkAnalyzer(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/link-analyzer", data);
    return response.data;
  } catch (error) {
    console.error("Error in linkAnalyzer:", error);
    throw error;
  }
}

// Keyword Density Checker
export async function keywordDensity(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/keyword-density", data);
    return response.data;
  } catch (error) {
    console.error("Error in keywordDensity:", error);
    throw error;
  }
}

// Google Malware Checker
export async function googleMalwareChecker(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`tools/google-malware-checker",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in googleMalwareChecker:", error);
    throw error;
  }
}

// Domain Info IP
export async function domainToIP(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/domain-info-ip", data);
    return response.data;
  } catch (error) {
    console.error("Error in domainToIP:", error);
    throw error;
  }
}

// Server Status Checker
export async function serverStatusChecker(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/server-status", data);
    return response.data;
  } catch (error) {
    console.error("Error in serverStatusChecker:", error);
    throw error;
  }
}

// Page Size Checker
export async function pageSizeChecker(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/page-size-checker", data);
    return response.data;
  } catch (error) {
    console.error("Error in pageSizeChecker:", error);
    throw error;
  }
}

// Blacklist Lookup
export async function blacklistLookup(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/blacklist-lookup", data);
    return response.data;
  } catch (error) {
    console.error("Error in blacklistLookup:", error);
    throw error;
  }
}

// Suspicious Domain Checker
export async function checkSuspiciousDomains(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`tools/suspicious-domain-checker",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in checkSuspiciousDomains:", error);
    throw error;
  }
}

// Code to Text Ratio Checker
export async function codeToTextRatioChecker(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/code-to-text-ratio", data);
    return response.data;
  } catch (error) {
    console.error("Error in codeToTextRatioChecker:", error);
    throw error;
  }
}

// Website Links Count Checker
export async function linkCountChecker(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`tools/website-link-count-checker",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in linkCountChecker:", error);
    throw error;
  }
}

// Email Privacy Checker
export async function emailPrivacyChecker(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`tools/email-privacy-checker",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in emailPrivacyChecker:", error);
    throw error;
  }
}

// Meta Tags Analyzer
export async function metaTagAnalyze(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/meta-tag-analyzer", data);
    return response.data;
  } catch (error) {
    console.error("Error in metaTagAnalyze:", error);
    throw error;
  }
}

// Search Engine Spider Simulator
export async function searchEngineSpiderSimulator(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`tools/search-engine-spider-simulator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in searchEngineSpiderSimulator:", error);
    throw error;
  }
}

// Google Cache Checker
export async function googleCacheChecker(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`tools/google-cache-checker",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in googleCacheChecker:", error);
    throw error;
  }
}

// What is my browser
export async function whatIsMyBrowser() {
  try {
    const response = await axios.get("`${URL}`tools/browser-details");
    return response.data;
  } catch (error) {
    console.error("Error in whatIsMyBrowser:", error);
    throw error;
  }
}

// Find DNS records
export async function findDNSRecords(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/find-dns-record", data);
    return response.data;
  } catch (error) {
    console.error("Error in findDNSRecords:", error);
    throw error;
  }
}

// Online MD5 Generate
export async function generateMd5Hash(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/hash-md5", data);
    return response.data;
  } catch (error) {
    console.error("Error in generateMd5Hash:", error);
    throw error;
  }
}

// Class C IP checker
export async function classCChecker(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/class-c-ip-checker", data);
    return response.data;
  } catch (error) {
    console.error("Error in classCChecker:", error);
    throw error;
  }
}

// Google index Checker
export async function checkGoogleIndex(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`tools/google-index-checker",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in checkGoogleIndex:", error);
    throw error;
  }
}

// Get Source Code of Webpage
export async function getWebpageSource(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/source-code", data);
    return response.data;
  } catch (error) {
    console.error("Error in getWebpageSource:", error);
    throw error;
  }
}

// URL Rewriting Tool
export async function rewriteUrl(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/rewrite-url", data);
    return response.data;
  } catch (error) {
    console.error("Error in rewriteUrl:", error);
    throw error;
  }
}

// Robots.txt Generator
export async function generateRobotsTxt(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/generate-robots", data);
    return response.data;
  } catch (error) {
    console.error("Error in generateRobotsTxt:", error);
    throw error;
  }
}

// XML Sitemap Generator
export async function generateSitemap(data: any) {
  try {
    const response = await axios.post("`${URL}`tools/generate-sitemap", data);
    return response.data;
  } catch (error) {
    console.error("Error in generateSitemap:", error);
    throw error;
  }
}

//==================================ADVANCED TOOLS==========================================

// Grammar Checker API
export async function checkGrammar(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`advanced-tools/grammar-checker",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in checkGrammar:", error);
    throw error;
  }
}

// Calculator API
export async function calculateAdvanced(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`advanced-tools/calculator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateAdvanced:", error);
    throw error;
  }
}

// Timer API
export async function startTimer(data: any) {
  try {
    const response = await axios.post("`${URL}`advanced-tools/timer", data);
    return response.data;
  } catch (error) {
    console.error("Error in startTimer:", error);
    throw error;
  }
}

// Calendar API
export async function getCalendar(data: any) {
  try {
    const response = await axios.post("`${URL}`advanced-tools/calendar", data);
    return response.data;
  } catch (error) {
    console.error("Error in getCalendar:", error);
    throw error;
  }
}

// Dictionary API
export async function lookupWord(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`advanced-tools/dictionary",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in lookupWord:", error);
    throw error;
  }
}

// Interest Calculator API
export async function calculateInterest(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`advanced-tools/interest-calculator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in calculateInterest:", error);
    throw error;
  }
}

// Currency Converter API
export async function convertCurrency(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`advanced-tools/currency-converter",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in convertCurrency:", error);
    throw error;
  }
}

// Website Backup API
export async function backupWebsite(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`advanced-tools/website-backup",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in backupWebsite:", error);
    throw error;
  }
}

// Website Migrator API
export async function migrateWebsite(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`advanced-tools/website-migrator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in migrateWebsite:", error);
    throw error;
  }
}

// Social Media Schedule API
export async function scheduleSocialMedia(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`advanced-tools/social-media-schedule",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in scheduleSocialMedia:", error);
    throw error;
  }
}

// Email Template Generator API
export async function generateEmailTemplate(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`advanced-tools/email-template-generator",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in generateEmailTemplate:", error);
    throw error;
  }
}

// Detect CMS Tool API
export async function detectCMS(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`advanced-tools/detect-cms",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in detectCMS:", error);
    throw error;
  }
}

// Start Generation Here

//===========================================WEBSITE MANAGEMENT TOOL====================================

//===========================================WEBSITE MANAGEMENT TOOL====================================

// Check DNS Records
export async function checkDNSRecords(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/dns-records",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in checkDNSRecords:", error);
    throw error;
  }
}

// Check DNS Propagation
export async function checkDNSPropagation(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/dns-propagation",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in checkDNSPropagation:", error);
    throw error;
  }
}

// Get IP Location
export async function getIPLocation(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/ip-location",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in getIPLocation:", error);
    throw error;
  }
}

// Encode/Decode HTML
export async function encodeDecodeHTML(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/html-encoder-decoder",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in encodeDecodeHTML:", error);
    throw error;
  }
}

// Minify HTML
export async function minifyHTML(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/minify-html",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in minifyHTML:", error);
    throw error;
  }
}

// JS Beautifier
export async function beautifyJS(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/js-beautifier",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in beautifyJS:", error);
    throw error;
  }
}

// PHP Beautifier
export async function beautifyPHP(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/php-beautifier",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in beautifyPHP:", error);
    throw error;
  }
}

// RGB to HEX Converter
export async function convertRGBToHEX(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/rgb-to-hex",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in convertRGBToHEX:", error);
    throw error;
  }
}

// Server Port Scanner
export async function scanServerPorts(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/server-port-scanner",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in scanServerPorts:", error);
    throw error;
  }
}

// Server Status Checker
export async function checkServerStatus(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/server-status",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in checkServerStatus:", error);
    throw error;
  }
}

// Website Page Snooper (HTML Viewer)
export async function snoopWebsitePage(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/website-page-snooper",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in snoopWebsitePage:", error);
    throw error;
  }
}

// Domain IP Lookup
export async function lookupDomainIP(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/domain-ip-lookup",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in lookupDomainIP:", error);
    throw error;
  }
}

// Minify CSS
export async function minifyCSS(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/minify-css",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in minifyCSS:", error);
    throw error;
  }
}

// Minify JSON
export async function minifyJSON(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/minify-json",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in minifyJSON:", error);
    throw error;
  }
}

// HTML Beautifier
export async function beautifyHTML(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/html-beautifier",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in beautifyHTML:", error);
    throw error;
  }
}

// XML Beautifier
export async function beautifyXML(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/xml-beautifier",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in beautifyXML:", error);
    throw error;
  }
}

// Check Class C IP
export async function checkClassCIP(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/class-c-ip",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in checkClassCIP:", error);
    throw error;
  }
}

// Ping Different Locations
export async function pingDifferentLocations(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/different-locations-ping",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in pingDifferentLocations:", error);
    throw error;
  }
}

// Google Index Tool
export async function googleIndexTool(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/google-index-tool",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in googleIndexTool:", error);
    throw error;
  }
}

// URL Encoder/Decoder
export async function encodeDecodeURL(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/url-encoder-decoder",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in encodeDecodeURL:", error);
    throw error;
  }
}

// Minify JS
export async function minifyJS(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/minify-js",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in minifyJS:", error);
    throw error;
  }
}

// CSS Beautifier
export async function beautifyCSS(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/css-beautifier",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in beautifyCSS:", error);
    throw error;
  }
}

// JSON Beautifier
export async function beautifyJSON(data: any) {
  try {
    const response = await axios.post(
      "`${URL}`website-management/json-beautifier",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in beautifyJSON:", error);
    throw error;
  }
}

export async function getAllTools() {
  try {
    const response = await axios.get("`${URL}`tools");
    return response.data;
  } catch (error) {
    console.error("Error fetching tools:", error);
    throw error;
  }
}

export async function createTool(toolData: any) {
  try {
    const response = await axios.post("`${URL}`tools", toolData);
    return response.data;
  } catch (error) {
    console.error("Error creating tool:", error);
    throw error;
  }
}

export async function updateTool(toolId: string, toolData: any) {
  try {
    const response = await axios.put(`${URL}/tools/${toolId}`, toolData);
    return response.data;
  } catch (error) {
    console.error("Error updating tool:", error);
    throw error;
  }
}

export async function deleteTool(toolId: string) {
  try {
    const response = await axios.delete(`${URL}/tools/${toolId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting tool:", error);
    throw error;
  }
}

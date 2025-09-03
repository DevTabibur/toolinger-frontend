import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

// calculator tools
import {
  AdsenseCalculator,
  AgeCalculator,
  AverageCalculator,
  BinaryCalculator,
  CPMCalculator,
  DiscountCalculator,
  EarningPerShareCalculator,
  GSTCalculator,
  HexCalculator,
  LinkPriceCalculator,
  LowerAndUpperBoundCalculator,
  LTVCalculator,
  MarginCalculator,
  OctalCalculator,
  PaypalFeeCalculator,
  PreAndPostMoney,
  ProbabilityCalculator,
  SalesTaxCalculator,
  ToolNotFound
} from "@/components/tools/Calculators";



// text tools
import {
  ASCIIToTextConverter,
  CodeToTextRatio,
  InvisibleCharacter,
  KeywordsByTotalWordRatio,
  TextEditor,
  TextRepeater,
  TextToPDF,
  TextToWord,
  WordCombiner,
  WordCounter,
  WordsToPages
} from "@/components/tools/text";


// developer tools
import {
  DNSRecordsChecker,
  HtmlEncodeDecode,
  MinifyTools,
  ServerStatus,
  SourceCodeOfWebpage,
  URLEncodeDecode
} from "@/components/tools/developer";

// Generators tools
import {
  PasswordGenerator,
  ReverseTextGenerator,
  UpsideDownTextGenerator
} from "@/components/tools/Generators";

// Image tools
import {
  CropImageOnline,
  PdfToWord,
  TextToHandWriting,
  TextToImage
} from "@/components/tools/Image";

// website management tools
import {
  DetectCMS,
  GoogleMalwareChecker,
  WebsiteLinkCountChecker
} from "@/components/tools/WebsiteManagement";

// Converters tools
import {
  AsciiToDecimal,
  AsciiToHEX,
  CaseConverter,
  DecimalToAscii,
  DecimalToOctal,
  HexToAscii,
  HEXTORGB,
  HexToText,
  MultiDateConverter,
  OctalToDecimal,
  RGBTOHEX,
  RomanNumeralsDate,
  TextToHex
} from "@/components/tools/Converters";
import { Metadata } from "next";
import { getPageArticleSeoBySlug } from "@/lib/pageMgmt.server";


//============================================










// চাইলে পেজ-লেভেল ISR সেট করতে পারো
export const revalidate = 300;

// ----------------- SEO (generateMetadata) -----------------
export async function generateMetadata(
  { params }: { params: { slug: string; tool: string } }
): Promise<any> {
  const data = await getPageArticleSeoBySlug(params.tool);
  // console.log("data", data)
  // const article = data?.data?.PageArticle 
  // const seo = data?.data?.PageSEO

  // console.log("article", article)
  // console.log("seo", seo)
  // if (data?.statusCode === 200) {
  //   const seo = data?.data?.PageSEO;
  //   return {
  //     title: seo.metaTitle ?? fallbackTitle,
  //     description: seo.metaDescription,
  //     keywords: seo.keywords,
  //     alternates: { canonical: seo.canonicalUrl || `https://yourdomain.com/category/${params.slug}/${params.tool}` },
  //     robots: seo.noindex ? { index: false, follow: false } : undefined,
  //   };
  // } else {
  //   return {
  //     title: fallbackTitle,
  //     description: "Free online tool.",
  //     alternates: { canonical: `https://yourdomain.com/category/${params.slug}/${params.tool}` },
  //   };
  // }

  // fallback
  const fallbackTitle = params.tool.replace(/-/g, " ");

  // if (!seo) {
  //   return {
  //     title: fallbackTitle,
  //     description: "Free online tool.",
  //     alternates: { canonical: `https://yourdomain.com/category/${params.slug}/${params.tool}` },
  //   };
  // }

  // return {
  //   title: seo.metaTitle ?? fallbackTitle,
  //   description: seo.metaDescription,
  //   keywords: seo.keywords,
  //   alternates: { canonical: seo.canonicalUrl || `https://yourdomain.com/category/${params.slug}/${params.tool}` },
  //   robots: seo.noindex ? { index: false, follow: false } : undefined,
  //   openGraph: {
  //     title: seo.ogTitle || seo.metaTitle || fallbackTitle,
  //     description: seo.ogDescription || seo.metaDescription,
  //     url: seo.canonicalUrl,
  //     images: seo.ogImageUrl ? [{ url: seo.ogImageUrl }] : undefined,
  //     type: seo.ogType || "website",
  //     siteName: seo.ogSiteName,
  //     locale: seo.ogLocale,
  //   },
  //   twitter: {
  //     card: seo.twitterCard || "summary_large_image",
  //     site: seo.twitterSite,
  //     creator: seo.twitterCreator,
  //     images: seo.twitterImageUrl ? [seo.twitterImageUrl] : (seo.ogImageUrl ? [seo.ogImageUrl] : undefined),
  //   },
  // };
}










//=============================================================================



export default async function  ToolDetailsPage({
  params,
}: {
  params: { slug: string; tool: string };
}) {


  const data = await getPageArticleSeoBySlug(params.tool);
  const articleHtml: string | undefined = data?.data?.PageArticle?.content;
  const seo = data?.data?.PageSEO
  // const schemas: any[] = data?.PageSEO?.schemas || [];


  const renderToolComponent = () => {
    switch (params.tool) {
      // ==========================calculator================
      // case "link-price-calculator":
      //   return <LinkPriceCalculator />;
      // case "binary-translator":
      //   return <BinaryCalculator />;
      case "adsense-calculator":
        return <AdsenseCalculator />;
      case "paypal-fee-calculator":
        return <PaypalFeeCalculator />;
      case "ltv-calculator":
        return <LTVCalculator />;
      case "cpm-calculator":
        return <CPMCalculator />;
      case "discount-calculator":
        return <DiscountCalculator />;
      case "binary-calculator":
        return <BinaryCalculator />;
      case "hex-calculator":
        return <HexCalculator />;
      case "octal-calculator":
        return <OctalCalculator />;
      // case "percentage-calculator":
      //   return <OctalCalculator />;
      case "earnings-per-share":
        return <EarningPerShareCalculator />;
      case "probability-calculator":
        return <ProbabilityCalculator />;
      case "margin-calculator":
        return <MarginCalculator />;
      case "sales-tax-calculator":
        return <SalesTaxCalculator />;
      case "gst-calculator":
        return <GSTCalculator />;
      case "bound-calculator":
        return <LowerAndUpperBoundCalculator />;
      case "average-calculator":
        return <AverageCalculator />;
      case "age-calculator":
        return <AgeCalculator />;
      case "pre-and-post-money-valuation-calculator":
        return <PreAndPostMoney />;
      // ==================================text tools========================
      case "word-counter":
        return <WordCounter />;
      // case "code-to-text-ratio":
      //   return <CodeToTextRatio />;
      // case "invisible-character":
      //   return <InvisibleCharacter />;
      case "text-to-word":
        return <TextToWord />;
      case "text-to-pdf":
        return <TextToPDF />;
      case "text-repeater":
        return <TextRepeater />;
      case "keyword-total-words":
        return <KeywordsByTotalWordRatio />;
      case "word-combiner":
        return <WordCombiner />;
      // case "ascii-to-text":
      //   return <ASCIIToTextConverter />;
      case "text-to-ascii":
        return <ASCIIToTextConverter />;
      // case "online-text-editor":
      //   return <TextEditor />;
      // case "word-pages":
      //   return <WordsToPages />;
      // =========================developer tools==========================
      case "minify-html":
        return <MinifyTools />;
      case "minify-css":
        return <MinifyTools />;
      case "minify-js":
        return <MinifyTools />;
      case "minify-json":
        return <MinifyTools />;
      case "js-beautifier":
        return <MinifyTools />;
      case "css-beautifier":
        return <MinifyTools />;
      case "html-beautifier":
        return <MinifyTools />;
      case "xml-beautifier":
        return <MinifyTools />;
      case "json-beautifier":
        return <MinifyTools />;
      case "php-beautifier":
        return <MinifyTools />;
      case "url-encoder-decoder":
        return <URLEncodeDecode />;
      case "html-encoder-decoder":
        return <HtmlEncodeDecode />;
      case "source-code-retriever":
        return <SourceCodeOfWebpage />;
      case "server-status":
        return <ServerStatus />;
      // case "dns-records":
      //   return <DNSRecordsChecker />;
      // ====================generators tools======================
      case "reverse-text-generator":
        return <ReverseTextGenerator />;
      case "upside-down-text-generator":
        return <UpsideDownTextGenerator />;
      case "password-generator":
        return <PasswordGenerator />;
      // ===============image tools===================
      case "text-to-handwriting":
        return <TextToHandWriting />;
      case "text-to-image":
        return <TextToImage />;
      // case "crop-image-online":
      //   return <CropImageOnline />;

      // case "pdf-to-word":
      //   return <PdfToWord />;
      // =====================website management=================
      case "google-malware-checker":
        return <GoogleMalwareChecker article={articleHtml} seo={seo}/>;
      case "cms-checker":
        return <DetectCMS />;
      case "links-count-checker":
        return <WebsiteLinkCountChecker />;
      // =================converters tools===================
      case "rgb-to-hex":
        return <RGBTOHEX />;
      case "hex-to-rgb":
        return <HEXTORGB />;
      case "decimal-to-octal":
        return <DecimalToOctal />;
      case "octal-to-decimal":
        return <OctalToDecimal />;
      case "roman-numerals-date":
        return <RomanNumeralsDate />;
      case "text-to-binary":
        return <BinaryCalculator />;
      case "decimal-to-binary":
        return <BinaryCalculator />;
      case "binary-to-decimal":
        return <BinaryCalculator />;
      case "decimal-to-hex":
        return <BinaryCalculator />;
      case "hex-to-decimal":
        return <BinaryCalculator />;
      case "binary-to-hex":
        return <BinaryCalculator />;
      case "hex-to-binary":
        return <BinaryCalculator />;
      case "binary-to-octal":
        return <BinaryCalculator />;
      case "hex-to-octal":
        return <BinaryCalculator />;
      case "octal-to-binary":
        return <BinaryCalculator />;
      case "octal-to-hex":
        return <BinaryCalculator />;
      case "case-converter":
        return <CaseConverter />;
      case "ascii-to-hex":
        return <AsciiToHEX />;
      case "ascii-to-decimal":
        return <AsciiToDecimal />;
      case "decimal-to-ascii":
        return <DecimalToAscii />;
      case "hex-to-ascii":
        return <HexToAscii />;
      case "hex-to-text":
        return <HexToText />;
      case "text-to-hex":
        return <TextToHex />;
      // case "multi-date-converter":
      //   return <MultiDateConverter />;
      default:
        return <ToolNotFound />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="py-12">
        {renderToolComponent()}
      </div>
      <Footer />
    </div>

  );
}

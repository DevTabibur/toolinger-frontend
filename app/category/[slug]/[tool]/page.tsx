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



export default function ToolDetailsPage({
  params,
}: {
  params: { slug: string; tool: string };
}) {
  const renderToolComponent = () => {
    switch (params.tool) {
      // calculator
      case "link-price-calculator":
        return <LinkPriceCalculator />;
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
      case "eps-calculator":
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
      // text tools
      case "word-counter":
        return <WordCounter />;
      case "code-to-text-ratio":
        return <CodeToTextRatio />;
      case "invisible-character":
        return <InvisibleCharacter />;
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
      case "ascii-to-text":
        return <ASCIIToTextConverter />;
      case "text-to-ascii":
        return <ASCIIToTextConverter />;
      // case "online-text-editor":
      //   return <TextEditor />;
      case "word-pages":
        return <WordsToPages />;
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

"use client"
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
import GoogleIndexChecker from "../tools/WebsiteManagement/GoogleIndexChecker";

const ToolClient = ({
    tool,
    page
}: any) => {


    const renderToolComponent = () => {
        switch (tool) {
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
            // case "keyword-total-words":
            //     return <KeywordsByTotalWordRatio article={article} seo={seo}/>;
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
            // ===============    ===========================                    image tools===================
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
                return <GoogleMalwareChecker />;
            case "cms-checker":
                return <DetectCMS />;
            case "links-count-checker":
                return <WebsiteLinkCountChecker />;
            case "google-indexer":
                return <GoogleIndexChecker />;
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

    return (<>
        <div>
            {renderToolComponent()}

            <div className="container mx-auto">
                <div className="prose w-full max-w-[700px] text-start">
                    <div
                        dangerouslySetInnerHTML={{ __html: page?.data?.pageContent || "" }}
                    />
                </div>
            </div>
        </div>
    </>)
}


export default ToolClient
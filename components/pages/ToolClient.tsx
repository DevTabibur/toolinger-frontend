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

const ToolClient = ({
    tool,
    article,
    seo,
}: {
    tool: string;
    article?: string;
    seo?: any;
}) => {


    const renderToolComponent = () => {
        switch (tool) {
            // ==========================calculator================
            // case "link-price-calculator":
            //   return <LinkPriceCalculator />;
            // case "binary-translator":
            //   return <BinaryCalculator />;
            case "adsense-calculator":
                return <AdsenseCalculator article={article} seo={seo} />;
            case "paypal-fee-calculator":
                return <PaypalFeeCalculator article={article} seo={seo}/>;
            case "ltv-calculator":
                return <LTVCalculator article={article} seo={seo}/>;
            case "cpm-calculator":
                return <CPMCalculator article={article} seo={seo}/>;
            case "discount-calculator":
                return <DiscountCalculator article={article} seo={seo}/>;
            case "binary-calculator":
                return <BinaryCalculator article={article} seo={seo}/>;
            case "hex-calculator":
                return <HexCalculator article={article} seo={seo}/>;
            case "octal-calculator":
                return <OctalCalculator article={article} seo={seo}/>;
            // case "percentage-calculator":
            //   return <OctalCalculator />;
            case "earnings-per-share":
                return <EarningPerShareCalculator article={article} seo={seo}/>;
            case "probability-calculator":
                return <ProbabilityCalculator article={article} seo={seo}/>;
            case "margin-calculator":
                return <MarginCalculator article={article} seo={seo}/>;
            case "sales-tax-calculator":
                return <SalesTaxCalculator article={article} seo={seo}/>;
            case "gst-calculator":
                return <GSTCalculator article={article} seo={seo}/>;
            case "bound-calculator":
                return <LowerAndUpperBoundCalculator article={article} seo={seo}/>;
            case "average-calculator":
                return <AverageCalculator article={article} seo={seo}/>;
            case "age-calculator":
                return <AgeCalculator article={article} seo={seo}/>;
            case "pre-and-post-money-valuation-calculator":
                return <PreAndPostMoney article={article} seo={seo}/>;
            // ==================================text tools========================
            case "word-counter":
                return <WordCounter article={article} seo={seo}/>;
            // case "code-to-text-ratio":
            //   return <CodeToTextRatio />;
            // case "invisible-character":
            //   return <InvisibleCharacter />;
            case "text-to-word":
                return <TextToWord article={article} seo={seo}/>;
            case "text-to-pdf":
                return <TextToPDF article={article} seo={seo}/>;
            case "text-repeater":
                return <TextRepeater article={article} seo={seo}/>;
            // case "keyword-total-words":
            //     return <KeywordsByTotalWordRatio article={article} seo={seo}/>;
            case "word-combiner":
                return <WordCombiner article={article} seo={seo}/>;
            // case "ascii-to-text":
            //   return <ASCIIToTextConverter />;
            case "text-to-ascii":
                return <ASCIIToTextConverter article={article} seo={seo}/>;
            // case "online-text-editor":
            //   return <TextEditor />;
            // case "word-pages":
            //   return <WordsToPages />;
            // =========================developer tools==========================
            case "minify-html":
                return <MinifyTools article={article} seo={seo}/>;
            case "minify-css":
                return <MinifyTools article={article} seo={seo}/>;
            case "minify-js":
                return <MinifyTools article={article} seo={seo}/>;
            case "minify-json":
                return <MinifyTools article={article} seo={seo}/>;
            case "js-beautifier":
                return <MinifyTools article={article} seo={seo}/>;
            case "css-beautifier":
                return <MinifyTools article={article} seo={seo}/>;
            case "html-beautifier":
                return <MinifyTools article={article} seo={seo}/>;
            case "xml-beautifier":
                return <MinifyTools article={article} seo={seo}/>;
            case "json-beautifier":
                return <MinifyTools article={article} seo={seo}/>;
            case "php-beautifier":
                return <MinifyTools article={article} seo={seo}/>;
            case "url-encoder-decoder":
                return <URLEncodeDecode article={article} seo={seo}/>;
            case "html-encoder-decoder":
                return <HtmlEncodeDecode article={article} seo={seo}/>;
            case "source-code-retriever":
                return <SourceCodeOfWebpage article={article} seo={seo}/>;
            case "server-status":
                return <ServerStatus article={article} seo={seo}/>;
            // case "dns-records":
            //   return <DNSRecordsChecker />;
            // ====================generators tools======================
            case "reverse-text-generator":
                return <ReverseTextGenerator article={article} seo={seo}/>;
            case "upside-down-text-generator":
                return <UpsideDownTextGenerator article={article} seo={seo}/>;
            case "password-generator":
                return <PasswordGenerator article={article} seo={seo}/>;
            // ===============    ===========================                    image tools===================
            case "text-to-handwriting":
                return <TextToHandWriting article={article} seo={seo}/>;
            case "text-to-image":
                return <TextToImage article={article} seo={seo}/>;
            // case "crop-image-online":
            //   return <CropImageOnline />;

            // case "pdf-to-word":
            //   return <PdfToWord />;
            // =====================website management=================
            case "google-malware-checker":
                return <GoogleMalwareChecker article={article} seo={seo} />;
            case "cms-checker":
                return <DetectCMS  article={article} seo={seo}/>;
            case "links-count-checker":
                return <WebsiteLinkCountChecker  article={article} seo={seo}/>;
            // =================converters tools===================
            case "rgb-to-hex":
                return <RGBTOHEX article={article} seo={seo}/>;
            case "hex-to-rgb":
                return <HEXTORGB article={article} seo={seo}/>;
            case "decimal-to-octal":
                return <DecimalToOctal article={article} seo={seo}/>;
            case "octal-to-decimal":
                return <OctalToDecimal article={article} seo={seo}/>;
            case "roman-numerals-date":
                return <RomanNumeralsDate article={article} seo={seo}/>;
            case "text-to-binary":
                return <BinaryCalculator article={article} seo={seo}/>;
            case "decimal-to-binary":
                return <BinaryCalculator article={article} seo={seo}/>;
            case "binary-to-decimal":
                return <BinaryCalculator article={article} seo={seo}/>;
            case "decimal-to-hex":
                return <BinaryCalculator article={article} seo={seo} />;
            case "hex-to-decimal":
                return <BinaryCalculator article={article} seo={seo}/>;
            case "binary-to-hex":
                return <BinaryCalculator article={article} seo={seo}/>;
            case "hex-to-binary":
                return <BinaryCalculator article={article} seo={seo}/>;
            case "binary-to-octal":
                return <BinaryCalculator article={article} seo={seo}/>;
            case "hex-to-octal":
                return <BinaryCalculator article={article} seo={seo}/>;
            case "octal-to-binary":
                return <BinaryCalculator article={article} seo={seo}/>;
            case "octal-to-hex":
                return <BinaryCalculator article={article} seo={seo}/>;
            case "case-converter":
                return <CaseConverter article={article} seo={seo}/>;
            case "ascii-to-hex":
                return <AsciiToHEX article={article} seo={seo}/>;
            case "ascii-to-decimal":
                return <AsciiToDecimal article={article} seo={seo}/>;
            case "decimal-to-ascii":
                return <DecimalToAscii article={article} seo={seo}/>;
            case "hex-to-ascii":
                return <HexToAscii article={article} seo={seo}/>;
            case "hex-to-text":
                return <HexToText article={article} seo={seo}/>;
            case "text-to-hex":
                return <TextToHex article={article} seo={seo}/>;
            // case "multi-date-converter":
            //   return <MultiDateConverter />;
            default:
                return <ToolNotFound />;
        }
    };

    return (<>
        <div>
            {renderToolComponent()}
        </div>
    </>)
}


export default ToolClient
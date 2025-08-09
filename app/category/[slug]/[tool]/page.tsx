import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import LinkPriceCalculator from "@/components/tools/LinkPriceCalculator";


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
      //   case "earning-per-share":
      //     return <EarningPerShareTool />;
      default:
        return <p>Tool not found.</p>;
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

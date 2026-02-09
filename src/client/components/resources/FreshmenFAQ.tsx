import { cn } from "@/shared/utils";
import FAQ from "@components/programs/FAQCard";
import { FreshmanFAQList } from "@information/FreshmenFAQList";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const FreshmenFAQ = () => {
  const resourceTabs: Record<string, React.ReactNode> = {
    Academic: (
      <div>
        <p className="px-8 font-redhat text-lg font-medium">{FreshmanFAQList[0].heading}</p>
        <FAQ faqData={FreshmanFAQList[0].questions} />
      </div>
    ),
    Professional: (
      <div>
        <p className="px-8 font-redhat text-lg font-medium">{FreshmanFAQList[1].heading}</p>
        <FAQ faqData={FreshmanFAQList[1].questions} />
      </div>
    ),
    Extracurricular: (
      <div>
        <p className="px-8 font-redhat text-lg font-medium">{FreshmanFAQList[2].heading}</p>
        <FAQ faqData={FreshmanFAQList[2].questions} />
      </div>
    ),
    Miscellaneous: (
      <div>
        <p className="px-8 font-redhat text-lg font-medium">{FreshmanFAQList[3].heading}</p>
        <FAQ faqData={FreshmanFAQList[3].questions} />
      </div>
    ),
  };

  const [activeTab, setActiveTab] = useState<keyof typeof resourceTabs>("Academic");
  const categories = Object.keys(resourceTabs);
  const tabRefs = useRef<Array<HTMLButtonElement>>([]);
  const [sliderStyle, setSliderStyle] = useState({
    left: "0px",
    width: "0px",
  });

  useEffect(() => {
    const currentIndex = categories.indexOf(activeTab);
    if (currentIndex < 0) return;
    const currentTab = tabRefs.current[currentIndex];
    if (!currentTab) return;
    setSliderStyle({
      left: currentTab.offsetLeft + "px",
      width: currentTab.offsetWidth + "px",
    });
  }, [activeTab, categories]);

  return (
    <div>
      <div className="px-8 pt-6">
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 rounded-lg border-2 border-saseBlue px-4 py-2 font-redhat text-sm font-semibold text-saseBlue transition-colors hover:bg-saseBlue hover:text-background"
        >
          ← Back to Resources
        </Link>
      </div>

      <div className="text-center">
        <h1 className="header-text ombre-text">Freshman FAQS</h1>
      </div>

      <div className="mt-6 flex justify-center border-b">
        <ul className="relative grid grid-cols-2 gap-2 px-4 md:flex md:space-x-4">
          <div className="absolute bottom-0 h-1 bg-saseBlue transition-all duration-300" style={sliderStyle} />
          {categories.map((category, idx) => {
            const isActive = category === activeTab;
            return (
              <li key={category}>
                <button
                  ref={(el) => {
                    if (el) tabRefs.current[idx] = el;
                  }}
                  onClick={() => setActiveTab(category as keyof typeof resourceTabs)}
                  className={cn(
                    "relative w-full whitespace-nowrap px-4 py-2 text-base font-semibold transition-colors md:w-auto",
                    isActive ? "text-saseBlue" : "text-foreground hover:text-saseBlue",
                  )}
                >
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="px-8 pt-4">{resourceTabs[activeTab]}</div>
    </div>
  );
};

export default FreshmenFAQ;

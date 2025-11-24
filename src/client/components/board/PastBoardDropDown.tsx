import React, { useState } from "react";

interface BoardDropdown {
  title: string;
  children: React.ReactNode;
}

const PastBoardDropDown: React.FC<BoardDropdown> = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-6">
      <div className="overflow-hidden rounded-3xl border border-border">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between bg-muted px-6 py-5 text-left text-2xl font-semibold text-foreground focus:outline-none"
        >
          <span>{title}</span>
          <span className={`transform text-2xl transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}>{isOpen ? "−" : "+"}</span>
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? "opacity-100" : "max-h-0 opacity-0"}`}
        style={{ transitionProperty: "max-height, opacity" }}
      >
        <div className="bg-muted-background px-6 py-5 text-xl text-foreground">{children}</div>
      </div>
    </div>
  );
};

export default PastBoardDropDown;

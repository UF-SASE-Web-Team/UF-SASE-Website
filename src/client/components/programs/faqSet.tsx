export const faqData: Array<{ question: string; answer: string | React.ReactNode }> = [
  {
    question: "How do I sign up?",
    answer: (
      <>
        This year’s team is closed, but feel free to apply in <strong>Fall 2025</strong> to be a part of 2025-2026 SET!
      </>
    ),
  },
  {
    question: "What projects does SET work on?",
    answer:
      "SET members come together every year to choose what project to work on! Two years ago SET created a trash-picking-up robot, and last year, SET made a robot rescue dog! This year, we are working on a an autonomous delivery robot!",
  },
  {
    question: "What does the time commitment look like?",
    answer: "SET has a time commitment of 5-10 hours a week with 2-hour meetings held twice a week!",
  },
  {
    question: "I have more questions!",
    answer: (
      <>
        Feel free to ask your questions in the{" "}
        <a href="http://discord.gg/q3HBeC5" target="_blank" rel="noopener noreferrer" className="text-saseGreen underline">
          SASE Discord channel
        </a>{" "}
        or contact our Technical Chairs, Kevin and Manav, through Discord!
      </>
    ),
  },
];

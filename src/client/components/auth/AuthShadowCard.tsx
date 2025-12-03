const ShadowCard = ({ formHeight, isSignUp }: { formHeight: number; isSignUp: boolean }) => (
  <>
    {/* Green Shadow Card */}
    <div
      className={`absolute left-1/2 z-0 -ml-4 mt-6 w-full max-w-md -translate-x-1/2 -translate-y-6 transform rounded-lg bg-saseGreen opacity-100 shadow-lg`}
      style={{
        minHeight: isSignUp ? "38rem" : "32rem",
        height: formHeight ? formHeight + 10 : "auto",
      }}
    ></div>

    {/* Blue Shadow Card */}
    <div
      className={`absolute right-1/2 z-0 -mr-4 mt-20 w-full max-w-md -translate-y-6 translate-x-1/2 transform rounded-lg bg-saseBlue opacity-100 shadow-lg`}
      style={{
        minHeight: isSignUp ? "38rem" : "32rem",
        height: formHeight ? formHeight + 10 : "auto",
      }}
    ></div>
  </>
);

export default ShadowCard;

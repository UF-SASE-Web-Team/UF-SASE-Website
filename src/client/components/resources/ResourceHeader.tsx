export const ResourceHeader = ({ label }: { label: string }) => {
  return (
    <div className="mb-6 flex items-center justify-center">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-4">
        <div className="h-3 flex-1 rounded-r-md bg-gradient-to-r from-saseGreen via-saseGreen to-transparent" />
        <div className="mx-4 whitespace-nowrap rounded-md bg-background px-6 py-1 text-center text-sm font-semibold shadow-sm dark:bg-neutral-900">
          {label}
        </div>
        <div className="h-3 flex-1 rounded-l-md bg-gradient-to-l from-saseBlue via-saseBlue to-transparent" />
      </div>
    </div>
  );
};

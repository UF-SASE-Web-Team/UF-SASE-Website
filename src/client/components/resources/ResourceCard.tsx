export const ResourceCard = ({ href, icon, title }: { href: string; icon: React.ReactNode; title: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mx-auto w-44 transform transition duration-300 hover:scale-105 sm:w-52 lg:w-56"
    >
      <div className="flex flex-col items-center rounded-xl border-2 border-foreground bg-background p-1 shadow-[0_6px_0_rgba(203,203,212,1)]">
        <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-background bg-background text-saseBlueLight">
          {icon}
        </div>
        <div className="mt-3 text-center font-redhat text-sm font-semibold">{title}</div>
      </div>
    </a>
  );
};

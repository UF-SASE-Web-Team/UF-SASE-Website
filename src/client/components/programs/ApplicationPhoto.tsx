import { Icon } from "@iconify/react";

export const ApplicationPhoto = ({
  applicationStatus,
  applyLink,
  deadline,
  image,
  nextSemester,
}: {
  image: string;
  applicationStatus: "OPEN" | "CLOSED";
  nextSemester: string;
  applyLink?: string;
  deadline?: string;
}) => {
  return (
    <div className="max-w-3xl px-4">
      <img src={image} alt="Picture" className="mb-4 w-full rounded-2xl" />
      <p className="mb-4 text-left font-silkscreen text-3xl text-white">
        &gt; &gt; APPLICATIONS: <span className="text-saseBlue">{applicationStatus}</span>
      </p>
      {applyLink ? (
        <div className="flex flex-col items-start gap-4">
          <p className="font-redhat text-lg text-white">
            <strong>{nextSemester}</strong> applications are open!
            {deadline ? (
              <>
                {" "}
                Deadline: <strong>{deadline}</strong>
              </>
            ) : null}
          </p>
          <a
            href={applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-saseGreen px-10 py-4 text-xl font-semibold text-white shadow-xl transition hover:brightness-90"
          >
            Apply Now
            <Icon icon="mdi:open-in-new" className="text-lg" />
          </a>
        </div>
      ) : (
        <p className="font-redhat text-lg text-white">
          <strong>{nextSemester}</strong> applications can be found on UF SASE’s{" "}
          <a href="https://www.instagram.com/ufsase/" target="_blank" rel="noopener noreferrer" className="text-saseGreen underline">
            Instagram
          </a>{" "}
          and{" "}
          <a href="http://discord.gg/q3HBeC5" target="_blank" rel="noopener noreferrer" className="text-saseGreen underline">
            Discord
          </a>
          !
        </p>
      )}
    </div>
  );
};

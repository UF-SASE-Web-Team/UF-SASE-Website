export const ApplicationPhoto = ({applicationStatus, image, nextSemester} : {image: string, applicationStatus : "OPEN" | "CLOSED", nextSemester: string}) => {
  return (
    <div className="max-w-3xl px-4">
      <img src={image} alt="Picture" className="w-full rounded-2xl mb-4"/>
      <p className="font-silkscreen text-3xl text-left text-white mb-4">
        &gt; &gt; APPLICATIONS: <span className="text-saseBlue">{applicationStatus}</span>
      </p>
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
    </div>
  );
}
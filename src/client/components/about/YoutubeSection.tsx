const YouTubeVideoSection = () => (
  <div className="relative w-full max-w-4xl overflow-hidden rounded-xl border-2 border-border bg-muted p-6 transition-shadow duration-300 hover:shadow-2xl">
    <div className="relative pb-[56.25%]">
      <iframe
        className="absolute left-0 top-0 h-full w-full rounded-lg"
        src="https://www.youtube.com/embed/UymaxCaKkMU"
        title="UF SASE Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

export default YouTubeVideoSection;

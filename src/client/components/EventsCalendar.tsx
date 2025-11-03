const EventsCalendar = () => (
  <div className="group relative" style={{ width: "100%", height: "550px", maxWidth: "60%", minWidth: "450px" }}>
    <div className="pointer-events-none absolute left-3 top-3 z-0 h-full w-full rounded-xl bg-gradient-to-b from-saseGreen to-saseBlue opacity-100 transition-opacity duration-700 ease-in-out group-hover:opacity-0"></div>
    <div className="pointer-events-none absolute left-3 top-3 z-0 h-full w-full rounded-xl bg-gradient-to-b from-saseBlue to-saseGreen opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"></div>

    <iframe
      src="https://calendar.google.com/calendar/embed?src=37ac4d5540136c7524b9a64daa11762754c52afa770f3f12e1ac6edca7cb59a3%40group.calendar.google.com&ctz=America%2FNew_York"
      style={{
        border: "2px solid black",
        borderRadius: "15px",
        zIndex: 2,
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      frameBorder="0"
      scrolling="no"
    ></iframe>
  </div>
);

export default EventsCalendar;

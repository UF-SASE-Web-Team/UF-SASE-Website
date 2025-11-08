const EventsCalendar = () => (
  <div className="relative h-[70vh] min-h-[480px] w-full md:h-[72vh] lg:h-[76vh]">
    {/* offset blue shadow */}
    <div aria-hidden className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-saseBlue/40" />

    {/* main card */}
    <div className="relative h-full w-full overflow-hidden rounded-2xl border-[3px] border-black bg-white">
      <iframe
        title="UF SASE Calendar"
        src="https://calendar.google.com/calendar/embed?src=37ac4d5540136c7524b9a64daa11762754c52afa770f3f12e1ac6edca7cb59a3%40group.calendar.google.com&ctz=America%2FNew_York"
        className="h-full w-full"
        frameBorder="0"
        scrolling="no"
      />
    </div>
  </div>
);

export default EventsCalendar;

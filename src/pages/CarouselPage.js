import React, { useState, useRef } from 'react';

function resolveGoogleDriveThumbnail(url) {
  const match = url.match(/[-\w]{25,}/);
  return match ? `https://drive.google.com/thumbnail?id=${match[0]}&sz=w1000` : null;
}

export default function CarouselPage({ events, onClickEvent }) {
    const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!events || events.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading events...</p>
      </div>
    );
  }
  

  const scrollBy = (offset) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      setScrollPosition(containerRef.current.scrollLeft + offset);
    }
  };

  const sortedEvents = [...events].sort((a, b) => new Date(a.Date) - new Date(b.Date));

  return (
    <div className="relative pt-12">
      {/* Responsive Nav */}
      <div className="absolute top-4 left-4 z-20">
        <button
          className="text-2xl p-2 rounded bg-white shadow md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
        {isMobileMenuOpen && (
          <div className="absolute mt-2 w-40 bg-white shadow rounded p-2">
            <a href="/" className="block py-1 text-blue-600 hover:underline">Home</a>
            <a href="/calendar" className="block py-1 text-blue-600 hover:underline">Calendar</a>
            <a href="/list" className="block py-1 text-blue-600 hover:underline">List</a>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold text-center mb-4 mt-16">Upcoming Events</h2>

      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 p-2 rounded shadow hover:bg-opacity-100"
        onClick={() => scrollBy(-300)}
      >
        ◀
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 p-2 rounded shadow hover:bg-opacity-100"
        onClick={() => scrollBy(300)}
      >
        ▶
      </button>

      <section
        ref={containerRef}
        className="flex items-center justify-start overflow-x-auto pb-24 px-4 gap-6 snap-x snap-mandatory"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {sortedEvents.map((event, index) => (
          <div
            key={index}
            className="flex-shrink-0 cursor-pointer w-60 sm:w-72 md:w-80 snap-start transition-transform duration-300 hover:scale-105"
            onClick={() => onClickEvent(event)}
          >
            {event["Flyer or Promotional Images"] ? (
              <img
                src={resolveGoogleDriveThumbnail(event["Flyer or Promotional Images"])}
                alt={`Flyer ${index}`}
                className="w-full h-auto object-contain rounded shadow"
                style={{ maxHeight: '65vh' }}
              />
            ) : (
              <div className="w-full h-[65vh] bg-blue-100 flex flex-col justify-center items-center rounded shadow">
                <h3 className="text-center font-semibold text-gray-700 px-4">{event["Event title"]}</h3>
                <p className="text-sm">{event.Date}</p>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

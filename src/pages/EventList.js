import React, { useState } from 'react';

function resolveGoogleDriveThumbnail(url) {
  const match = url.match(/[-\w]{25,}/);
  return match ? `https://drive.google.com/thumbnail?id=${match[0]}&sz=w1000` : null;
}

export default function EventList({ events, onClickEvent }) {
  const [search, setSearch] = useState("");

  const filtered = events.filter(event =>
    event["Event title"]?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Search events..."
        className="mb-4 w-full p-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.map((event, index) => (
        <div
          key={index}
          onClick={() => onClickEvent(event)}
          className="bg-white rounded shadow p-4 flex gap-4 cursor-pointer hover:bg-gray-100"
        >
          {event["Flyer or Promotional Images"] && (
            <img
              src={resolveGoogleDriveThumbnail(event["Flyer or Promotional Images"])}
              alt="thumb"
              className="w-24 h-24 object-cover rounded"
            />
          )}
          <div>
            <h3 className="font-bold text-lg">{event["Event title"]}</h3>
            <p className="text-sm text-gray-600">
              {event.Date} — {event["Start Time"]} to {event["End Time"]}
            </p>
            <p className="text-sm">{event.Location}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

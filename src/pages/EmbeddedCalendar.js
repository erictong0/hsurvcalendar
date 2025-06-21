import React from 'react';

export default function EmbeddedCalendar() {
  return (
    <div className="flex justify-center p-4">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=c_e97d33752f9b51f1aa765c4161a86d2d832d6ca89edaea484d04252f5dab255c%40group.calendar.google.com&ctz=America%2FNew_York"
        style={{ border: 0 }}
        width="800"
        height="600"
        frameBorder="0"
        scrolling="no"
        title="HSURV Google Calendar"
      ></iframe>
    </div>
  );
}

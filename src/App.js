import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Papa from 'papaparse';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EventList from './pages/EventList';
import CarouselPage from './pages/CarouselPage';
import EmbeddedCalendar from './pages/EmbeddedCalendar';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT6Rtedl8Z13qVNaEBWD8fSft9adp9dQn4glcI6U3l-cRRhB4wz_O9LYVvhWGIaqZXLS3Lbz94mZkrc/pub?gid=1869965743&single=true&output=csv';

function App() {
  const [events, setEvents] = useState([]);
  const [modalEvent, setModalEvent] = useState(null);

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const cleaned = results.data.filter(e => e["Event title"] && e.Date);
        setEvents(cleaned);
      }
    });
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') setModalEvent(null);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen text-gray-800">
        <header className="p-4 bg-white shadow flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold">
              <Link to="/" className="hover:underline text-blue-600">HSURV Event Calendar</Link>
            </h1>
            <nav className="space-x-4">
              <Link to="/calendar" className="text-blue-600 hover:underline">Calendar</Link>
              <Link to="/list" className="text-blue-600 hover:underline">List</Link>
            </nav>
          </div>
          <div className="space-x-4">
            <a href="https://forms.gle/AQUPGds15VugsbU69" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Submit Event</a>
            <a href="https://calendar.google.com/calendar/u/0/r?cid=c_e97d33752f9b51f1aa765c4161a86d2d832d6ca89edaea484d04252f5dab255c@group.calendar.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Add to GCal</a>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<CarouselPage events={events} onClickEvent={setModalEvent} />} />
          <Route path="/calendar" element={<EmbeddedCalendar />} />
          <Route path="/list" element={<EventList events={events} onClickEvent={setModalEvent} />} />
        </Routes>

        <AnimatePresence>
          {modalEvent && (
            <motion.div
              className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalEvent(null)}
            >
              <motion.div
                className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 relative"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => setModalEvent(null)} className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl">&times;</button>
                <div className="flex flex-col sm:flex-row gap-4">
                  {modalEvent["Flyer or Promotional Images"] && (
                    <img
                      src={resolveGoogleDriveThumbnail(modalEvent["Flyer or Promotional Images"]) || ''}
                      alt="Event Flyer"
                      className="sm:w-1/2 w-full h-full object-cover rounded shadow"
                    />
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{modalEvent["Event title"]}</h2>
                    <p className="text-sm text-gray-600"><strong>Date:</strong> {modalEvent.Date}</p>
                    <p className="text-sm text-gray-600"><strong>Time:</strong> {modalEvent["Start Time"]} – {modalEvent["End Time"]}</p>
                    <p className="text-sm text-gray-600"><strong>Location:</strong> {modalEvent.Location}</p>
                    <p className="mt-2">{modalEvent.Description}</p>
                    {modalEvent["Flyer or Promotional Images"] && (
                      <a href={modalEvent["Flyer or Promotional Images"]} className="text-blue-600 underline mt-2 block" target="_blank" rel="noopener noreferrer">View Full Image</a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

function resolveGoogleDriveThumbnail(url) {
  const match = url.match(/[-\w]{25,}/);
  if (!match) return null;
  return `https://drive.google.com/thumbnail?id=${match[0]}&sz=w1000`;
}

export default App;

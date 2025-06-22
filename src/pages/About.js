import React from 'react';

export default function About() {
  return (
    <div className="p-8 max-w-2xl mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-4">About</h2>
      <p className="mb-4">
        This is an unofficial website built to help keep track of all of the community-run HSURV events.
      </p>
      <p className="mb-4">
        To request an event to be placed on this site or to edit an existing event, please use the following Google Form:{" "}
        <a
          href="https://forms.gle/AQUPGds15VugsbU69"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Event Request Form
        </a>.
      </p>
      <p>
        If you have any questions or improvements to the site, please reach out to Eric Tong at:{" "}
      </p>
      <div className="text-center mt-1">
        <span className="font-mono">erictong [at] college [dot] harvard [dot] edu</span>
      </div>
    </div>
  );
}

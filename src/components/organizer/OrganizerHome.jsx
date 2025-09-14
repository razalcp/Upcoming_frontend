
const OrganizerHome = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="relative w-full h-72 bg-gray-200 flex items-center justify-center text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Manage Your Events Effortlessly
        </h2>
      </section>

      {/* Banners Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        <div className="bg-yellow-100 rounded-lg shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Create Events</h3>
          <p>Plan and publish your events easily with a few clicks.</p>
        </div>
        <div className="bg-blue-100 rounded-lg shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Track Attendees</h3>
          <p>Manage registrations and track your audience efficiently.</p>
        </div>
        <div className="bg-green-100 rounded-lg shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Distribute Tickets</h3>
          <p>Handle ticketing smoothly and securely with our platform.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4 mt-auto">
        <p>&copy; {new Date().getFullYear()} Upcoming Organizer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default OrganizerHome;



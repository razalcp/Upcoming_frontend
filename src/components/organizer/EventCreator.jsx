import { useEffect, useState } from "react";
import { createEvent, getEvents } from "../../services/organizer/organizerApi";


export default function EventCreator() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    venue: "",
    startAt: "",
    endAt: "",
    capacity: 50,
    description: "",
  })

  useEffect(() => {
    getEvents().then(setEvents).catch(console.error);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const created = await createEvent(form);
    setEvents((prev) => [created, ...prev]);
    setForm({
      title: "",
      venue: "",
      startAt: "",
      endAt: "",
      capacity: 50,
      description: "",
    });
    
  }

  return (
    <div className="grid gap-6">
      <section className="bg-white p-4 rounded border">
        <h2 className="font-semibold mb-3">Create Event</h2>
        <form
          onSubmit={onSubmit}
          className="grid gap-4 sm:grid-cols-2 sm:gap-x-4"
        >
          <input
            className="border p-2 rounded w-full"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded w-full"
            placeholder="Venue"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded w-full"
            type="datetime-local"
            value={form.startAt}
            onChange={(e) => setForm({ ...form, startAt: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded w-full"
            type="datetime-local"
            value={form.endAt}
            onChange={(e) => setForm({ ...form, endAt: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded w-full"
            type="number"
            min={1}
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
            required
          />
          <input
            className="border p-2 rounded w-full sm:col-span-2"
            placeholder="Description"
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <button className="bg-blue-600 text-white rounded px-4 py-2 w-full sm:col-span-2 h-[46px]">
            Create
          </button>
        </form>

      </section>

      <section className="bg-white p-4 rounded border">
        <h2 className="font-semibold mb-3">Upcoming Events</h2>
        <ul className="divide-y">
          {events.map((ev) => (
            <li key={ev._id} className="py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{ev.title}</p>
                  <p className="text-sm text-gray-500">
                    {ev.venue} • {new Date(ev.startAt).toLocaleString()}
                  </p>
                </div>
                <span className="text-sm">Cap: {ev.capacity}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

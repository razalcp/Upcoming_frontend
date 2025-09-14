import { useEffect, useState } from "react";
import { getAttendees, getEvents, issueTicket, listTicketsForEvent, validateTicket } from "../../services/organizer/organizerApi";

export default function TicketsPage() {
    const [events, setEvents] = useState([]);
    const [attendees, setAttendees] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState("");
    const [selectedAttendee, setSelectedAttendee] = useState("");
    const [tickets, setTickets] = useState([]);
    const [qr, setQr] = useState("");

    useEffect(() => {
        Promise.all([getEvents(), getAttendees()]).then(([e, a]) => {
            setEvents(e);
            setAttendees(a);
            if (e[0]) setSelectedEvent(e[0]._id);
        });
    }, []);

    useEffect(() => {
        if (!selectedEvent) return;
        listTicketsForEvent(selectedEvent).then(setTickets).catch(console.error);
    }, [selectedEvent]);

    async function onIssue(e) {
        e.preventDefault();
        if (!selectedEvent || !selectedAttendee) return;
        const created = await issueTicket({ eventId: selectedEvent, attendeeId: selectedAttendee });
        setTickets((prev) => [created, ...prev]);
        setSelectedAttendee("");     
    }

    async function onValidate(e) {
        e.preventDefault();
        if (!qr) return;
        await validateTicket(qr);
        setQr("");
        if (selectedEvent) listTicketsForEvent(selectedEvent).then(setTickets);
    }

    return (
        <div className="grid gap-6">
            <section className="bg-white p-4 rounded border grid gap-4">
                <h2 className="font-semibold">Issue Ticket</h2>
                <form
                    onSubmit={onIssue}
                    className="grid gap-4 sm:grid-cols-3 sm:gap-4"
                >
                    <select
                        className="border p-2 rounded w-full"
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                    >
                        {events.map((ev) => (
                            <option key={ev._id} value={ev._id}>
                                {ev.title}
                            </option>
                        ))}
                    </select>

                    <select
                        className="border p-2 rounded w-full"
                        value={selectedAttendee}
                        onChange={(e) => setSelectedAttendee(e.target.value)}
                    >
                        <option value="">Select attendee</option>
                        {attendees.map((a) => (
                            <option key={a._id} value={a._id}>
                                {a.name}
                            </option>
                        ))}
                    </select>

                    <button className="bg-blue-600 text-white rounded px-4 py-2 w-full sm:col-span-3 h-[46px]">
                        Issue
                    </button>
                </form>

            </section>

            <section className="bg-white p-4 rounded border grid gap-4">
                <h2 className="font-semibold">Validate Ticket</h2>
                <form onSubmit={onValidate} className="flex gap-3">
                    <input
                        className="border p-2 rounded flex-1 min-w-0"
                        placeholder="QR code"
                        value={qr}
                        onChange={(e) => setQr(e.target.value)}
                    />
                   <button className="bg-blue-600 text-white rounded px-4 py-2 w-auto sm:col-span-3 h-[46px]">
                       Validate
                    </button>

                </form>
            </section>

            <section className="bg-white p-4 rounded border">
                <h2 className="font-semibold mb-3">Tickets</h2>
                <ul className="divide-y">
                    {tickets.map((t) => (
                        <li key={t._id} className="py-3 flex items-center justify-between">
                            <div>
                                <p className="font-medium">{t.qrCode}</p>
                                <p
                                    className={`text-sm text-gray-500 px-2 py-1 rounded ${t.status === "checked_in" ? "bg-green-100" : ""
                                        }`}
                                >
                                    {t.status}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}


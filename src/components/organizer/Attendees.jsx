import { useEffect, useState } from "react";
import { createAttendee, getAttendees } from "../../services/organizer/organizerApi";

export default function Attendees() {
	const [items, setItems] = useState([]);
	const [form, setForm] = useState({ name: "", email: "" });

	useEffect(() => {
		getAttendees().then(setItems).catch(console.error);
	}, []);

	async function onSubmit(e) {
		e.preventDefault();
		const created = await createAttendee(form);
		setItems((prev) => [created, ...prev]);
		setForm({ name: "", email: "" });
		
	}

	return (
		<div className="grid gap-6">
			<section className="bg-white p-4 rounded border">
				<h2 className="font-semibold mb-3">Add Attendee</h2>
				<form
					onSubmit={onSubmit}
					className="grid gap-4 sm:grid-cols-2"
				>
					<input
						className="border p-2 rounded w-full"
						placeholder="Name"
						value={form.name}
						onChange={(e) => setForm({ ...form, name: e.target.value })}
						required
					/>
					<input
						className="border p-2 rounded w-full"
						placeholder="Email"
						type="email"
						value={form.email}
						onChange={(e) => setForm({ ...form, email: e.target.value })}
						required
					/>

					{/* Button always on a new row */}
					<button className="bg-blue-600 text-white rounded px-4 py-2 sm:col-span-2 h-[46px]">
						Add
					</button>
				</form>


			</section>
			<section className="bg-white p-4 rounded border">
				<h2 className="font-semibold mb-3">All Attendees</h2>
				<ul className="divide-y">
					{items.map((a) => (
						<li key={a._id} className="py-3 flex items-center justify-between">
							<div>
								<p className="font-medium">{a.name}</p>
								<p className="text-sm text-gray-500">{a.email}</p>
							</div>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}

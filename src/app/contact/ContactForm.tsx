"use client";

import { useState } from "react";

const ContactForm = () => {
	const [success, setSuccess] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSuccess(true);
	};

	if (success) {
		return (
			<p className="text-gray-700 max-w-xl">
				Thank you for your message. We&apos;ll get back to you as soon as we can.
			</p>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-6 max-w-xl"
		>
			<div className="flex flex-col gap-2">
				<label htmlFor="name" className="text-sm text-gray-700">
					Name
				</label>
				<input
					id="name"
					type="text"
					name="name"
					placeholder="Your name"
					required
					className="ring-2 ring-gray-300 rounded-md p-4"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="email" className="text-sm text-gray-700">
					Email
				</label>
				<input
					id="email"
					type="email"
					name="email"
					placeholder="you@example.com"
					required
					className="ring-2 ring-gray-300 rounded-md p-4"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="subject" className="text-sm text-gray-700">
					Subject
				</label>
				<input
					id="subject"
					type="text"
					name="subject"
					placeholder="How can we help?"
					className="ring-2 ring-gray-300 rounded-md p-4"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="message" className="text-sm text-gray-700">
					Message
				</label>
				<textarea
					id="message"
					name="message"
					placeholder="Your message..."
					required
					rows={5}
					className="ring-2 ring-gray-300 rounded-md p-4 resize-y"
				/>
			</div>
			<button
				type="submit"
				className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed w-max px-6"
			>
				Send message
			</button>
		</form>
	);
};

export default ContactForm;

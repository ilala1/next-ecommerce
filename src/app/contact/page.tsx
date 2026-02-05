import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
	title: "Contact",
	description: "Get in touch with us.",
};

const ContactPage = () => {
	return (
		<div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-12 md:py-16 flex flex-col md:flex-row gap-12 md:gap-16 items-stretch">
			<div className="w-full md:w-1/2 flex flex-col justify-center">
				<h1 className="text-2xl font-semibold mb-8">Contact Us</h1>
				<ContactForm />
			</div>
			<div className="w-full md:w-1/2 relative min-h-[280px] md:min-h-[400px] rounded-lg overflow-hidden bg-gray-100">
				<Image
					src="/woman.png"
					alt=""
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, 50vw"
				/>
			</div>
		</div>
	);
};

export default ContactPage;

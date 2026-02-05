import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "About",
	description: "Learn more about our e-commerce store and mission.",
};

const AboutPage = () => {
	return (
		<div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-12 md:py-16 flex flex-col md:flex-row gap-12 md:gap-16 items-stretch">
			<div className="w-full md:w-1/2 flex flex-col justify-center">
				<h1 className="text-2xl font-semibold mb-8">About Us</h1>
				<div className="flex flex-col gap-6 text-gray-700">
					<p>
						We are a modern e-commerce store built with Next.js, offering a
						curated selection of products and a smooth shopping experience.
					</p>
					<p>
						Our mission is to connect quality products with customers who value
						convenience and reliability. We focus on clear product information,
						secure checkout, and responsive support.
					</p>
					<p>
						Thank you for visiting. If you have any questions, please reach out
						through our contact options.
					</p>
				</div>
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

export default AboutPage;

// import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import Add from "@/components/Add";
import ProductImages from "@/components/ProductImages";
// import Reviews from "@/components/Reviews";
// import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
	//   const wixClient = await wixClientServer();

	//   const products = await wixClient.products
	//     .queryProducts()
	//     .eq("slug", params.slug)
	//     .find();

	//   if (!products.items[0]) {
	//     return notFound();
	//   }

	//   const product = products.items[0];

	return (
		<div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
			{/* IMG */}
			<div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
				<ProductImages />
			</div>
			{/* TEXTS */}
			<div className="w-full lg:w-1/2 flex flex-col gap-6">
				<h1 className="text-4xl font-medium">name</h1>
				<p className="text-gray-500">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Possimus dolorem dicta qui eius eaque ipsam eos corporis,
					provident asperiores laudantium fuga, illo unde! Quisquam
					nihil natus magnam voluptate itaque adipisci?
				</p>
				<div className="h-[2px] bg-gray-100" />
				<div className="flex items-center gap-4">
					<h3 className="text-xl text-gray-500 line-through">$59</h3>
					<h2 className="text-medium text-2xl">$49</h2>
				</div>
				<div className="h-[2px] bg-gray-100" />
				<CustomizeProducts />
				<Add />
				<div className="h-[2px] bg-gray-100" />
				<div className="text-sm">
					<h4 className="font-medium mb-4">Title</h4>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Nihil consectetur aut vel est, sed quos dolorem
						architecto, error sequi eveniet provident recusandae
						corporis debitis saepe ex, adipisci aspernatur rerum
						suscipit.
					</p>
				</div>
				<div className="text-sm">
					<h4 className="font-medium mb-4">Title</h4>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Nihil consectetur aut vel est, sed quos dolorem
						architecto, error sequi eveniet provident recusandae
						corporis debitis saepe ex, adipisci aspernatur rerum
						suscipit.
					</p>
				</div>
				<div className="h-[2px] bg-gray-100" />
				{/* REVIEWS */}
				<h1 className="text-2xl">User Reviews</h1>
			</div>
		</div>
	);
};

export default SinglePage;

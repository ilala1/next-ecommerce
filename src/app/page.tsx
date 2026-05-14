import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import { Suspense } from "react";

const HomePage = async () => {
	const featuredCategoryId =
		process.env.FEATURED_PRODUCTS_CATEGORY_ID?.trim();
	if (!featuredCategoryId) {
		throw new Error(
			"FEATURED_PRODUCTS_CATEGORY_ID is missing or empty. Add it under Vercel Project Settings → Environment Variables, then redeploy."
		);
	}

	return (
		<div className="">
			<Slider />
			<div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
				<h1 className="text-2xl">Featured Products</h1>
				<Suspense fallback={<div>Loading...</div>}>
					<ProductList
						categoryId={featuredCategoryId}
						limit={4}
					/>
				</Suspense>
			</div>
			<div className="mt-24">
				<h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
					Categories
				</h1>
				<Suspense fallback={<div>Loading...</div>}>
					<CategoryList />
				</Suspense>
			</div>
		</div>
	);
};

export default HomePage;

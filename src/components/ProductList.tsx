// import { wixClientServer } from "@/lib/wixClientServer";
// import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
// import DOMPurify from "isomorphic-dompurify";
// import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async () => {
	//   const wixClient = await wixClientServer();

	//   const productQuery = wixClient.products
	//     .queryProducts()
	//     .startsWith("name", searchParams?.name || "")
	//     .eq("collectionIds", categoryId)
	//     .hasSome(
	//       "productType",
	//       searchParams?.type ? [searchParams.type] : ["physical", "digital"]
	//     )
	//     .gt("priceData.price", searchParams?.min || 0)
	//     .lt("priceData.price", searchParams?.max || 999999)
	//     .limit(limit || PRODUCT_PER_PAGE)
	//     .skip(
	//       searchParams?.page
	//         ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
	//         : 0
	//     );
	// .find();

	//   if (searchParams?.sort) {
	//     const [sortType, sortBy] = searchParams.sort.split(" ");

	//     if (sortType === "asc") {
	//       productQuery.ascending(sortBy);
	//     }
	//     if (sortType === "desc") {
	//       productQuery.descending(sortBy);
	//     }
	//   }

	//   const res = await productQuery.find();

	return (
		<div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
			<Link
				href={"/product-slug"}
				className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
			>
				<div className="relative w-full h-80">
					<Image
						src={"/product.png"}
						alt=""
						fill
						sizes="25vw"
						className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
					/>
					<Image
						src={"/product.png"}
						alt=""
						fill
						sizes="25vw"
						className="absolute object-cover rounded-md"
					/>
				</div>
				<div className="flex justify-between">
					<span className="font-medium">product.name</span>
					<span className="font-semibold">30</span>
				</div>
				<div className="text-sm text-gray-500">
          Small and Grey
        </div>
				<button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
					Add to Cart
				</button>
			</Link>
			<Link
				href={"/product-slug"}
				className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
			>
				<div className="relative w-full h-80">
					<Image
						src={"/product.png"}
						alt=""
						fill
						sizes="25vw"
						className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
					/>
					<Image
						src={"/product.png"}
						alt=""
						fill
						sizes="25vw"
						className="absolute object-cover rounded-md"
					/>
				</div>
				<div className="flex justify-between">
					<span className="font-medium">product.name</span>
					<span className="font-semibold">30</span>
				</div>
				<div className="text-sm text-gray-500">
          Small and Grey
        </div>
				<button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
					Add to Cart
				</button>
			</Link>
			<Link
				href={"/product-slug"}
				className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
			>
				<div className="relative w-full h-80">
					<Image
						src={"/product.png"}
						alt=""
						fill
						sizes="25vw"
						className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
					/>
					<Image
						src={"/product.png"}
						alt=""
						fill
						sizes="25vw"
						className="absolute object-cover rounded-md"
					/>
				</div>
				<div className="flex justify-between">
					<span className="font-medium">product.name</span>
					<span className="font-semibold">30</span>
				</div>
				<div className="text-sm text-gray-500">
          Small and Grey
        </div>
				<button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
					Add to Cart
				</button>
			</Link>
			<Link
				href={"/product-slug"}
				className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
			>
				<div className="relative w-full h-80">
					<Image
						src={"/product.png"}
						alt=""
						fill
						sizes="25vw"
						className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
					/>
					<Image
						src={"/product.png"}
						alt=""
						fill
						sizes="25vw"
						className="absolute object-cover rounded-md"
					/>
				</div>
				<div className="flex justify-between">
					<span className="font-medium">product.name</span>
					<span className="font-semibold">30</span>
				</div>
				<div className="text-sm text-gray-500">
          Small and Grey
        </div>
				<button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
					Add to Cart
				</button>
			</Link>
		</div>
	);
};

export default ProductList;

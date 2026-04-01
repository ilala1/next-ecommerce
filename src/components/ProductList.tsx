import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";
// import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

type ListSearchParams = Record<string, string | string[] | undefined>;

/** Fields supported by Wix `ProductsQueryBuilder.ascending` / `descending`. */
type ProductsSortField =
	| "_id"
	| "name"
	| "slug"
	| "sku"
	| "productType"
	| "price"
	| "priceData.price"
	| "numericId"
	| "lastUpdated";

const ProductList = async ({
	categoryId,
	limit,
	searchParams,
}: {
	categoryId: string;
	limit?: number;
	searchParams?: ListSearchParams | Promise<ListSearchParams>;
}) => {
	const sp = (await Promise.resolve(searchParams ?? {})) as ListSearchParams;
	const wixClient = await wixClientServer();

	const nameFilter = Array.isArray(sp.name) ? sp.name[0] : sp.name;
	const typeFilter = Array.isArray(sp.type) ? sp.type[0] : sp.type;
	const minFilter = Array.isArray(sp.min) ? sp.min[0] : sp.min;
	const maxFilter = Array.isArray(sp.max) ? sp.max[0] : sp.max;
	const pageFilter = Array.isArray(sp.page) ? sp.page[0] : sp.page;
	const sortFilter = Array.isArray(sp.sort) ? sp.sort[0] : sp.sort;
	const catFilter = Array.isArray(sp.cat) ? sp.cat[0] : sp.cat;
	const minPrice = minFilter != null && minFilter !== "" ? Number(minFilter) : 0;
	const maxPrice =
		maxFilter != null && maxFilter !== ""
			? Number(maxFilter)
			: 999999;

	const productQuery = wixClient.products
		.queryProducts()
		.startsWith("name", nameFilter || "")
		.eq("collectionIds", categoryId)
		.hasSome(
			"productType",
			typeFilter ? [typeFilter] : ["physical", "digital"]
		)
		.gt(
			"priceData.price",
			Number.isFinite(minPrice) ? minPrice : 0
		)
		.lt(
			"priceData.price",
			Number.isFinite(maxPrice) ? maxPrice : 999999
		)
		.limit(limit || PRODUCT_PER_PAGE)
		.skip(
			pageFilter
				? parseInt(pageFilter, 10) * (limit || PRODUCT_PER_PAGE)
				: 0
		);
	// .find();
	let res;

	if (sortFilter) {
		const [sortType, sortByRaw] = sortFilter.split(" ");
		const sortBy = sortByRaw as ProductsSortField;

		if (sortType === "asc") {
			res = await productQuery.ascending(sortBy).find();
		}
		if (sortType === "desc") {
			res = await productQuery.descending(sortBy).find();
		}
		if (sortType === "Sort") {
			res = await productQuery.find();
		}
	}

	if (res === undefined) {
		res = await productQuery.find();
	}

	return (
		<div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
			{res &&
				res.items.map((product: products.Product) => (
					<Link
						href={"/" + product.slug}
						className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
						key={product._id}
					>
						<div className="relative w-full h-80">
							<Image
								src={
									product.media?.mainMedia?.image?.url ||
									"/product.png"
								}
								alt=""
								fill
								sizes="25vw"
								className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
							/>
							{product.media?.items && (
								<Image
									src={
										product.media?.items[1]?.image?.url ||
										"/product.png"
									}
									alt=""
									fill
									sizes="25vw"
									className="absolute object-cover rounded-md"
								/>
							)}
						</div>
						<div className="flex justify-between">
							<span className="font-medium">{product.name}</span>
							<span className="font-semibold">
								${product.price?.price}
							</span>
						</div>
						{product.additionalInfoSections && (
							<div
								className="text-sm text-gray-500"
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(
										product.additionalInfoSections.find(
											(section: any) =>
												section.title === "shortDesc"
										)?.description || ""
									),
								}}
							></div>
						)}
						<button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
							Add to Cart
						</button>
					</Link>
				))}
			{catFilter || nameFilter ? (
				<Pagination
					currentPage={res.currentPage || 0}
					hasPrev={res.hasPrev()}
					hasNext={res.hasNext()}
				/>
			) : null}
		</div>
	);
};

export default ProductList;

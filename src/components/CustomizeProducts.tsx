"use client";

import { products } from "@wix/stores";
import { useEffect, useState } from "react";
import Add from "./Add";

type SelectedOptions = Record<
	string,
	{
		value?: string;
		description?: string;
	}
>;

const CustomizeProducts = ({
	productId,
	variants,
	productOptions,
}: {
	productId: string;
	variants: products.Variant[];
	productOptions: products.ProductOption[];
}) => {
	const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
	const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

	const isInStock = (stock: products.Variant["stock"] | undefined) => {
		// Be conservative: only mark OOS when Wix explicitly says so,
		// or when quantity is provided and <= 0.
		const qty = stock?.quantity;
		const hasQty = typeof qty === "number";
		if (stock?.inStock === false) return false;
		if (hasQty && qty <= 0) return false;
		return true;
	};

	useEffect(() => {
		const variant = variants.find((v) => {
			const variantChoices = v.choices;
			if (!variantChoices) return false;

			return Object.entries(selectedOptions).every(([key, sel]) => {
				const chosen = variantChoices[key];
				if (!chosen) return false;

				const candidates = [sel.description, sel.value].filter(
					(x): x is string => typeof x === "string" && x.length > 0
				);
				if (candidates.length === 0) return false;

				const norm = (s: string) => s.trim().toLowerCase();
				return candidates.some((c) => norm(c) === norm(chosen));
			});
		});
		setSelectedVariant(variant);
	}, [selectedOptions, variants]);

	const handleOptionSelect = (
		optionType: string,
		choice: { value?: string; description?: string }
	) => {
		setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
	};

	const isVariantInStock = (choices: SelectedOptions) => {
		return variants.some((variant) => {
			const variantChoices = variant.choices;
			if (!variantChoices) return false;

			const hasStock = isInStock(variant.stock);

			return (
				Object.entries(choices).every(([key, sel]) => {
					const chosen = variantChoices[key];
					if (!chosen) return false;

					const candidates = [sel.description, sel.value].filter(
						(x): x is string => typeof x === "string" && x.length > 0
					);
					if (candidates.length === 0) return false;

					const norm = (s: string) => s.trim().toLowerCase();
					return candidates.some((c) => norm(c) === norm(chosen));
				}) &&
				hasStock
			);
		});
	};

	return (
		<div className="flex flex-col gap-6">
			{productOptions.map((option) => (
				<div className="flex flex-col gap-4" key={option.name}>
					<h4 className="font-medium">Choose a {option.name}</h4>
					<ul className="flex items-center gap-3">
						{option.choices?.map((choice) => {
							const disabled = !isVariantInStock({
								...selectedOptions,
								[option.name!]: {
									description: choice.description,
									value: choice.value,
								},
							});

							const selected =
								selectedOptions[option.name!]?.description ===
									choice.description ||
								selectedOptions[option.name!]?.value === choice.value;

							const clickHandler = disabled
								? undefined
								: () =>
										handleOptionSelect(
											option.name!,
											{
												description: choice.description,
												value: choice.value,
											}
										);

							return option.name === "Color" ? (
								<li
									className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative"
									style={{
										backgroundColor: choice.value,
										cursor: disabled
											? "not-allowed"
											: "pointer",
									}}
									onClick={clickHandler}
									key={choice.description}
								>
									{selected && (
										<div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
									)}
									{disabled && (
										<div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
									)}
								</li>
							) : (
								<li
									className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm"
									style={{
										cursor: disabled
											? "not-allowed"
											: "pointer",
										backgroundColor: selected
											? "#f35c7a"
											: disabled
											? "#FBCFE8"
											: "white",
										color:
											selected || disabled
												? "white"
												: "#f35c7a",
										boxShadow: disabled ? "none" : "",
									}}
									key={choice.description}
									onClick={clickHandler}
								>
									{choice.description}
								</li>
							);
						})}
					</ul>
				</div>
			))}
			{(() => {
				const allOptionsSelected =
					productOptions.length === 0 ||
					productOptions.every(
						(opt) =>
							!!opt.name &&
							(selectedOptions[opt.name]?.description !== undefined ||
								selectedOptions[opt.name]?.value !== undefined)
					);

				const hasSelectedVariant = Boolean(selectedVariant);
				const inStock = hasSelectedVariant
					? isInStock(selectedVariant?.stock)
					: false;

				const stockQty = selectedVariant?.stock?.quantity;
				const hasStockQty = typeof stockQty === "number";

				const disabled = !allOptionsSelected || !hasSelectedVariant || !inStock;
				const disabledMessage = !allOptionsSelected
					? "Please select options"
					: !hasSelectedVariant
						? "Unavailable combination"
						: !inStock
							? "Product is out of stock"
							: undefined;

				return (
			<Add
				productId={productId}
				variantId={selectedVariant?._id || ""}
				stockNumber={hasStockQty ? stockQty : null}
				disabled={disabled}
				disabledMessage={disabledMessage}
			/>
				);
			})()}
		</div>
	);
};

export default CustomizeProducts;

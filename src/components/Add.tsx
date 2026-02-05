"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { useMemo, useState } from "react";

const MAX_UNKNOWN_STOCK_QTY = 10;

const Add = ({
  productId,
  variantId,
  stockNumber,
  disabled,
  disabledMessage,
}: {
  productId: string;
  variantId: string;
  stockNumber: number | null;
  disabled?: boolean;
  disabledMessage?: string;
}) => {
  const [quantity, setQuantity] = useState(1);

  // // TEMPORARY
  // const stock = 4;

  const hasKnownStock = typeof stockNumber === "number";
  const effectiveStockLimit = hasKnownStock ? stockNumber : MAX_UNKNOWN_STOCK_QTY;
  const isOutOfStock = hasKnownStock ? stockNumber < 1 : false;
  const isDisabled = useMemo(
    () => Boolean(disabled) || isOutOfStock,
    [disabled, isOutOfStock]
  );

  const handleQuantity = (type: "i" | "d") => {
    if (isDisabled) return;
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < effectiveStockLimit) {
      setQuantity((prev) => prev + 1);
    }
  };

  const wixClient = useWixClient();

  const { addItem, isLoading } = useCartStore();

  const handleAddToCart = () => {
    if (isLoading || isDisabled) return;
    addItem(wixClient, productId, variantId, quantity);
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("d")}
              disabled={isLoading || isDisabled || quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("i")}
              disabled={
                isLoading || isDisabled || quantity >= effectiveStockLimit
              }
            >
              +
            </button>
          </div>
          {disabledMessage ? (
            <div className="text-xs">{disabledMessage}</div>
          ) : isOutOfStock ? (
            <div className="text-xs">Product is out of stock</div>
          ) : hasKnownStock ? (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>{" "}
              left!
              <br /> {"Don't"} miss it
            </div>
          ) : (
            <div className="text-xs">In stock</div>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isLoading || isDisabled}
          className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
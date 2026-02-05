"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { media as wixMedia } from "@wix/sdk";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { saveLastOrderFromCart } from "@/lib/lastOrder";

const CartClient = () => {
  const wixClient = useWixClient();
  const router = useRouter();
  const { cart, isLoading, getCart, removeItem } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  const lineItems = (cart as any)?.lineItems as any[] | undefined;

  const subtotalAmount = useMemo(() => {
    const raw = (cart as any)?.subtotal?.amount;
    if (typeof raw === "number") return raw;
    if (typeof raw === "string") {
      const parsed = Number(raw);
      if (!Number.isNaN(parsed)) return parsed;
    }
    if (!Array.isArray(lineItems)) return 0;
    return lineItems.reduce((sum, li) => {
      const unit = Number(li?.price?.amount ?? 0);
      const qty = Number(li?.quantity ?? 0);
      return sum + (Number.isNaN(unit) ? 0 : unit) * (Number.isNaN(qty) ? 0 : qty);
    }, 0);
  }, [cart, lineItems]);

  const handleCheckout = async () => {
    if (isLoading) return;
    const saved = saveLastOrderFromCart(cart as any);
    router.push(`/order-complete${saved?.id ? `?id=${encodeURIComponent(saved.id)}` : ""}`);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative py-12">
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        <Link className="text-sm text-blue-600" href="/list">
          Continue shopping
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="text-gray-500">Loading cart…</div>
          ) : !Array.isArray(lineItems) || lineItems.length === 0 ? (
            <div className="rounded-md ring-1 ring-gray-200 p-6 bg-white">
              <p className="text-gray-700 font-medium">Your cart is empty.</p>
              <p className="text-gray-500 text-sm mt-2">
                Browse products and add something you like.
              </p>
              <Link
                href="/list"
                className="inline-block mt-4 rounded-3xl bg-lama text-white py-2 px-4 text-sm"
              >
                Shop products
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {lineItems.map((item: any) => (
                <div
                  key={item._id}
                  className="flex gap-4 rounded-md ring-1 ring-gray-200 p-4 bg-white"
                >
                  <div className="relative w-24 h-28 shrink-0">
                    {item.image ? (
                      <Image
                        src={wixMedia.getScaledToFillImageUrl(item.image, 96, 112, {})}
                        alt={item.productName?.original || "Cart item"}
                        fill
                        className="object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-md" />
                    )}
                  </div>

                  <div className="flex flex-col justify-between w-full">
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <h2 className="font-semibold truncate">
                          {item.productName?.original}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.availability?.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-700">
                          ${item.price?.amount}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Qty. {item.quantity}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 text-sm">
                      <button
                        className="text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                        onClick={() => removeItem(wixClient, item._id!)}
                      >
                        Remove
                      </button>
                      <div className="text-gray-600">
                        Item total: $
                        {(() => {
                          const unit = Number(item?.price?.amount ?? 0);
                          const qty = Number(item?.quantity ?? 0);
                          const total =
                            (Number.isNaN(unit) ? 0 : unit) *
                            (Number.isNaN(qty) ? 0 : qty);
                          return total.toFixed(2);
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-md ring-1 ring-gray-200 p-6 bg-white sticky top-24">
            <h2 className="font-semibold text-lg">Order Summary</h2>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${subtotalAmount.toFixed(2)}</span>
            </div>

            <p className="text-gray-500 text-sm mt-3">
              Shipping and taxes calculated at checkout.
            </p>

            <button
              className="mt-6 w-full rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
              disabled={isLoading || !Array.isArray(lineItems) || lineItems.length === 0}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;


"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { media as wixMedia } from "@wix/sdk";

import { LastOrder, loadLastOrder } from "@/lib/lastOrder";

const OrderCompleteClient = () => {
  const searchParams = useSearchParams();
  const idFromUrl = searchParams.get("id");

  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    setOrder(loadLastOrder());
  }, []);

  const createdAtLabel = useMemo(() => {
    if (!order?.createdAt) return null;
    const d = new Date(order.createdAt);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleString();
  }, [order?.createdAt]);

  if (!order) {
    return (
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative py-12">
        <div className="max-w-2xl mx-auto rounded-md ring-1 ring-gray-200 p-8 bg-white">
          <h1 className="text-2xl font-semibold">Order complete</h1>
          <p className="mt-3 text-gray-600">
            We couldn’t find a recent order summary for this session.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/cart"
              className="rounded-md py-3 px-4 ring-1 ring-gray-300"
            >
              Back to cart
            </Link>
            <Link
              href="/list"
              className="rounded-md py-3 px-4 bg-black text-white"
            >
              Shop products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const effectiveId = idFromUrl || order.id;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative py-12">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-md ring-1 ring-gray-200 p-8 bg-white">
          <h1 className="text-2xl font-semibold">Order complete</h1>
          <p className="mt-2 text-gray-600">
            Thanks for your purchase. We’re getting your order ready to ship.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-md bg-gray-50 p-4">
              <div className="text-xs text-gray-500">Order ID</div>
              <div className="font-medium mt-1">{effectiveId}</div>
            </div>
            <div className="rounded-md bg-gray-50 p-4">
              <div className="text-xs text-gray-500">Placed</div>
              <div className="font-medium mt-1">
                {createdAtLabel || "Just now"}
              </div>
            </div>
            <div className="rounded-md bg-gray-50 p-4">
              <div className="text-xs text-gray-500">Estimated delivery</div>
              <div className="font-medium mt-1">3–5 business days</div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-semibold text-lg">Items</h2>
              <div className="mt-4 flex flex-col gap-6">
                {order.items.map((item, idx) => (
                  <div
                    key={item.id || `${item.name}-${idx}`}
                    className="flex gap-4 rounded-md ring-1 ring-gray-200 p-4"
                  >
                    <div className="relative w-20 h-24 shrink-0">
                      {item.image ? (
                        <Image
                          src={wixMedia.getScaledToFillImageUrl(
                            item.image,
                            80,
                            96,
                            {}
                          )}
                          alt={item.name || "Purchased item"}
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
                          <div className="font-medium truncate">{item.name}</div>
                          {item.availability && (
                            <div className="text-sm text-gray-500 mt-1">
                              {item.availability}
                            </div>
                          )}
                        </div>
                        <div className="text-right text-sm text-gray-700">
                          ${Number(item.priceAmount ?? 0).toFixed(2)}
                          <div className="text-xs text-gray-500 mt-1">
                            Qty. {item.quantity ?? 1}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mt-3">
                        Item total: $
                        {(
                          Number(item.priceAmount ?? 0) * Number(item.quantity ?? 1)
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-md ring-1 ring-gray-200 p-6 bg-white sticky top-24">
                <h2 className="font-semibold text-lg">Delivery</h2>
                <p className="text-sm text-gray-600 mt-3">
                  You’ll receive a shipping confirmation and tracking link once
                  your order leaves our warehouse.
                </p>
                <p className="text-sm text-gray-600 mt-3">
                  Need help? Contact us anytime.
                </p>

                <div className="mt-6 h-[1px] bg-gray-100" />

                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    ${Number(order.subtotalAmount ?? 0).toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-3">
                  Shipping and taxes are not included in this demo checkout flow.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/list"
                    className="rounded-md py-3 px-4 bg-black text-white text-center"
                  >
                    Continue shopping
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-md py-3 px-4 ring-1 ring-gray-300 text-center"
                  >
                    Contact support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCompleteClient;


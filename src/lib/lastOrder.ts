export type LastOrderItem = {
  id?: string;
  name?: string;
  image?: any;
  quantity?: number;
  priceAmount?: number;
  availability?: string;
};

export type LastOrder = {
  id: string;
  createdAt: string;
  items: LastOrderItem[];
  subtotalAmount: number;
  currency?: string;
};

const STORAGE_KEY = "lastOrder";

function safeNumber(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function computeSubtotal(items: LastOrderItem[]): number {
  return items.reduce((sum, item) => {
    const unit = safeNumber(item.priceAmount) ?? 0;
    const qty = safeNumber(item.quantity) ?? 0;
    return sum + unit * qty;
  }, 0);
}

function generateOrderId(): string {
  const ts = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ORD-${ts}-${rand}`;
}

export function saveLastOrderFromCart(cart: any): LastOrder | null {
  if (typeof window === "undefined") return null;
  const lineItems = cart?.lineItems;
  if (!Array.isArray(lineItems) || lineItems.length === 0) return null;

  const items: LastOrderItem[] = lineItems.map((li: any) => ({
    id: li?._id,
    name: li?.productName?.original,
    image: li?.image,
    quantity: safeNumber(li?.quantity) ?? undefined,
    priceAmount: safeNumber(li?.price?.amount) ?? undefined,
    availability: li?.availability?.status,
  }));

  const subtotalFromCart = safeNumber(cart?.subtotal?.amount);
  const subtotalAmount =
    subtotalFromCart ?? computeSubtotal(items);

  const order: LastOrder = {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    items,
    subtotalAmount,
    currency: typeof cart?.currency === "string" ? cart.currency : undefined,
  };

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    return order;
  } catch {
    return order;
  }
}

export function loadLastOrder(): LastOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LastOrder;
    if (!parsed?.id || !Array.isArray(parsed.items)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearLastOrder(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
}


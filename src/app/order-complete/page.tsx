import OrderCompleteClient from "./OrderCompleteClient";

const OrderCompletePage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const sp = await searchParams;
  const idParam = sp?.id;
  const idFromUrl = Array.isArray(idParam) ? idParam[0] : idParam;

  return <OrderCompleteClient idFromUrl={idFromUrl} />;
};

export default OrderCompletePage;


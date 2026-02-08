import OrderCompleteClient from "./OrderCompleteClient";

const OrderCompletePage = ({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const idParam = searchParams?.id;
  const idFromUrl = Array.isArray(idParam) ? idParam[0] : idParam;

  return <OrderCompleteClient idFromUrl={idFromUrl} />;
};

export default OrderCompletePage;


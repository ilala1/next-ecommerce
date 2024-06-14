import { wixClientServer } from "@/lib/wixClientServer";
import Link from "next/link";
import { notFound } from "next/navigation";

const OrderPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  console.log('id', id)

  const orderRes = [
    {
        _id: '34a24hdudc-ndndjjdsnd',
        priceSummary: {
            subtotal: 100,
        },
        // give a date in the past
        _createdDate: new Date(),
        status: 'COMPLETED',
        billingInfo: {
            contactDetails: {
                firstName: 'John',
                lastName: 'Doe'
            },
            address: {
                addressLine1: '123 Main St',
                city: 'Los Angeles'
            }
        },
        buyerInfo: {
            email: 'test@test.com',
        },
        paymentStatus: 'PENDING'
    },
    {
        _id: '24a4424hdudc-ndndjjds',
        priceSummary: {
            subtotal: 100,
        },
        // give a date in the past
        _createdDate: new Date(),
        status: 'COMPLETED',
        billingInfo: {
            contactDetails: {
                firstName: 'Jane',
                lastName: 'Doe'
            },
            address: {
                addressLine1: '123 Main St',
                city: 'Los Angeles'
            }
        },
        buyerInfo: {
            email: 'test@test.com',
        },
        paymentStatus: 'PAID'
    },
    {
        _id: '2dsfsdf324r-eff4a24hds',
        priceSummary: {
            subtotal: 100,
        },
        // give a date in the past
        _createdDate: new Date(),
        status: 'COMPLETED',
        billingInfo: {
            contactDetails: {
                firstName: 'John',
                lastName: 'Doe'
            },
            address: {
                addressLine1: '123 Main St',
                city: 'Los Angeles'
            }
        },
        buyerInfo: {
            email: 'test@test.com',
        },
        paymentStatus: 'PAID'
    }
];

    const order = orderRes.find((order) => order._id === id);

  const wixClient = await wixClientServer();



  return (
    <div className="flex flex-col h-[calc(100vh-180px)] items-center justify-center ">
      <div className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] px-40 py-20">
      <h1 className="text-xl">Order Details</h1>
      <div className="mt-12 flex flex-col gap-6">
        <div className="">
          <span className="font-medium">Order Id: </span>
          <span>{order?._id}</span>
        </div>
        <div className="">
          <span className="font-medium">Receiver Name: </span>
          <span>
            {order?.billingInfo?.contactDetails?.firstName + " "}
            {order?.billingInfo?.contactDetails?.lastName}
          </span>
        </div>
        <div className="">
          <span className="font-medium">Receiver Email: </span>
          <span>{order?.buyerInfo?.email}</span>
        </div>
        <div className="">
          <span className="font-medium">Price: </span>
          <span>{order?.priceSummary?.subtotal}</span>
        </div>
        <div className="">
          <span className="font-medium">Payment Status: </span>
          <span>{order?.paymentStatus}</span>
        </div>
        <div className="">
          <span className="font-medium">Order Status: </span>
          <span>{order?.status}</span>
        </div>
        <div className="">
          <span className="font-medium">Delivery Address: </span>
          <span>
            {order?.billingInfo?.address?.addressLine1 + " "}
            {order?.billingInfo?.address?.city}
          </span>
        </div>
      </div>
      </div>
      <Link href="/" className="underline mt-6">
        Have a problem? Contact us
      </Link>
    </div>
  );
};

export default OrderPage;
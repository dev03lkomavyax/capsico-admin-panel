import { createOrder, verifyPayment } from "@/utils/payment";

const RazorpayPayment = () => {
  const handlePayment = async () => {
    try {
      // 1️⃣ Create order
      const { data } = await createOrder({
        orderId: "694a273f0650474094425bde",
      });

      console.log("data", data);
     
      const order = data.razorpayOrder;

      // 2️⃣ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "My App",
        description: "Test Transaction",
        order_id: order.id,

        handler: async function (response) {
          console.log("Razorpay Response:", response);
          // 3️⃣ Verify payment
          const verifyRes = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: data.orderId,
          });

          if (verifyRes.data.success) {
            alert("Payment Successful");
          }
        },

        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: "Gaurav Kumar", //your customer's name
          email: "gaurav.kumar@example.com",
          contact: "9876543210", //Provide the customer's phone number for better conversion rates
        },

        theme: {
          color: "#3399cc",
        },
      };

      // 4️⃣ Open Razorpay Checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Pay Now
    </button>
  );
};

export default RazorpayPayment;

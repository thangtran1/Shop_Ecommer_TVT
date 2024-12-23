import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { apiCreateOrder } from "../../apis/product";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const style = { layout: "vertical" };
const ButtonWrapper = ({
  currency,
  showSpinner,
  amount,
  payload,
  setIsSuccess,
}) => {
  const navigate = useNavigate();
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);
  const handleCreateOrder = async (payload, address) => {
    const response = await apiCreateOrder({
      ...payload,
      status: "Success",
      address,
    });
    if (response.success) {
      setIsSuccess(true);
      setTimeout(() => {
        Swal.fire({
          title: "Success",
          text: "Order created successfully",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      }, 1000);
    }
  };
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, amount, currency]}
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    value: amount,
                    currency_code: currency,
                  },
                },
              ],
            })
            .then((orderId) => {
              return orderId;
            })
        }
        onApprove={(data, actions) =>
          actions.order.capture().then(async (response) => {
            if (response.status === "COMPLETED") {
              handleCreateOrder(payload, response.payer.email_address);
            }
          })
        }
      />
    </>
  );
};

export default function Paypal({ amount, payload, setIsSuccess }) {
  return (
    <div style={{ maxWidth: "auto", minHeight: "auto", margin: "0 auto" }}>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper
          currency="USD"
          showSpinner={false}
          amount={amount}
          payload={payload}
          setIsSuccess={setIsSuccess}
        />
      </PayPalScriptProvider>
    </div>
  );
}

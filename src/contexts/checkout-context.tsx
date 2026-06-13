/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";
import type { Address, Checkout, ShippingCost, Coupon } from "@/types/checkout";
import type { Bank, Ewallet } from "@/types/payment-method";
import { useLocation } from "react-router";

// Action type
type CheckoutAction =
  | { type: "SET_CHECKOUT"; payload: Checkout | null }
  | { type: "SET_ADDRESS"; payload: Address | null }
  | { type: "SET_SHIPPING"; payload: ShippingCost | null }
  | { type: "SET_SHIPPING_COSTS"; payload: ShippingCost[] | [] }
  | { type: "SET_COUPON"; payload: Coupon | null }
  | { type: "SET_PAYMENT_METHOD"; payload: string }
  | { type: "SET_BANK"; payload: Bank | null }
  | { type: "SET_EWALLET"; payload: Ewallet | null }
  | { type: "SET_NOTE"; payload: string }
  | { type: "RESET" }
  | { type: "SET_LOADING_SHIPPING_COSTS"; payload: boolean };

// State type
interface CheckoutState {
  checkout: Checkout | null;
  address: Address | null;
  shipping: ShippingCost | null;
  shippingCosts: ShippingCost[] | [];
  paymentMethod: string;
  bank: Bank | null;
  ewallet: Ewallet | null;
  note: string;
  isLoadingShippingCosts: boolean;
  coupon: Coupon | null;
}

// Initial state
const initialState: CheckoutState = {
  checkout: null,
  address: null,
  shipping: null,
  shippingCosts: [],
  paymentMethod: "",
  bank: null,
  ewallet: null,
  note: "",
  isLoadingShippingCosts: false,
  coupon: null,
};

// Reducer
const cartReducer = (
  state: CheckoutState,
  action: CheckoutAction
): CheckoutState => {
  switch (action.type) {
    case "SET_CHECKOUT":
      return {
        ...state,
        checkout: action.payload,
        address: action.payload?.shipping_address || null,
        shippingCosts: action.payload?.shipping_methods || [],
        coupon: action.payload?.coupon || null,
      };
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_SHIPPING":
      return { ...state, shipping: action.payload };
    case "SET_SHIPPING_COSTS":
      return { ...state, shippingCosts: action.payload };
    case "SET_PAYMENT_METHOD":
      return { ...state, paymentMethod: action.payload };
    case "SET_BANK":
      return { ...state, bank: action.payload };
    case "SET_EWALLET":
      return { ...state, ewallet: action.payload };
    case "SET_NOTE":
      return { ...state, note: action.payload };
    case "SET_COUPON":
      return { ...state, coupon: action.payload };
    case "RESET":
      return initialState;
    case "SET_LOADING_SHIPPING_COSTS":
      return { ...state, isLoadingShippingCosts: action.payload };
    default:
      throw new Error("Invalid action type");
  }
};

// Custom Hooks
export function useCheckoutState(): CheckoutState {
  const context = useContext(CheckoutStateContext);
  if (!context) {
    throw new Error("useCheckoutState must be used within a CheckoutProvider");
  }
  return context;
}

export function useCheckoutDispatch(): React.Dispatch<CheckoutAction> {
  const context = useContext(CheckoutDispatchContext);
  if (!context) {
    throw new Error(
      "useCheckoutDispatch must be used within a CheckoutProvider"
    );
  }
  return context;
}

// Context
const CheckoutStateContext = createContext<CheckoutState | undefined>(
  undefined
);
const CheckoutDispatchContext = createContext<
  React.Dispatch<CheckoutAction> | undefined
>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: "SET_CHECKOUT", payload: location.state?.checkout });
  }, [location.state?.checkout]);

  return (
    <CheckoutStateContext.Provider value={state}>
      <CheckoutDispatchContext.Provider value={dispatch}>
        {children}
      </CheckoutDispatchContext.Provider>
    </CheckoutStateContext.Provider>
  );
};

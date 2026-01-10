import { BrowserRouter, Route, Routes } from "react-router";
import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { AuthProvider } from "@/contexts/AuthContext.tsx";
import { CartProvider } from "@/contexts/CartContext.tsx";
import { WishlistProvider } from "@/contexts/WishlistContext.tsx";
import { CheckoutProvider } from "@/contexts/CheckoutContext.tsx";
import Loading from "@/components/ui/loading";
import "bootstrap";
import "@/styles/style.scss";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { env } from "@/config/env";
import { subscribeToForegroundMessages } from "@/lib/firebase";

const Landing = lazy(() => import("@/pages/Landing"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Product = lazy(() => import("@/pages/Product"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const VerifyLogin = lazy(() => import("@/pages/VerifyLogin"));
const Cart = lazy(() => import("@/pages/Cart"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));
const Profile = lazy(() => import("@/pages/Profile"));
const Order = lazy(() => import("@/pages/Order"));
const ChangePassword = lazy(() => import("@/pages/ChangePassword"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogDetail = lazy(() => import("@/pages/BlogDetail"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const OrderDetail = lazy(() => import("@/pages/OrderDetail"));
const Contact = lazy(() => import("@/pages/Contact"));
const About = lazy(() => import("@/pages/About"));
const Faq = lazy(() => import("@/pages/Faq"));
const Help = lazy(() => import("@/pages/Help"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const FlashSale = lazy(() => import("@/pages/FlashSale"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      onError(error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || error.message);
        } else {
          toast.error(error.message || "Something went wrong");
        }
      },
      retry: false,
    },
  },
});

function App() {
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let mounted = true;

    subscribeToForegroundMessages((payload) => {
      const notification = payload.notification ?? {};
      const title = notification.title || "JAF Parfum's";
      const body = notification.body;
      const tag = payload.collapseKey || payload.messageId || undefined;

      if ("Notification" in window && Notification.permission === "granted") {
        navigator.serviceWorker.ready
          .then((registration) => {
            if (!registration) {
              throw new Error("Service worker registration belum siap.");
            }

            const notificationOptions: NotificationOptions = {
              body,
              icon: notification.icon || "/images/favicon-96x96.png",
              data: payload.data,
              tag,
            };

            if (notification.image) {
              (
                notificationOptions as NotificationOptions & {
                  image?: string;
                }
              ).image = notification.image;
            }

            if (tag) {
              (
                notificationOptions as NotificationOptions & {
                  renotify?: boolean;
                }
              ).renotify = true;
            }

            return registration.showNotification(title, notificationOptions);
          })
          .catch((error) => {
            console.error(
              "[Firebase] Gagal menampilkan Chrome notification:",
              error,
              payload
            );
          });
      } else {
        console.warn(
          "[Firebase] Notifikasi foreground diterima tetapi izin belum granted atau Notification API tidak tersedia.",
          payload
        );
      }
    })
      .then((unsub) => {
        if (!mounted) {
          unsub();
          return;
        }
        unsubscribe = unsub;
      })
      .catch((error) => {
        console.error("Failed to subscribe to foreground messages", error);
      });

    return () => {
      mounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const handleSwMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== "object") {
        return;
      }

      if (data.type === "FCM_NOTIFICATION_SHOWN") {
        console.info("[Firebase] Notifikasi OS ditampilkan:", data);
      } else if (data.type === "FCM_NOTIFICATION_ERROR") {
        console.error("[Firebase] Gagal menampilkan notifikasi OS:", data);
      }
    };

    navigator.serviceWorker.addEventListener("message", handleSwMessage);
    return () => {
      navigator.serviceWorker.removeEventListener("message", handleSwMessage);
    };
  }, []);

  return (
    <>
      <ToastContainer
        limit={10}
        theme="colored"
        position="top-right"
        closeButton={false}
        autoClose={1000}
        pauseOnHover={false}
        hideProgressBar={true}
        newestOnTop
      />

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <CheckoutProvider>
                  <Suspense fallback={<Loading className="min-dvh-100" />}>
                    <ThemeProvider>
                      <GoogleOAuthProvider
                        clientId={env.GOOGLE_CLIENT_ID || ""}
                      >
                        <Routes>
                          <Route path="*" element={<NotFound />} />
                          <Route index element={<Landing />} />
                          <Route path="flash-sale" element={<FlashSale />} />
                          <Route path="products" element={<Product />} />
                          <Route
                            path="products/:slug"
                            element={<ProductDetail />}
                          />
                          <Route path="blog" element={<Blog />} />
                          <Route path="blog/:slug" element={<BlogDetail />} />
                          <Route path="contact" element={<Contact />} />
                          <Route path="about" element={<About />} />
                          <Route path="faq" element={<Faq />} />
                          <Route path="help" element={<Help />} />

                          {/* Protected Routes */}
                          <Route element={<ProtectedRoute />}>
                            <Route path="cart" element={<Cart />} />
                            <Route path="checkout" element={<Checkout />} />
                            <Route
                              path="account/profile"
                              element={<Profile />}
                            />
                            <Route path="account/orders" element={<Order />} />
                            <Route
                              path="account/orders/:id"
                              element={<OrderDetail />}
                            />
                            <Route
                              path="account/wishlist"
                              element={<Wishlist />}
                            />
                            <Route
                              path="account/change-password"
                              element={<ChangePassword />}
                            />
                            <Route
                              path="account/notifications"
                              element={<Notifications />}
                            />
                          </Route>

                          {/* Auth */}
                          <Route path="auth/login" element={<Login />} />
                          <Route
                            path="auth/verify-login"
                            element={<VerifyLogin />}
                          />
                          <Route path="auth/register" element={<Register />} />
                          <Route
                            path="auth/reset-password"
                            element={<ResetPassword />}
                          />
                          <Route
                            path="auth/forgot-password"
                            element={<ForgotPassword />}
                          />
                          {/* Auth */}
                        </Routes>
                      </GoogleOAuthProvider>
                    </ThemeProvider>
                  </Suspense>
                </CheckoutProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;

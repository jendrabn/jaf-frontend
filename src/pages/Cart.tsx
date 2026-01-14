import Layout from "@/components/layouts/Layout";
import { useNavigate } from "react-router";
import { useCheckoutState } from "@/features/checkout/api";
import { formatCurrency } from "@/utils/format";
import { Button, Form } from "react-bootstrap";
import { useDeleteCart } from "@/features/carts/api";
import CartItem from "@/features/carts/components/CartItem";
import { useCartDispatch, useCartState } from "@/contexts/CartContext";
import EmptyState from "@/components/ui/empty-state";
import SEO from "@/components/SEO";
import { paths } from "@/config/paths";
import PageHeader from "@/components/layouts/PageHeader";

const Cart = () => {
  const navigate = useNavigate();
  const { carts, selectedIds, totalItem, totalPrice } = useCartState();
  const dispatch = useCartDispatch();
  const checkoutMutation = useCheckoutState();
  const deleteCartMutation = useDeleteCart();

  const handleCheckout = () => {
    checkoutMutation.mutate(
      { data: { cart_ids: selectedIds } },
      {
        onSuccess(data) {
          navigate(paths.checkout.root(), {
            state: { checkout: data },
            replace: true,
          });
        },
      }
    );
  };

  const handleSelectAll = () => {
    dispatch({ type: "SELECT_ALL" });
  };

  const handleDeleteSelected = () => {
    deleteCartMutation.mutate(
      { data: { cart_ids: selectedIds } },
      {
        onSuccess() {
          dispatch({ type: "DELETE_SELECTED" });
        },
      }
    );
  };

  return (
    <Layout>
      <SEO
        title="Keranjang Belanja"
        description="Keranjang belanja Anda"
        noIndex={true}
        noFollow={true}
      />

      <div className="container cart-layout">
        <PageHeader title="Keranjang Belanja" align="start" />

        {carts.length === 0 && (
          <EmptyState
            title="Keranjang Kosong"
            message="Ayo tambahkan parfum favoritmu!"
            iconClass="bi bi-cart"
            iconSize="3rem"
          />
        )}

        {carts.length > 0 && (
          <>
            {/* Dekstop */}
            <div className="cart-list-head d-none d-lg-grid">
              <div className="cart-cell cart-cell-check">
                <Form.Check
                  type="checkbox"
                  checked={
                    selectedIds.length > 0 &&
                    selectedIds.length === carts.length
                  }
                  onChange={handleSelectAll}
                />
              </div>
              <div className="cart-cell cart-cell-product">Produk</div>
              <div className="cart-cell cart-cell-price text-center">
                Harga Satuan
              </div>
              <div className="cart-cell cart-cell-qty text-center">
                Kuantitas
              </div>
              <div className="cart-cell cart-cell-total text-center">Total</div>
              <div className="cart-cell cart-cell-action text-center">Aksi</div>
            </div>

            <div className="d-flex flex-column">
              {carts.map((cart) => (
                <CartItem key={`cart-item-${cart.id}`} cart={cart} />
              ))}
            </div>

            {/* Dekstop Only */}
            <div className="cart-summary d-none d-lg-flex">
              <div className="cart-summary-left">
                <Button
                  variant="outline-danger"
                  onClick={handleDeleteSelected}
                  disabled={
                    selectedIds.length === 0 || deleteCartMutation.isPending
                  }
                >
                  Hapus
                </Button>
              </div>
              <div className="cart-summary-right">
                <div className="cart-summary-total">
                  <span className="text-body-secondary">Total item</span>
                  <strong>{totalItem}</strong>
                </div>
                <div className="cart-summary-total cart-summary-total-price">
                  <span className="text-body-secondary">Total harga</span>
                  <strong>{formatCurrency(totalPrice as number)}</strong>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  disabled={
                    selectedIds.length === 0 || checkoutMutation.isPending
                  }
                  onClick={handleCheckout}
                >
                  {checkoutMutation.isPending ? "Loading..." : "Checkout"}
                </Button>
              </div>
            </div>
            {/* End Dekstop Only */}

            {/* Mobile Only */}
            <div className="cart-mobile d-lg-none">
              <div className="cart-mobile-bar">
                <Form.Check
                  type="checkbox"
                  checked={
                    selectedIds.length > 0 &&
                    selectedIds.length === carts.length
                  }
                  onChange={handleSelectAll}
                  label="Pilih Semua"
                />

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleDeleteSelected}
                  disabled={
                    selectedIds.length === 0 || deleteCartMutation.isPending
                  }
                >
                  Hapus
                </Button>
              </div>

              <div className="cart-mobile-total">
                <span>Total item</span>
                <strong>{totalItem}</strong>
              </div>
              <div className="cart-mobile-total cart-mobile-total-price">
                <span>Total harga</span>
                <strong>{formatCurrency(totalPrice as number)}</strong>
              </div>

              <div className="d-grid">
                <Button
                  variant="primary"
                  disabled={
                    selectedIds.length === 0 || checkoutMutation.isPending
                  }
                  onClick={handleCheckout}
                >
                  {checkoutMutation.isPending ? "Loading..." : "Checkout"}
                </Button>
              </div>
            </div>
            {/* End Mobile Only */}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cart;

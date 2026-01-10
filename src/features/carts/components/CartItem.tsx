import { Button, Form } from "react-bootstrap";
import { Link } from "react-router";
import type { CartItemTypes } from "@/types/cart";
import { formatCurrency } from "@/utils/format";
import ProductImage from "@/features/products/components/ProductImage";
import QuantityInput from "@/components/ui/quantity-input";
import { useUpdateCart, useDeleteCart } from "@/features/carts/api";
import { useCartDispatch, useCartState } from "@/contexts/CartContext";
import { getProductPricingInfo } from "@/utils/pricing";
import { paths } from "@/config/paths";

interface CartItemProps {
  cart: CartItemTypes;
}

function CartItem({ cart }: CartItemProps) {
  const { selectedIds } = useCartState();
  const dispatch = useCartDispatch();
  const updateCartMutation = useUpdateCart();
  const deleteCartMutation = useDeleteCart();

  const { id, product, quantity } = cart;

  const pricing = getProductPricingInfo(product);
  const unitPrice = pricing.currentPrice ?? product.price;
  const subtotal = unitPrice * quantity;
  const originalSubtotal =
    (pricing.strikeThroughPrice ?? product.price) * quantity;
  const showStrikeThrough =
    Boolean(pricing.strikeThroughPrice) &&
    pricing.strikeThroughPrice !== unitPrice;
  const discountLabel =
    pricing.discountPercent && pricing.discountPercent > 0
      ? `-${pricing.discountPercent}%`
      : null;

  const handleSelect = () => {
    dispatch({ type: "SELECT", payload: id });
  };

  const handleDelete = () => {
    deleteCartMutation.mutate(
      { data: { cart_ids: [id] } },
      {
        onSuccess() {
          dispatch({ type: "DELETE", payload: id });
        },
      }
    );
  };

  const handleUpdate = (quantity: number) => {
    updateCartMutation.mutate(
      {
        id,
        data: { quantity },
      },
      {
        onSuccess() {
          dispatch({ type: "UPDATE", payload: { id, quantity } });
        },
      }
    );
  };

  return (
    <>
      {/* Desktop */}
      <div className="cart-row d-none d-lg-grid">
        <div className="cart-cell cart-cell-check">
          <Form.Check
            type="checkbox"
            checked={selectedIds.includes(id)}
            onChange={handleSelect}
          />
        </div>

        <div className="cart-cell cart-cell-product">
          <Link
            to={paths.products.detail(product.slug)}
            className="cart-product-link"
          >
            <ProductImage
              url={product.image}
              alt={product.name}
              className="cart-product-image"
            />
          </Link>
          <Link
            to={paths.products.detail(product.slug)}
            className="cart-product-name cart-product-link"
          >
            {product.name}
          </Link>
        </div>

        <div className="cart-cell cart-cell-price text-center text-body-secondary">
          {showStrikeThrough ? (
            <div className="d-flex flex-column align-items-center">
              <span>{formatCurrency(unitPrice)}</span>
              <small className="text-gray-600">
                (
                <span className="text-decoration-line-through text-muted">
                  {formatCurrency(pricing.strikeThroughPrice ?? product.price)}
                </span>
                {discountLabel && <span className="ms-1">{discountLabel}</span>}
                )
              </small>
            </div>
          ) : (
            formatCurrency(unitPrice)
          )}
        </div>

        <div className="cart-cell cart-cell-qty text-center">
          <QuantityInput
            onChange={(quantity) => handleUpdate(quantity)}
            maxValue={product.stock}
            initialValue={quantity}
            size="sm"
            disabled={updateCartMutation.isPending}
          />
        </div>

        <div className="cart-cell cart-cell-total text-center fw-semibold">
          {showStrikeThrough ? (
            <div className="d-flex flex-column align-items-center">
              <span>{formatCurrency(subtotal)}</span>
              <small className="text-gray-600">
                (
                <span className="text-decoration-line-through text-muted">
                  {formatCurrency(originalSubtotal)}
                </span>
                {discountLabel && <span className="ms-1">{discountLabel}</span>}
                )
              </small>
            </div>
          ) : (
            formatCurrency(subtotal)
          )}
        </div>

        <div className="cart-cell cart-cell-action text-center">
          <Button variant="outline-danger" size="sm" onClick={handleDelete}>
            <i className="bi bi-trash"></i>
          </Button>
        </div>
      </div>

      {/* Mobile */}
      <div className="cart-row-mobile d-lg-none">
        <div className="cart-row-mobile-check">
          <Form.Check
            type="checkbox"
            checked={selectedIds.includes(id)}
            onChange={handleSelect}
          />
        </div>

        <div className="cart-row-mobile-image">
          <Link
            to={paths.products.detail(product.slug)}
            className="cart-product-link"
          >
            <ProductImage
              url={product.image}
              alt={product.name}
              width={60}
              className="cart-product-image"
            />
          </Link>
        </div>

        <div className="cart-row-mobile-info">
          <Link
            to={paths.products.detail(product.slug)}
            className="cart-product-name cart-product-link mb-1 line-clamp-2"
          >
            {product.name}
          </Link>
          <p className="mb-1 text-body-secondary">
            {showStrikeThrough ? (
              <>
                <span className="text-danger me-2">
                  {formatCurrency(unitPrice)}
                </span>
                <small className="text-gray-600">
                  (
                  <span className="text-decoration-line-through text-muted">
                    {formatCurrency(
                      pricing.strikeThroughPrice ?? product.price
                    )}
                  </span>
                  {discountLabel && (
                    <span className="ms-1">{discountLabel}</span>
                  )}
                  )
                </small>
              </>
            ) : (
              formatCurrency(unitPrice)
            )}
          </p>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <QuantityInput
                onChange={(quantity) => handleUpdate(quantity)}
                maxValue={product.stock}
                initialValue={quantity}
                size="sm"
                disabled={updateCartMutation.isPending}
              />
            </div>
            <div>
              <Button variant="outline-danger" size="sm" onClick={handleDelete}>
                <i className="bi bi-trash"></i>
              </Button>
            </div>
          </div>
          <p className="mb-0 text-end fw-semibold">
            {showStrikeThrough ? (
              <>
                <span>{formatCurrency(subtotal)}</span>
                <small className="text-gray-600 ms-2">
                  (
                  <span className="text-decoration-line-through text-muted">
                    {formatCurrency(originalSubtotal)}
                  </span>
                  {discountLabel && (
                    <span className="ms-1">{discountLabel}</span>
                  )}
                  )
                </small>
              </>
            ) : (
              formatCurrency(subtotal)
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default CartItem;

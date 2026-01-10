import { Button, Form } from "react-bootstrap";
import { Link } from "react-router";
import type { WishlistTypes } from "@/types/wishlist";
import { formatCurrency } from "@/utils/format";
import ProductImage from "@/features/products/components/ProductImage";
import {
  useWishlistDispatch,
  useWishlistState,
} from "@/contexts/WishlistContext";
import { useDeleteWishlist } from "@/features/wishlist/api";
import { useCreateCart } from "@/features/carts/api";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constans";
import { paths } from "@/config/paths";

interface WishlistItemProps {
  item: WishlistTypes;
}

const WishlistItem = (props: WishlistItemProps) => {
  const {
    item: { id, product },
  } = props;

  const { price, price_after_discount, is_discounted, discount_in_percent } =
    product;

  const isDiscounted = Boolean(is_discounted && price_after_discount != null);
  const currentPrice = isDiscounted ? price_after_discount ?? price : price;

  const discountPercent =
    typeof discount_in_percent === "number"
      ? Math.max(Math.round(discount_in_percent), 0)
      : price > 0 && price_after_discount != null
      ? Math.max(Math.round(((price - price_after_discount) / price) * 100), 0)
      : null;

  const discountLabel =
    discountPercent && discountPercent > 0 ? `-${discountPercent}%` : null;
  const { selectedIds } = useWishlistState();
  const dispatch = useWishlistDispatch();
  const queryClient = useQueryClient();
  const deleteWishlistMutation = useDeleteWishlist();
  const createCartMutation = useCreateCart();

  const handleSelect = () => {
    dispatch({
      type: "SELECT",
      payload: id,
    });
  };

  const handleDelete = () => {
    deleteWishlistMutation.mutate(
      { data: { wishlist_ids: [id] } },
      {
        onSuccess: () => {
          dispatch({
            type: "DELETE",
            payload: id,
          });
        },
      }
    );
  };

  const handleMoveToCart = () => {
    createCartMutation.mutate(
      { data: { product_id: product.id, quantity: 1 } },
      {
        onSuccess: () => {
          toast.success("Berhasil ditambahkan ke keranjang.");

          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CARTS] });

          handleDelete();
        },
      }
    );
  };

  return (
    <>
      {/* Mobile Only */}
      <div className="wishlist-row-mobile d-lg-none">
        <div className="wishlist-row-mobile-check">
          <Form.Check
            type="checkbox"
            onChange={handleSelect}
            checked={selectedIds.includes(id)}
          />
        </div>
        <div className="wishlist-row-mobile-image">
          <Link
            to={paths.products.detail(product.slug)}
            className="cart-product-link"
          >
            <ProductImage url={product.image} alt={product.name} />
          </Link>
        </div>
        <div className="wishlist-row-mobile-info">
          <Link
            to={paths.products.detail(product.slug)}
            className="cart-product-name cart-product-link mb-1 line-clamp-2"
          >
            {product.name}
          </Link>
          <p className="mb-1 text-body-secondary">
            {isDiscounted ? (
              <>
                <span className="text-danger me-2">
                  {formatCurrency(currentPrice)}
                </span>
                <small className="text-gray-600">
                  (
                  <span className="text-decoration-line-through text-muted">
                    {formatCurrency(price)}
                  </span>
                  {discountLabel && (
                    <span className="ms-1">{discountLabel}</span>
                  )}
                  )
                </small>
              </>
            ) : (
              formatCurrency(currentPrice)
            )}
          </p>
          <div className="d-flex gap-2 align-items-center justify-content-end">
            <Button variant="outline-danger" size="sm" onClick={handleDelete}>
              <i className="bi bi-trash"></i>
            </Button>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleMoveToCart}
            >
              <i className="bi bi-cart-plus"></i>
            </Button>
          </div>
        </div>
      </div>
      {/* End Mobile Only */}

      {/* Desktop Only */}
      <div className="wishlist-row d-none d-lg-grid">
        <div className="wishlist-cell wishlist-cell-check">
          <Form.Check
            type="checkbox"
            onChange={handleSelect}
            checked={selectedIds.includes(id)}
          />
        </div>
        <div className="wishlist-cell wishlist-cell-product">
          <Link
            to={paths.products.detail(product.slug)}
            className="cart-product-link"
          >
            <ProductImage
              width={60}
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
        <div className="wishlist-cell wishlist-cell-price text-center text-body-secondary">
          {isDiscounted ? (
            <div className="d-flex flex-column align-items-center">
              <span>{formatCurrency(currentPrice)}</span>
              <small className="text-gray-600">
                (
                <span className="text-decoration-line-through text-muted">
                  {formatCurrency(price)}
                </span>
                {discountLabel && <span className="ms-1">{discountLabel}</span>}
                )
              </small>
            </div>
          ) : (
            formatCurrency(currentPrice)
          )}
        </div>

        <div className="wishlist-cell wishlist-cell-action text-center">
          <Button
            variant="outline-danger"
            size="sm"
            className="me-2"
            onClick={handleDelete}
          >
            <i className="bi bi-trash"></i>
          </Button>

          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleMoveToCart}
          >
            <i className="bi bi-cart-plus"></i>
          </Button>
        </div>
      </div>
      {/* End Desktop Only */}
    </>
  );
};

export default WishlistItem;

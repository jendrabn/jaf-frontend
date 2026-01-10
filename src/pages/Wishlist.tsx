import AccountLayout from "@/components/layouts/AccountLayout";
import {
  useWishlistDispatch,
  useWishlistState,
} from "@/contexts/WishlistContext";
import { Button, Form } from "react-bootstrap";
import WishlistItem from "@/features/wishlist/components/WishlistItem";
import { useDeleteWishlist } from "@/features/wishlist/api";
import NoData from "@/components/ui/no-data";
import SEO from "@/components/SEO";

const Wishlist = () => {
  const deleteWishlistMutation = useDeleteWishlist();
  const { wishlists, selectedIds } = useWishlistState();
  const dispatch = useWishlistDispatch();

  const handleSelectAll = () => {
    dispatch({ type: "SELECT_ALL" });
  };

  const handleDeleteSelected = () => {
    deleteWishlistMutation.mutate(
      { data: { wishlist_ids: selectedIds } },
      {
        onSuccess: () => {
          dispatch({ type: "DELETE_SELECTED" });
        },
      }
    );
  };

  return (
    <AccountLayout title="Wishlist">
      <SEO
        title="Wishlist Saya"
        description="Lihat dan kelola daftar keinginan produk favorit Anda di sini."
        noIndex={true}
        noFollow={true}
      />

      {wishlists && wishlists?.length === 0 && (
        <NoData
          title="Wishlist Kosong"
          message="Tambahkan parfum favorit Anda ke daftar keinginan agar mudah ditemukan nanti."
        />
      )}

      {wishlists && wishlists?.length > 0 && (
        <>
          {/* Desktop Only */}
          <div className="wishlist-list-head d-none d-lg-grid">
            <div className="wishlist-cell wishlist-cell-check">
              <Form.Check
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedIds.length === wishlists.length}
              />
            </div>
            <div className="wishlist-cell wishlist-cell-product text-start">
              Produk
            </div>
            <div className="wishlist-cell wishlist-cell-price text-center">
              Harga
            </div>
            <div className="wishlist-cell wishlist-cell-action text-center">
              Aksi
            </div>
          </div>
          {/* End Desktop Only */}

          <div className="d-flex flex-column">
            {wishlists?.map((item) => (
              <WishlistItem key={`wishlist-item-${item.id}`} item={item} />
            ))}
          </div>

          {/* Mobile Only */}
          <div className="wishlist-mobile-bar d-lg-none">
            <Form.Check
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectedIds.length === wishlists.length}
              label="Select All"
            />
            <Button
              variant="outline-danger"
              size="sm"
              disabled={selectedIds.length === 0}
              onClick={handleDeleteSelected}
            >
              Hapus
            </Button>
          </div>
          {/* End Mobile Only */}

          {/* Desktop Only */}
          <div className="wishlist-actions d-none d-lg-flex">
            <Button
              variant="outline-danger"
              disabled={selectedIds.length === 0}
              onClick={handleDeleteSelected}
            >
              Hapus
            </Button>
          </div>
          {/* End Desktop Only */}
        </>
      )}
    </AccountLayout>
  );
};

export default Wishlist;

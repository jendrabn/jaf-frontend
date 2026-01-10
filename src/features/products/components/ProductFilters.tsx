import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import {
  useGetProductBrands,
  useGetProductCategories,
} from "@/features/products/api";
import type { ProductParamsTypes } from "@/types/product";
import useFilters from "@/hooks/use-filters";
import { SEXS } from "@/utils/constans";

const ProductFilters = () => {
  const { params, setFilter, clearFilters } = useFilters<ProductParamsTypes>();

  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const { data: categories, isLoading: isLoadingCategories } =
    useGetProductCategories();
  const { data: brands, isLoading: isLoadingBrands } = useGetProductBrands();
  const hasMoreCategories = (categories?.length ?? 0) > 5;
  const hasMoreBrands = (brands?.length ?? 0) > 5;
  const visibleCategories = showAllCategories
    ? categories
    : categories?.slice(0, 5);
  const visibleBrands = showAllBrands ? brands : brands?.slice(0, 5);

  return (
    <aside>
      <div className="product-filters blog-sidebar d-flex flex-column gap-4">
        <div className="sidebar-section d-flex flex-column gap-3">
          <div className="sidebar-section-title">Kategori</div>

          {isLoadingCategories ? (
            <div className="d-flex align-items-center gap-2 text-body-secondary">
              <Spinner animation="border" size="sm" />
              <span>Memuat...</span>
            </div>
          ) : visibleCategories?.length ? (
            <>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                {visibleCategories.map((category) => (
                  <li key={`category-${category.id}`}>
                    <span
                      role="button"
                      className={
                        category.id == params.category_id
                          ? "text-primary fw-bold"
                          : "text-dark-emphasis"
                      }
                      onClick={() => setFilter("category_id", category.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {category.name}
                    </span>
                  </li>
                ))}
              </ul>

              {hasMoreCategories && (
                <button
                  type="button"
                  className="sidebar-toggle"
                  onClick={() => setShowAllCategories((value) => !value)}
                >
                  {showAllCategories
                    ? "Lihat lebih sedikit"
                    : "Lihat lebih banyak"}
                </button>
              )}
            </>
          ) : (
            <div className="text-body-secondary">Belum ada data.</div>
          )}
        </div>

        <div className="sidebar-section d-flex flex-column gap-3">
          <div className="sidebar-section-title">Brand</div>

          {isLoadingBrands ? (
            <div className="d-flex align-items-center gap-2 text-body-secondary">
              <Spinner animation="border" size="sm" />
              <span>Memuat...</span>
            </div>
          ) : visibleBrands?.length ? (
            <>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                {visibleBrands.map((brand) => (
                  <li key={`brand-${brand.id}`}>
                    <span
                      role="button"
                      className={
                        brand.id == params.brand_id
                          ? "text-primary fw-bold"
                          : "text-dark-emphasis"
                      }
                      onClick={() => setFilter("brand_id", brand.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {brand.name}
                    </span>
                  </li>
                ))}
              </ul>

              {hasMoreBrands && (
                <button
                  type="button"
                  className="sidebar-toggle"
                  onClick={() => setShowAllBrands((value) => !value)}
                >
                  {showAllBrands ? "Lihat lebih sedikit" : "Lihat lebih banyak"}
                </button>
              )}
            </>
          ) : (
            <div className="text-body-secondary">Belum ada data.</div>
          )}
        </div>

        <div className="sidebar-section d-flex flex-column gap-3">
          <div className="sidebar-section-title">Batas Harga</div>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Min"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value.replace(/[^0-9]/g, ""))
              }
            />

            <span className="input-group-text">&mdash;</span>

            <input
              type="text"
              className="form-control"
              placeholder="Maks"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value.replace(/[^0-9]/g, ""))
              }
            />
          </div>

          <div className="d-grid">
            <Button
              variant="outline-primary"
              onClick={() => {
                setFilter("min_price", minPrice);
                setFilter("max_price", maxPrice);
              }}
            >
              Terapkan
            </Button>
          </div>
        </div>

        <div className="sidebar-section d-flex flex-column gap-3">
          <div className="sidebar-section-title">Gender</div>
          <div className="d-flex flex-column gap-2">
            {Object.keys(SEXS).map((sex) => (
              <div className="form-check" key={`sex-${sex}`}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={sex}
                  id={sex}
                  checked={Number(sex) == params.sex}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilter("sex", e.target.value);
                    } else {
                      clearFilters("sex");
                    }
                  }}
                />
                <label className="form-check-label" htmlFor={sex}>
                  {SEXS[Number(sex)]}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="d-grid">
          <Button
            variant="outline-danger"
            onClick={() => {
              clearFilters(
                "category_id",
                "brand_id",
                "min_price",
                "max_price",
                "sex"
              );

              setMinPrice("");
              setMaxPrice("");
            }}
          >
            Hapus Semua
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default ProductFilters;

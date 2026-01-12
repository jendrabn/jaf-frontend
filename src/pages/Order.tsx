import AccountLayout from "@/components/layouts/AccountLayout";
import { useGetOrders } from "@/features/orders/api";
import Pagination from "@/components/ui/pagination";
import useFilters from "@/hooks/use-filters";
import { useState } from "react";
import OrderItem from "@/features/orders/components/OrderItem";
import Loading from "@/components/ui/loading";
import { ORDER_STATUSES } from "@/utils/constans";
import ConfirmOrderReceivedModal from "@/features/orders/components/ConfirmOrderReceivedModal";
import { Alert, Dropdown } from "react-bootstrap";
import NoData from "@/components/ui/no-data";

import SEO from "@/components/SEO";

type OrderStatusKey = keyof typeof ORDER_STATUSES;

const statusOptions = [
  { value: "", label: "Semua Status" },
  ...Object.keys(ORDER_STATUSES).map((status) => ({
    value: status,
    label: ORDER_STATUSES[status as OrderStatusKey],
  })),
];

const sortOptions = [
  { value: "", label: "Default" },
  { value: "newest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
];

const getStatusLabel = (value?: string) =>
  statusOptions.find((option) => option.value === (value ?? ""))?.label ??
  "Semua Status";

const getSortLabel = (value?: string) =>
  sortOptions.find((option) => option.value === (value ?? ""))?.label ??
  "Default";

const StatusDropdown = ({
  value,
  onSelect,
  className,
}: {
  value?: string;
  onSelect: (value: string) => void;
  className?: string;
}) => (
  <Dropdown
    onSelect={(eventKey) => onSelect(eventKey ?? "")}
    className={className}
  >
    <Dropdown.Toggle variant="outline-dark" className="w-100">
      {getStatusLabel(value)}
    </Dropdown.Toggle>
    <Dropdown.Menu className="w-100">
      {statusOptions.map((option) => (
        <Dropdown.Item
          key={option.value || "all"}
          eventKey={option.value}
          active={(value ?? "") === option.value}
        >
          {option.label}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

const SortDropdown = ({
  value,
  onSelect,
  className,
}: {
  value?: string;
  onSelect: (value: string) => void;
  className?: string;
}) => (
  <Dropdown
    onSelect={(eventKey) => onSelect(eventKey ?? "")}
    className={className}
  >
    <Dropdown.Toggle variant="outline-dark" className="w-100">
      {getSortLabel(value)}
    </Dropdown.Toggle>
    <Dropdown.Menu className="w-100">
      {sortOptions.map((option) => (
        <Dropdown.Item
          key={option.value || "default"}
          eventKey={option.value}
          active={(value ?? "") === option.value}
        >
          {option.label}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

const Order = () => {
  const { setFilter, clearFilters, params } = useFilters();
  const { data: orders, isLoading } = useGetOrders(params);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [showConfirmOrderReceivedModal, setShowConfirmOrderReceivedModal] =
    useState(false);

  const handleShowConfirmOrderReceivedModal = (orderId: number) => {
    setSelectedOrderId(orderId);
    setShowConfirmOrderReceivedModal(true);
  };

  const handleCloseConfirmOrderDeliveredModal = () => {
    setSelectedOrderId(null);
    setShowConfirmOrderReceivedModal(false);
  };

  const handleStatusSelect = (value: string) => {
    if (value === "") {
      clearFilters("status");
    } else {
      setFilter("status", value);
    }
  };

  const handleSortSelect = (value: string) => {
    if (value === "") {
      clearFilters("sort");
    } else {
      setFilter("sort", value);
    }
  };

  return (
    <AccountLayout title="Pesanan">
      <SEO
        title="Pesanan Saya"
        description="Kelola pesanan Anda"
        noIndex={true}
        noFollow={true}
      />

      <ConfirmOrderReceivedModal
        orderId={selectedOrderId}
        show={showConfirmOrderReceivedModal}
        onClose={handleCloseConfirmOrderDeliveredModal}
      />

      <div className="d-flex mb-4 gap-3">
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted">Status:</span>
          <StatusDropdown
            value={params.status as string | undefined}
            onSelect={handleStatusSelect}
            className="w-auto"
          />
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted">Urutkan:</span>
          <SortDropdown
            value={params.sort as string | undefined}
            onSelect={handleSortSelect}
            className="w-auto"
          />
        </div>
      </div>

      <Alert variant="primary" className="mb-3">
        <p className="mb-0">
          Jika Anda ingin membatalkan pesanan atau melakukan pengembalian dana,
          silakan hubungi kami melalui{" "}
          <a
            href="https://wa.me/628123456789?text=Hallo%20JAF%20Parfum,%20saya%20ingin%20membatalkan%20pesanan%20atau%20pengembalian%20dana."
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          .
        </p>
      </Alert>

      {isLoading && <Loading className="py-5" />}

      {!isLoading && orders?.data?.length === 0 && <NoData />}

      {orders?.data && orders?.data?.length > 0 && (
        <>
          <div>
            {orders?.data?.map((order) => (
              <OrderItem
                onConfirmOrderReceived={handleShowConfirmOrderReceivedModal}
                key={`order-${order.id}`}
                order={order}
              />
            ))}
          </div>

          {orders?.page && (
            <Pagination
              {...orders.page}
              onClick={(page) => {
                setFilter("page", page);
              }}
            />
          )}
        </>
      )}
    </AccountLayout>
  );
};

export default Order;

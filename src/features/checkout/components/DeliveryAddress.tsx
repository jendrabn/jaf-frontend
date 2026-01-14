import { Button, Card } from "react-bootstrap";
import { useCheckoutState } from "@/contexts/CheckoutContext";
import EmptyState from "@/components/ui/empty-state";

interface DeliveryAddressProps {
  className?: string;
  handleShowAddressModal: () => void;
}

function DeliveryAddress({
  className,
  handleShowAddressModal,
}: DeliveryAddressProps) {
  const { address } = useCheckoutState();

  return (
    <Card className={className}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <span>Alamat Pengiriman</span>
          <Button variant="outline-primary" onClick={handleShowAddressModal}>
            {address ? "Ubah Alamat" : "Tambah Alamat"}
          </Button>
        </Card.Title>
        <div className="d-flex flex-column flex-lg-row align-items-center">
          {address ? (
            <address className="flex-grow-1 mb-0 pe-2 lh-sm">
              <strong>{`${address?.name} (${address?.phone})`}</strong>
              <br />
              {address?.address} <br />
              {`${address?.subdistrict?.name}, ${address?.district?.name}, ${address?.city?.name}, ${address?.province?.name}, ${address.zip_code}`}
            </address>
          ) : (
            <EmptyState
              title="Alamat Belum Ditambahkan"
              message="Silakan tambahkan alamat pengiriman"
              iconClass="bi bi-geo-alt"
              iconSize="3rem"
            />
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default DeliveryAddress;

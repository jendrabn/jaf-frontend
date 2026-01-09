import AccountLayout from "@/components/layouts/AccountLayout";
import SEO from "@/components/SEO";

const AddressPage = () => {
  return (
    <AccountLayout title="Alamat">
      <SEO
        title="Alamat Saya"
        description="Kelola dan perbarui alamat pengiriman Anda untuk pengalaman belanja yang lebih mudah."
        noIndex={true}
        noFollow={true}
      />

      {/* coming soon feature with icon*/}
      <div className="text-center py-5">
        <i
          className="bi bi-geo-alt mb-3 text-muted"
          style={{ fontSize: "64px" }}
        ></i>
        <h3 className="mb-3">Fitur ini segera hadir!</h3>
        <p className="text-muted">
          Kami sedang mengerjakan fitur pengelolaan alamat. Nantikan pembaruan
          selanjutnya.
        </p>
      </div>
    </AccountLayout>
  );
};

export default AddressPage;

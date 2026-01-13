import { Button, Card, Form, Modal } from "react-bootstrap";
import Select, { type SingleValue } from "react-select";
import { useConfirmPayment, useGetOrder } from "@/features/orders/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import Loading from "@/components/ui/loading";
import {
  PAYMENT_METHOD_BANK,
  PAYMENT_METHOD_EWALLET,
  QUERY_KEYS,
} from "@/utils/constans";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import PaymentInfo from "@/features/orders/components/PaymentInfo";
import { banks } from "@/data/banks";
import { useServerValidation } from "@/hooks/use-server-validation";

interface ConfirmPaymentModalProps {
  show: boolean;
  orderId: number | null;
  onClose: () => void;
}

type ConfirmPaymentInput = {
  name: string;
  account_name: string;
  account_number: string;
  account_username: string;
  phone: string;
};

const ConfirmPaymentModal = (props: ConfirmPaymentModalProps) => {
  const { show, orderId, onClose } = props;

  const queryClient = useQueryClient();
  const { data: order, isLoading } = useGetOrder(orderId!);

  const {
    mutate,
    error,
    reset: resetMutation,
    isPending,
  } = useConfirmPayment();

  const form = useForm<ConfirmPaymentInput>({
    defaultValues: {
      name: "",
      account_name: "",
      account_number: "",
      account_username: "",
      phone: "",
    },
  });

  useEffect(() => {
    form.register("name");
  }, [form]);

  const bankOptions = useMemo(
    () =>
      banks.map((bank) => ({
        value: bank.name,
        label: bank.name,
      })),
    []
  );

  const watchedBankName = useWatch({ control: form.control, name: "name" });

  const selectedBankOption = useMemo(
    () =>
      bankOptions.find((option) => option.value === watchedBankName) ?? null,
    [bankOptions, watchedBankName]
  );

  const handleBankChange = useCallback(
    (option: SingleValue<{ value: string; label: string }>) => {
      form.setValue("name", option?.value ?? "", {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [form]
  );

  const location = useLocation();
  const navigate = useNavigate();

  // clear state
  const clearState = useCallback(() => {
    if (location.state?.new_order_created)
      navigate(location.pathname, { state: null });
  }, [location.state?.new_order_created, location.pathname, navigate]);

  const [showOrderSuccess, setShowOrderSuccess] = useState(
    !!location.state?.new_order_created
  );

  useEffect(() => {
    if (!order) return;

    if (order.payment?.method === PAYMENT_METHOD_EWALLET) {
      form.setValue("name", order.payment.info.name || "", {
        shouldValidate: true,
      });
    } else if (order.payment?.method === PAYMENT_METHOD_BANK) {
      const bankOption = bankOptions.find(
        (option) => option.value === order.payment?.info?.name
      );

      if (bankOption) {
        form.setValue("name", bankOption.value, { shouldValidate: true });
      }
    }
  }, [order, bankOptions, form]);

  useEffect(() => {
    clearState();
  }, [clearState, location]);

  const onConfirm: SubmitHandler<ConfirmPaymentInput> = (data) => {
    if (!orderId) return;

    mutate(
      { orderId, data: data },
      {
        onSuccess() {
          toast.success("Pesanan berhasil dikonfirmasi.");

          form.reset();
          resetMutation();

          onClose?.();

          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.ORDER, orderId],
          });
        },
      }
    );
  };

  const handleClose = () => {
    form.reset();
    resetMutation();

    onClose();

    setShowOrderSuccess(false);

    clearState();
  };

  useServerValidation(error, form);

  return (
    <Modal
      show={show}
      centered
      onHide={handleClose}
      backdrop="static"
      animation
    >
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title>Konfirmasi Pembayaran</Modal.Title>
      </Modal.Header>
      <Form onSubmit={form.handleSubmit(onConfirm)}>
        <fieldset disabled={isPending}>
          <Modal.Body className="py-3">
            {isLoading && show && <Loading className="py-5" />}

            {order && (
              <>
                {showOrderSuccess && (
                  <div className="text-center mb-3">
                    <i className="bi bi-check-circle text-success display-1"></i>
                  </div>
                )}

                <Card body className="border-0 shadow-sm mb-4">
                  <PaymentInfo
                    paymentDueDate={order.payment_due_date}
                    payment={order.payment}
                  />
                </Card>

                <p className="text-muted text-center">
                  Konfirmasi pembayaran Anda dengan mengisi form di bawah ini.
                  Kami akan memverifikasi pembayaran Anda secepatnya.
                </p>

                {order?.payment?.method === PAYMENT_METHOD_BANK && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Nama Bank</Form.Label>
                      <Select
                        inputId="bank-select"
                        classNamePrefix="react-select"
                        options={bankOptions}
                        value={selectedBankOption}
                        onChange={handleBankChange}
                        isClearable
                        placeholder="Pilih Bank"
                        noOptionsMessage={() => "Bank tidak ditemukan"}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Nama Pemilik Rekening</Form.Label>
                      <Form.Control
                        type="text"
                        {...form.register("account_name")}
                        isInvalid={!!form.formState.errors.account_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {form.formState.errors.account_name?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Nomor Rekening</Form.Label>
                      <Form.Control
                        type="text"
                        {...form.register("account_number")}
                        isInvalid={!!form.formState.errors.account_number}
                      />
                      <Form.Control.Feedback type="invalid">
                        {form.formState.errors.account_number?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}

                {order?.payment?.method === PAYMENT_METHOD_EWALLET && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>E-Wallet</Form.Label>
                      <Form.Control
                        type="text"
                        {...form.register("name")}
                        value={order?.payment?.info?.name}
                        disabled
                        isInvalid={!!form.formState.errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {form.formState.errors.name?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Nama Akun</Form.Label>
                      <Form.Control
                        type="text"
                        {...form.register("account_name")}
                        autoFocus
                        isInvalid={!!form.formState.errors.account_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {form.formState.errors.account_name?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Username Akun</Form.Label>
                      <Form.Control
                        type="text"
                        {...form.register("account_username")}
                        isInvalid={!!form.formState.errors.account_username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {form.formState.errors.account_username?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>No. Handphone</Form.Label>
                      <Form.Control
                        type="text"
                        {...form.register("phone")}
                        isInvalid={!!form.formState.errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {form.formState.errors.phone?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer className="border-top-0">
            <Button variant="outline-secondary" onClick={handleClose}>
              Konfirmasi Nanti
            </Button>
            <Button variant="primary" type="submit">
              Konfirmasi Pembayaran
            </Button>
          </Modal.Footer>
        </fieldset>
      </Form>
    </Modal>
  );
};

export default ConfirmPaymentModal;

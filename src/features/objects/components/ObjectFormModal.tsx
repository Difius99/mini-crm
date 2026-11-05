import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../../components/ui/modal/Modal";
import { Input } from "../../../components/ui/input/Input";
import Button from "../../../components/ui/button/Button";
import { Actions, ErrorText } from "../../../styled";
import { getApiErrorMessage } from "../../../api/errors";
import type { ObjectInput } from "../../../api/types";
import { Form } from "./styled";
import type { ObjectFormModalProps } from "./types";

const EMPTY: ObjectInput = { name: "", address: "" };

export default function ObjectFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  title,
  submitLabel,
}: ObjectFormModalProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ObjectInput>({ defaultValues: initialValues ?? EMPTY });

  useEffect(() => {
    if (isOpen) {
      reset(initialValues ?? EMPTY);
      setServerError(null);
    }
  }, [isOpen, initialValues, reset]);

  const submit = async (values: ObjectInput) => {
    setServerError(null);
    try {
      await onSubmit({
        name: values.name.trim(),
        address: values.address.trim(),
      });
    } catch (e) {
      setServerError(getApiErrorMessage(e));
    }
  };

  const handleClose = () => {
    if (!isSubmitting) onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      <Form onSubmit={handleSubmit(submit)} noValidate>
        <Input
          label="Название"
          placeholder="ЖК «Северный»"
          status={errors.name ? "error" : "default"}
          helperText={errors.name?.message}
          isValidate
          {...register("name", {
            validate: (v) => v.trim().length > 0 || "Введите название",
          })}
        />
        <Input
          label="Адрес"
          placeholder="г. Томск, ул. Северная, 12"
          status={errors.address ? "error" : "default"}
          helperText={errors.address?.message}
          isValidate
          {...register("address", {
            validate: (v) => v.trim().length > 0 || "Введите адрес",
          })}
        />

        {serverError && <ErrorText>{serverError}</ErrorText>}

        <Actions>
          <Button type="submit" isLoading={isSubmitting}>
            {submitLabel}
          </Button>
          <Button variant="secondary" disabled={isSubmitting} onClick={handleClose}>
            Отмена
          </Button>
        </Actions>
      </Form>
    </Modal>
  );
}

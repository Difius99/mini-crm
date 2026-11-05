import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "../../../components/ui/modal/Modal";
import { Input } from "../../../components/ui/input/Input";
import { Textarea } from "../../../components/ui/textarea/Textarea";
import Dropdown from "../../../components/ui/dropdown/Dropdown";
import Button from "../../../components/ui/button/Button";
import { Actions, ErrorText } from "../../../styled";
import { getApiErrorMessage } from "../../../api/errors";
import { Form } from "./styled";
import type { TaskFormModalProps, TaskFormValues } from "./types";

const EMPTY: TaskFormValues = { title: "", description: "", assignee_id: "" };

export default function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
  executors,
  initialValues,
  title,
  submitLabel,
}: TaskFormModalProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({ defaultValues: initialValues ?? EMPTY });

  useEffect(() => {
    if (isOpen) {
      reset(initialValues ?? EMPTY);
      setServerError(null);
    }
  }, [isOpen, initialValues, reset]);

  const submit = async (values: TaskFormValues) => {
    setServerError(null);
    try {
      await onSubmit({
        title: values.title.trim(),
        description: values.description.trim(),
        assignee_id: values.assignee_id,
      });
    } catch (e) {
      setServerError(getApiErrorMessage(e));
    }
  };

  const handleClose = () => {
    if (!isSubmitting) onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title} width={520}>
      <Form onSubmit={handleSubmit(submit)} noValidate>
        <Input
          label="Название"
          status={errors.title ? "error" : "default"}
          helperText={errors.title?.message}
          isValidate
          {...register("title", {
            validate: (v) => v.trim().length > 0 || "Введите название",
          })}
        />

        <Textarea
          label="Описание"
          rows={4}
          isValidate
          {...register("description")}
        />

        <Controller
          name="assignee_id"
          control={control}
          rules={{ required: "Выберите исполнителя" }}
          render={({ field, fieldState }) => (
            <Dropdown
              label="Исполнитель"
              placeholder="Выберите исполнителя"
              value={field.value}
              onChange={field.onChange}
              options={executors.map((e) => ({
                value: e.id,
                label: e.full_name,
              }))}
              status={fieldState.error ? "error" : "default"}
              helperText={fieldState.error?.message ?? ""}
            />
          )}
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

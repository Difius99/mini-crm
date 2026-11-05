import { useState } from "react";
import Modal from "../ui/modal/Modal";
import Button from "../ui/button/Button";
import { Actions, ErrorText } from "../../styled";
import { getApiErrorMessage } from "../../api/errors";
import { Text } from "./styled";
import type { ConfirmModalProps } from "./types";

export default function ConfirmModal({
  isOpen,
  title,
  text,
  confirmLabel = "Удалить",
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (isLoading) return;
    setError(null);
    onClose();
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await onConfirm();
    } catch (e) {
      setError(getApiErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title} width={420}>
      <Text>{text}</Text>
      {error && <ErrorText>{error}</ErrorText>}
      <Actions>
        <Button variant="danger" isLoading={isLoading} onClick={handleConfirm}>
          {confirmLabel}
        </Button>
        <Button variant="secondary" disabled={isLoading} onClick={handleClose}>
          Отмена
        </Button>
      </Actions>
    </Modal>
  );
}

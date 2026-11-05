export type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  text: React.ReactNode;
  confirmLabel?: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
};

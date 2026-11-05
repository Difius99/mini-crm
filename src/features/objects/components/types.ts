import type { ObjectInput } from "../../../api/types";

export type ObjectFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ObjectInput) => Promise<void>;
  initialValues?: ObjectInput;
  title: string;
  submitLabel: string;
};

import { useEffect } from "react";
import type { ModalProps } from "./types";
import { createPortal } from "react-dom";
import { Backdrop, Body, Title } from "./styled";

export default function Modal({
  isOpen,
  onClose,
  title,
  width = 480,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <Backdrop onMouseDown={onClose}>
      <Body
        $width={width}
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        {title && <Title>{title}</Title>}
        {children}
      </Body>
    </Backdrop>,
    document.body,
  );
}

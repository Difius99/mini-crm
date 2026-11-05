import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import { useRef, useState } from "react";
import {
  ChevronDown,
  Container,
  Control,
  ControlLabel,
  ControlValue,
  ControlWrapper,
  HelperText,
  Menu,
  MenuItem,
} from "./styled";
import type { DropdownProps } from "./types";

export default function Dropdown<T extends string = string>({
  label,
  placeholder = "Выберите",
  value,
  options,
  onChange,
  disabled,
  status = "default",
  helperText,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      flip(),
      shift({ padding: 4 }),
      size({
        apply({ rects, elements }) {
          elements.floating.style.width = `${rects.reference.width}px`;
        },
      }),
    ],
  });

  const listRef = useRef<Array<HTMLElement | null>>([]);
  const click = useClick(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNav],
  );

  const selected = options.find((o) => o.value === value);

  const handleSelect = (index: number) => {
    const option = options[index];
    if (!option || option.disabled) return;
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <Container>
      <Control
        ref={refs.setReference}
        type="button"
        disabled={disabled}
        data-open={isOpen}
        $isError={status === "error"}
        {...getReferenceProps()}
      >
        <ControlWrapper>
          {label && <ControlLabel>{label}</ControlLabel>}
          <ControlValue $isPlaceholder={!selected}>
            {selected ? selected.label : placeholder}
          </ControlValue>
        </ControlWrapper>
        <ChevronDown $isOpen={isOpen} />
      </Control>

      {helperText !== undefined && (
        <HelperText $isError={status === "error"}>{helperText || " "}</HelperText>
      )}

      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <Menu
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option.value}
                  ref={(node) => {
                    listRef.current[index] = node;
                  }}
                  role="option"
                  aria-selected={option.value === value}
                  tabIndex={activeIndex === index ? 0 : -1}
                  $active={activeIndex === index}
                  $disabled={option.disabled}
                  $selected={option.value === value}
                  {...getItemProps({
                    onClick() {
                      handleSelect(index);
                    },
                    onKeyDown(event) {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleSelect(index);
                      }
                    },
                  })}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </Container>
  );
}

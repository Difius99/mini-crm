import type { TaskStatus } from "./api/types";

export const COLORS = {
  // text & icons
  purple: "#2E2FA0",
  darkPurple: "#02035C",
  orange: "#FA4A16",
  warning: "#D14D00",
  success: "#15B015",
  critical: "#F2A405",
  white: "#FFFFFF",
  black: "#0A0A0B",

  primary: "#0E0F0F",
  secondary: "#757575",
  tertiary: "#BABABA",
  lightStroke: "#E1E1EC",
  shadow: "#1E21221A",

  // background
  backgroundPrimary: "#F6F6F9",
  backgroundPure: "#FFFFFF",
  backgroundSecondary: "#EEEEF5",
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
  new: "Новая",
  in_progress: "В работе",
  review: "На проверке",
  accepted: "Принята",
  rework: "На доработке",
};

export const STATUS_COLORS: Record<TaskStatus, { text: string; bg: string }> = {
  new: { text: COLORS.purple, bg: COLORS.backgroundSecondary },
  in_progress: { text: "#0B63C5", bg: "#E6F0FC" },
  review: { text: "#9A6700", bg: "#FFF4D6" },
  accepted: { text: "#0E7A0E", bg: "#E5F6E5" },
  rework: { text: COLORS.warning, bg: "#FDEBE3" },
};

export const ROLE_LABELS = {
  manager: "Постановщик",
  executor: "Исполнитель",
} as const;

import { HelpCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LUCIDE_ICON_MAP } from "./lucideIcons";

export function getLucideIcon(iconName?: string): LucideIcon {
  if (!iconName) return HelpCircle;

  return LUCIDE_ICON_MAP[iconName] ?? HelpCircle;
}

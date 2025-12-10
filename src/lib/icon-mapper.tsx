import {
  TrendingUp,
  Apple,
  Home,
  Scale,
  Vote,
  Shield,
  Wifi,
  Bitcoin,
  Users,
  Globe,
  Heart,
  BookOpen,
  Building2,
  Receipt,
  Pill,
  Target,
  DollarSign,
  GraduationCap,
  Radio,
  HandHeart,
  type LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Apple,
  Home,
  Scale,
  Vote,
  Shield,
  Wifi,
  Bitcoin,
  Users,
  Globe,
  Heart,
  BookOpen,
  Building2,
  Receipt,
  Pill,
  Target,
  DollarSign,
  GraduationCap,
  Radio,
  HandHeart,
};

export function getIconComponent(iconName: string): LucideIcon {
  return iconMap[iconName] || Target;
}

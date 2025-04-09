import {
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Ban,
  type LucideIcon,
} from "lucide-react";

export interface StatusInfo {
  icon: LucideIcon;
  label: string;
  className: string;
}

export const getStatusInfo = (status: string): StatusInfo => {
  switch (status) {
    case "APPROVED":
      return {
        icon: CheckCircle,
        label: "Payment approved",
        className: "text-success",
      };
    case "PENDING":
      return {
        icon: Clock,
        label: "Payment pending",
        className: "text-warning",
      };
    case "DECLINED":
      return {
        icon: XCircle,
        label: "Payment declined",
        className: "text-danger",
      };
    case "VOIDED":
      return {
        icon: Ban,
        label: "Payment voided",
        className: "text-secondary",
      };
    case "ERROR":
    default:
      return {
        icon: AlertTriangle,
        label: "Payment failed",
        className: "text-danger",
      };
  }
};

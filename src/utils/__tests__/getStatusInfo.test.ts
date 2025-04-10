import { CheckCircle, Clock, XCircle, AlertTriangle, Ban } from "lucide-react";
import { getStatusInfo } from "../getStatusInfo";

describe("getStatusInfo", () => {
  it("retorna información correcta para APPROVED", () => {
    const result = getStatusInfo("APPROVED");
    expect(result).toEqual({
      icon: CheckCircle,
      label: "Payment approved",
      className: "text-success",
    });
  });

  it("retorna información correcta para PENDING", () => {
    const result = getStatusInfo("PENDING");
    expect(result).toEqual({
      icon: Clock,
      label: "Payment pending",
      className: "text-warning",
    });
  });

  it("retorna información correcta para DECLINED", () => {
    const result = getStatusInfo("DECLINED");
    expect(result).toEqual({
      icon: XCircle,
      label: "Payment declined",
      className: "text-danger",
    });
  });

  it("retorna información correcta para VOIDED", () => {
    const result = getStatusInfo("VOIDED");
    expect(result).toEqual({
      icon: Ban,
      label: "Payment voided",
      className: "text-secondary",
    });
  });

  it("retorna fallback para status ERROR", () => {
    const result = getStatusInfo("ERROR");
    expect(result).toEqual({
      icon: AlertTriangle,
      label: "Payment failed",
      className: "text-danger",
    });
  });

  it("retorna fallback para status no conocido", () => {
    const result = getStatusInfo("UNKNOWN");
    expect(result).toEqual({
      icon: AlertTriangle,
      label: "Payment failed",
      className: "text-danger",
    });
  });
});

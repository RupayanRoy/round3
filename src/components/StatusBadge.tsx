import { Badge } from "@/components/ui/badge";
import { Status } from "../types/infrastructure";

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const variants: Record<Status, string> = {
    Optimal: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-200",
    Warning: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-200",
    Critical: "bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-rose-200",
    Underutilized: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-200",
  };

  return (
    <Badge variant="outline" className={variants[status]}>
      {status}
    </Badge>
  );
};
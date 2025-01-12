import { StatusesProducts } from "~/types";

export const StatusColors: Record<StatusesProducts, string> = {
    STOCK_PENDING: "#FFD700",
    NOT_AVAILABLE: "#FF6347",
    SELL: "#4CAF50",
    SEND: "#1E90FF",
    ARRIVED: "#8A2BE2",
};

export function getStatusColor(status: StatusesProducts): string {
    return StatusColors[status] || "#000";
}
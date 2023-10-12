import { DateRange } from "react-day-picker";

export default function formatDate(dateRange: DateRange | { from: ""; to: "" } | undefined) {
    if (dateRange && dateRange.from && dateRange.to) {
        return {
            start: dateRange.from.toLocaleDateString(),
            end: dateRange.to.toLocaleDateString(),
        };
    }
}

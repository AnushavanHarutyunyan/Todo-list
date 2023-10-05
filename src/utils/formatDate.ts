export default function formatDate(date) {
    return {
        start: date?.from.toISOString().slice(0, 10),
        end: date?.to.toISOString().slice(0, 10),
    };
}

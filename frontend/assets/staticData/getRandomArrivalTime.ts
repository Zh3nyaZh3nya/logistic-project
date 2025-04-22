export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArrivalTime({ randomDate = false } = {}) {
    const now = new Date();
    const arrivalDate = new Date(now);
    arrivalDate.setDate(now.getDate() + 2); // +2 дня

    // Случайный диапазон времени (начало от 08:00 до 18:00)
    const startHour = getRandomInt(8, 18);
    const duration = getRandomInt(1, 2); // 1–2 часа
    const endHour = Math.min(startHour + duration, 20); // не позже 20:00

    const formatDate = (d: Date) =>
        d.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

    const formatTime = (h: number) => h.toString().padStart(2, "0") + ":00";

    return `${formatDate(arrivalDate)} ~${formatTime(startHour)}-${formatTime(endHour)}`;
}


export function getFirstDayOfWeek(date: Date) {
	const today = date;
	const day = today.getDay();
	const diff = today.getDate() - day + (day === 0 ? -6 : 1);
	return new Date(today.setDate(diff));
}

export function getLastDayOfWeek(date: Date) { 
    const firstDay = getFirstDayOfWeek(date); 
    const lastDay = new Date(firstDay);
    lastDay.setDate(lastDay.getDate() + 6);
    return lastDay
}

export function getDayOfWeek(date : string ) {
    const d = new Date(date)
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = d.getDay();
    return daysOfWeek[dayIndex];
  }
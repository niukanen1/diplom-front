import { scheduleEvent } from "../../entities/scheduleEvent";

export interface SortedEvents {
    [date: string]: scheduleEvent[];
}

export function sortEventsByDate(
    data: scheduleEvent[] | undefined
): SortedEvents {
    const sortedEvents: SortedEvents = {};
    if (data) {
        for (const event of data) {
            if (!sortedEvents[event.date]) {
                sortedEvents[event.date] = [];
            }

            sortedEvents[event.date].push(event);
        }

        for (const events of Object.values(sortedEvents)) {
            events.sort((a, b) => a.timeStart.localeCompare(b.timeStart));
        }
    }
    return sortedEvents;
}

import { schoolId } from "./../../global";
import axios from "axios";
import { scheduleEvent } from "../../entities/scheduleEvent";
export default async function getScheduleEvents(
    fromDate: string,
    toDate: string,
    groupId?: string | null,
    teacherId?: string | null,
    roomId?: string | null
): Promise<scheduleEvent[]> {
    let url = `https://tahvel.edu.ee/hois_back/timetableevents/`;
    const params = new URLSearchParams();

    if (groupId) {
        url += `timetableByGroup/${schoolId}`;
        params.append("studentGroups", groupId);
    } else if (teacherId) {
        url += `timetableByTeacher/${schoolId}`;
        params.append("teachers", teacherId);
    } else if (roomId) {
        url += `timetableByRoom/${schoolId}`;
        params.append("room", roomId);
    } else {
        throw new Error("Invalid parameters");
    }

    params.append("from", fromDate);
    params.append("thru", toDate);
    url += `?${params.toString()}`;

    try {
        const response = await axios.get(url);
        const events: scheduleEvent[] = response.data.timetableEvents;
        return events;
    } catch (error) {
        throw new Error("Failed to fetch schedule events");
    }
}

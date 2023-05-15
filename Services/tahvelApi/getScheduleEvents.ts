import { schoolId } from './../../global';
import axios from "axios";
import { scheduleEvent } from "../../entities/scheduleEvent";

export default async function getScheduleEvents(
    fromDate: string,
    toDate: string,
    groupId: string | null = null,
    teacherId: string | null = null,
    roomId: string | null = null
): Promise<scheduleEvent[]> {
    const url = new URL(`https://tahvel.edu.ee/hois_back/timetableevents/`);
    const params = new URLSearchParams();

    if (groupId) {
        url.pathname += `timetableByGroup/${schoolId}`;
        params.append("studentGroups", groupId);
    } else if (teacherId) {
        url.pathname += `timetableByTeacher/${schoolId}`;
        params.append("teachers", teacherId);
    } else if (roomId) {
        url.pathname += `timetableByRoom/${schoolId}`;
        params.append("room", roomId);
    } else {
        throw new Error("Invalid parameters");
    }

    params.append("from", fromDate);
    params.append("thru", toDate);
    url.search = params.toString();

    try {
        const response = await axios.get(url.toString());
        const events: scheduleEvent[] = response.data.timetableEvents;
        return events;
    } catch (error) {
        throw new Error("Failed to fetch schedule events");
    }
}

import { studyYear } from "../../entities/studyYear";
import axios from "axios";
import { schoolId } from "../../global";

export default async function getCurrentStudyYear(): Promise<studyYear | null> {
    const url = `https://tahvel.edu.ee/hois_back/timetables/timetableStudyYears/${schoolId}`;
    const response = await axios.get(url);
    const studyYears: studyYear[] = response.data;
    const currentYear = studyYears.find(isWithinStudyYear);
    return currentYear || null;
}

function isWithinStudyYear(studyYear: studyYear): boolean {
    const currentDate = new Date();
    const startDate = new Date(studyYear.startDate);
    const endDate = new Date(studyYear.endDate);
    return currentDate >= startDate && currentDate <= endDate;
}

import axios from "axios";
import { teacher } from "../../entities/teacher";
import getCurrentStudyYear from "./getCurrentStudyYear";
import { schoolId } from "../../global";

export default async function getTeachers(name = ""): Promise<teacher[]> {
    const url = new URL(
        `https://tahvel.edu.ee/hois_back/timetables/teacher/${schoolId}`
    );
    const params = new URLSearchParams();

    if (name) {
        params.append("name", name);
    }
    url.search = params.toString();

    try {
        const response = await axios.get(url.toString());
        const teachers: teacher[] = response.data.content;
        return teachers;
    } catch (error) {
        throw new Error("Failed to fetch teachers");
    }
}

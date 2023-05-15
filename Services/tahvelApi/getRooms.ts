import axios from "axios";
import getCurrentStudyYear from "./getCurrentStudyYear";
import { schoolId } from "../../global";
import { room } from "../../entities/room";

export default async function getRooms(name = ""): Promise<room[]> {
    const url = new URL(`https://tahvel.edu.ee/hois_back/timetables/room/${schoolId}`);
    const params = new URLSearchParams();
    
    if (name) {
        params.append("name", name);
    }
    url.search = params.toString();

    try {
        const response = await axios.get(url.toString());
        const rooms: room[] = response.data.content;
        return rooms;
    } catch (error) {
        throw new Error("Failed to fetch rooms");
    }
}

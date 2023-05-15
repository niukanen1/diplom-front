import axios from "axios";
import { group } from "../../entities/group";
import getCurrentStudyYear from "./getCurrentStudyYear";
import { schoolId } from "../../global";

export default async function getGroups(name = "", ): Promise<group[]> {
  const studyYear = await getCurrentStudyYear();

  const url = new URL(`https://tahvel.edu.ee/hois_back/timetables/group/${schoolId}`);
  const params = new URLSearchParams();
  if (studyYear) {
    params.append("studyYearId", studyYear.id.toString());
  }
  if (name) {
    params.append("name", name);
  }
  url.search = params.toString();

  try {
    const response = await axios.get(url.toString());
    const groups: group[] = response.data.content;
    return groups;
  } catch (error) {
    throw new Error("Failed to fetch groups");
  }
}

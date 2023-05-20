import axios from "axios";
import { group } from "../../entities/group";
import getCurrentStudyYear from "./getCurrentStudyYear";
import { schoolId } from "../../global";
import { tahvelResponse } from "../../entities/tahvelResponse";

export default async function getTahvelData(token : string ): Promise<tahvelResponse> {
  const studyYear = await getCurrentStudyYear();

  //const url = new URL(`https://diplom-rh03.onrender.com/tahvel`);
  const url = new URL(`http://10.0.2.2:3000/tahvel`);
  
  try {
    const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `${token}`,
        },
      });
    const tahvelResponse: tahvelResponse = response.data
    return tahvelResponse;
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch groups");
  }
}

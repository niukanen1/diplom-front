import { doc, setDoc } from "firebase/firestore";
import { council } from "../../../entities/council";
import { auth, db } from "../firebaseinit";
import AppStore from "../../../Stores/AppStore";

export async function createCouncil(councilName: string, adminUid: string | undefined) { 
    if (adminUid) { 
        const councilId = Date.now().toString()
        const councilData: council = { 
            id: councilId, 
            adminUid: adminUid, 
            title: councilName, 
            votings: [] 
        }

        AppStore.setAdminData({
            uid: auth.currentUser?.uid ?? "",
            councilId: councilId
        })

        await setDoc(doc(db, "admins", adminUid), {
            uid: auth.currentUser?.uid ?? "",
            councilId: councilId
        })
    
        return await setDoc(doc(db, "councils", adminUid), councilData);
    }
   throw Error("Неопознан uid пользователя")
}
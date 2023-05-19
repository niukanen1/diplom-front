import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { council, councilMember, message } from "../../../entities/council";
import { auth, db } from "../firebaseinit";
import AppStore from "../../../Stores/AppStore";

export async function createCouncil(councilName: string, adminUid: string | undefined) { 
    if (adminUid) { 
        const councilId = Date.now().toString()
        const councilData: council = { 
            id: councilId, 
            adminUid: adminUid, 
            title: councilName, 
            votings: [], 
            messages: [],
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

export async function UpdateCouncilMemberData(updatedCouncilMemberData: councilMember) { 
    return await updateDoc(doc(db, "councilUsers", updatedCouncilMemberData.userUid), updatedCouncilMemberData)
} 

export async function getCouncilAdminUid(councilId: string) { 
    const council = (await getDocs(query(collection(db, 'councils'), where("id", '==', councilId)))).docs[0]?.data() as council
    return council.adminUid

}

export async function UploadCouncilMessage(councilAdminUid: string, message: message) { 
    const councilRef = doc(db, "councils", councilAdminUid); 
    const councilCurrentData = ((await getDoc(councilRef)).data()) as council

    const updatedCouncilData = councilCurrentData;
    updatedCouncilData.messages.push(message); 

    await setDoc(councilRef, updatedCouncilData);
}
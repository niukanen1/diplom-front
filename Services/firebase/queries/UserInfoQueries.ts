import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from '../firebaseinit'
import { user } from '../../../entities/user';
import { status } from '../../../entities/council';


export async function findCouncilUsers(councilId: string): Promise<user[]> { 
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef, where('councilId', '==', councilId));
    const querySnapshot = await getDocs(q);
    const users: user[] = [];
    querySnapshot.docs.forEach(doc => {
        users.push(doc.data() as user)
    })
    return users
}

export async function checkIfUserAdmin(userId: string) { 
    const collectionRef = collection(db, 'admins');
    const docRef = doc(collectionRef, userId);
    const user = await getDoc(docRef); 
    if (user) { 
        return true 
    } else { 
        return false 
    }
}

export async function requestBecomeCouncilMemeber(userUid: string | undefined, councilId: string) { 
    if (!userUid) { 
        throw Error("Не удалось распознать идентификатор пользователя")
    }
    await setDoc(doc(db, "councilUsers", userUid), {userUid: userUid, councilId: councilId, status: status.notActivated})
}

export async function UpdateUserData(userUid: string, userData: user) { 
    const collectionRef = collection(db, 'users'); 
    return await setDoc(doc(collectionRef, userUid), userData)
} 
export async function deleteUserData(userUid: string) { 
    await deleteDoc(doc(db, 'users', userUid))
} 
export async function getUserData(userUid: string): Promise<user> {
    const userData = await getDoc(doc(db, "users", userUid))
    return userData.data() as user
}
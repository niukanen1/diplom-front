import { collection, query, where } from "firebase/firestore";
import { observer } from "mobx-react-lite";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../Services/firebase/firebaseinit";
import AppStore from "../../../Stores/AppStore";
import { Box, ScrollView, Text } from "native-base";
import { councilMember } from "../../../entities/council";

function AdminMemeberList() {
	const [value, loading, error] = useCollection(
		query(collection(db, "councilUsers"), where("councilId", "==", `${AppStore.adminData?.councilId}`))
	);
	return (
		<Box>
			<ScrollView>
                {value?.docs.map(doc => { 
                    const councilMember = doc.data() as councilMember;
                    return (
                        <Text>{councilMember.userUid}</Text>
                    )
                })}
            </ScrollView>
		</Box>
	);
}

export default observer(AdminMemeberList);

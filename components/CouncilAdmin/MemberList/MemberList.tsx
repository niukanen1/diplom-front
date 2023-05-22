import { observer } from "mobx-react-lite";
import { Heading, ScrollView, Spinner } from "native-base";
import { user } from "../../../entities/user";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../../Services/firebase/firebaseinit";
import AppStore from "../../../Stores/AppStore";
import { councilMember } from "../../../entities/council";
import SingleUserItem from "./SingleUserItem";

function MemberList() {
	const [value, loading, error] = useCollection(
		query(collection(db, "councilUsers"), where("councilId", "==", `${AppStore.currentCouncilId}`))
	);
    if (loading) return <Spinner size={60} colorScheme={'orange'}/>
	return (
		<ScrollView>
			{value?.docs.map((doc) => {
				const councilUser = doc.data() as councilMember;
				return (
					<SingleUserItem
						key={councilUser.userUid}
						userUid={councilUser.userUid}
						councilMemberData={councilUser}
					/>
				);
			})}
		</ScrollView>
	);
}

export default observer(MemberList);

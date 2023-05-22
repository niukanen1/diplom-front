import { collection, doc, query, where } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { auth, db } from "../../../../Services/firebase/firebaseinit";
import { Box, Button, Heading, Modal, ScrollView, Spinner, Text } from "native-base";
import { observer } from "mobx-react-lite";
import AppStore from "../../../../Stores/AppStore";
import { councilMember, status } from "../../../../entities/council";
import { useEffect, useState } from "react";
import JoinCouncilModal from "../../../../components/Council/JoinCouncilList";
import JoinCouncilList from "../../../../components/Council/JoinCouncilList";
import { Dimensions } from "react-native";
import MemberList from "../../../../components/CouncilAdmin/MemberList/MemberList";
function CouncilMembersPage() {
	const [councilMemberData, setCouncilMemberData] = useState<councilMember | undefined>(undefined);
	const [value, loading, error] = useDocument(doc(db, "councilUsers", `${auth.currentUser?.uid}`));
    const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		if (value?.data()) {
			const decoded = value?.data() as councilMember;
			setCouncilMemberData(decoded);
		} else {
			setCouncilMemberData(undefined);
		}
	}, [value]);
    const height = Dimensions.get("screen").height
	return (
		<>
			<Box>
				{councilMemberData == undefined ? (
					<>
						<Heading>Вы не участник совета</Heading>
						<Button backgroundColor={"orange.500"} borderRadius={20} onPress={() => {setShowModal(true)}}>
							Вступить в совет
						</Button>
					</>
				) : councilMemberData.status == status.notActivated ? (
					<>
						<Heading>Вы не активированы</Heading>
					</>
				) : (
					<>
						<MemberList />
					</>
				)}
			</Box>
            <Modal isOpen={showModal} onClose={() => {setShowModal(false)}}>
                <Modal.Content height={height}>
                    <JoinCouncilList />
                </Modal.Content>
            </Modal>
		</>
	);
}

const CouncilMembersList = ({councilId}: {councilId: string}) => {
	const [value, loading, error] = useCollection(
		query(collection(db, "councilUsers"), where("councilId", "==", councilId))
	);
	return (
		<>
			{loading ? <Spinner size={50} colorScheme={"orange"} /> : <></>}
			<ScrollView>
				{value?.docs.map((user) => {
					const userData = user.data() as councilMember;
					return (
						<Box key={userData.userUid}>
							<Text>{userData.status}</Text>
							<Text>{userData.userUid}</Text>
						</Box>
					);
				})}
			</ScrollView>
		</>
	);
};
export default observer(CouncilMembersPage);

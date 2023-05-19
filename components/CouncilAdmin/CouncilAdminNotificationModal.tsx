import { doc } from "firebase/firestore";
import { observer } from "mobx-react-lite";
import { Box, Button, VStack, HStack, Modal, ScrollView, Spinner, Text, ZStack } from "native-base";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth, db } from "../../Services/firebase/firebaseinit";
import AppStore from "../../Stores/AppStore";
import { useEffect, useState } from "react";
import { council, message } from "../../entities/council";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CreateNewMessageModal from "./CreateNewMessage/CreateNewMessageModal";
import SingleMessageView from "../Council/SingleMessageView";

function CouncilAdminNotificationModal() {
	const [messages, setMessages] = useState<message[]>();
	const [value, loading, error] = useDocument(doc(db, "councils", `${auth.currentUser?.uid}`));
	const [showModal, setShowModal] = useState(false);
	const height = Dimensions.get("screen").height;
	useEffect(() => {
		const councilData = value?.data() as council;
		const messages = councilData?.messages;
		setMessages(messages);
	}, [value]);

	if (loading) return <Spinner size={100} color={"orange.500"} />;
	return (
		<>
			<Box>
				<ScrollView>
					{messages?.map((message) => {
						return (
							<SingleMessageView key={message.id} message={message} /> 
						);
					})}
				</ScrollView>
			</Box>
			<Ionicons
				name='add-circle'
				color={"orange"}
				size={40}
				onPress={() => {
					setShowModal(true);
				}}
			/>

			<Modal
				isOpen={showModal}
				onClose={() => {
					setShowModal(false);
				}}>
				<Modal.Content height={"300px"}>
					<CreateNewMessageModal close={() => setShowModal(false)} />
				</Modal.Content>
			</Modal>
		</>
	);
}

export default observer(CouncilAdminNotificationModal);

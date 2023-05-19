import { doc } from "firebase/firestore";
import { observer } from "mobx-react-lite";
import { Box, Button, Center, Heading, Modal, Spinner, Text, ScrollView } from "native-base";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth, db } from "../../../Services/firebase/firebaseinit";
import AppStore from "../../../Stores/AppStore";
import React, { useEffect, useState } from "react";
import { council } from "../../../entities/council";
import { Dimensions } from "react-native";
import CouncilAdminCreateCouncilModal from "../../../components/CouncilAdmin/CouncilAdminCreateCouncilModal";
import AdminMemberList from "../../../components/CouncilAdmin/MemberList/AdminMemberList";
import { DashboardCellView } from "../../../components/Dashboard/DashboardCellView";
import { Ionicons } from "@expo/vector-icons";

function CouncilAdminPage() {
	const [councilData, setCouncilData] = useState<council>();
	const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
	const [value, loading, error] = useDocument(doc(db, "councils", `${auth.currentUser?.uid}`));
	useEffect(() => {
		let data = value?.data() as council;
		setCouncilData(data);
	}, [value]);
	const screenHeight = Dimensions.get("screen").height - 150;
	return (
		<>
			<Box>
				{councilData ? (
					<Heading>{councilData.title}</Heading>
				) : loading ? (
					<></>
				) : (
					<Center height={screenHeight}>
						<Box>
							<Heading marginBottom={"20px"}>У вас нет совета</Heading>
							<Button
								backgroundColor={"orange.500"}
								borderRadius={20}
								onPress={() => setShowCreateModal(true)}>
								Создать совет
							</Button>
						</Box>
					</Center>
				)}
				{loading ? (
					<Center>
						<Spinner size={50} colorScheme={"orange"} />
					</Center>
				) : (
					<>
						<ScrollView padding={'5px'} width={'100%'} height={"100%"}>
							<Box width={"150px"}>
								<DashboardCellView
									title={"Участники"}
									icon={<Ionicons name={"people"} size={50} color={"white"} />}
									page={<AdminMemberList/>}
								/>
							</Box>
						</ScrollView>
					</>
				)}
			</Box>
			<Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
				<Modal.Content height={"300px"} width={"98%"}>
					<Modal.CloseButton />
					<Box marginTop={"50px"}>
						<CouncilAdminCreateCouncilModal closeModal={() => setShowCreateModal(false)} />
					</Box>
				</Modal.Content>
			</Modal>
			{/* <Modal>
				<Modal.Content height={screenHeight}>
                <Modal.CloseButton />
					<Box marginTop={"50px"}>
						<AdminMemberList />
					</Box>
                </Modal.Content>
			</Modal> */}
		</>
	);
}

export default observer(CouncilAdminPage);

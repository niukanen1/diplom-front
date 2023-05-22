import { doc } from "firebase/firestore";
import { observer } from "mobx-react-lite";
import { Box, Heading, Button, Modal, ScrollView, Text } from "native-base";
import React, { useState, useEffect } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Dimensions } from "react-native";
import { db, auth } from "../../../../Services/firebase/firebaseinit";
import JoinCouncilList from "../../../../components/Council/JoinCouncilList";
import { councilMember } from "../../../../entities/council";
import { status } from "../../../../entities/council";
import MessagesList from "../../../../components/Council/MessagesList";
import { getCouncilAdminUid } from "../../../../Services/firebase/queries/CouncilQueries";
import AppStore from "../../../../Stores/AppStore";

function CouncilMessagesPage() {
	const [councilMemberData, setCouncilMemberData] = useState<councilMember | undefined>(undefined);
	const [value, loading, error] = useDocument(doc(db, "councilUsers", `${auth.currentUser?.uid}`));
    const [showModal, setShowModal] = useState(false);
    const [adminUid, setAdminUid] = useState<string | undefined>(undefined);
	useEffect(() => {
		if (value?.data()) {
			const decoded = value?.data() as councilMember;
			setCouncilMemberData(decoded);
		} else {
			setCouncilMemberData(undefined);
		}
	}, [value]);
    useEffect(() => { 
        if (AppStore.currentCouncilId) { 
            getCouncilAdminUid(AppStore.currentCouncilId).then(adminUid => {
                if (adminUid) { 
                    setAdminUid(adminUid)
                }
             
                // console.log(adminUid);
            }).catch(err => { 
                console.log("errr");
                console.log(err);
            }) 
        }
        
    }, [AppStore.currentCouncilId])
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
                    {adminUid ? (<MessagesList adminCouncilUid={adminUid} />) : <></> }
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

export default observer(CouncilMessagesPage)
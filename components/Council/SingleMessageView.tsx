import { observer } from "mobx-react-lite";
import { Box, HStack, VStack, Text, Modal, Pressable, ScrollView } from "native-base";
import { message } from "../../entities/council";
import { useState } from "react";

function SingleMessageView({ message }: { message: message }) {
	const [showModal, setShowModal] = useState(false);
	return (
		<Pressable
			_pressed={{ backgroundColor: "gray.500" }}
			paddingY={"15px"}
			paddingX={"10px"}
			borderRadius={"10px"}
			backgroundColor={"gray.100"}
			onPress={() => {
				setShowModal(true);
			}}>
			<Box>
				<HStack justifyContent={"space-between"} alignItems={"center"}>
					<VStack>
						<Text>{message?.title}</Text>
						{message.description == "" ? <></> : <Text maxHeight={5}>{message?.description}</Text>}
					</VStack>
					<Text>{message.date.toDate().toLocaleDateString()}</Text>
				</HStack>
			</Box>
			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
				<Modal.Content height={"100%"} width={"100%"} padding={"20px"}>
					<Modal.CloseButton />
					<ScrollView paddingTop={'40px'}>
						<Text fontSize={"xl"}>{message.title}</Text>
						<Text>{message.description}</Text>
					</ScrollView>
				</Modal.Content>
			</Modal>
		</Pressable>
	);
}

export default observer(SingleMessageView);

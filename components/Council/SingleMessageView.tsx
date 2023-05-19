import { observer } from "mobx-react-lite";
import { Box, HStack, VStack, Text, Modal, Pressable, ScrollView } from "native-base";
import { message } from "../../entities/council";
import { useState } from "react";

function SingleMessageView({ message }: { message: message }) {
    const [showModal, setShowModal] = useState(false);
	return (
		<Pressable onPress={() => { 
            setShowModal(true)
        }}>
			<Box>
				<HStack justifyContent={"space-between"}>
					<VStack>
						<Text>{message?.title}</Text>
						<Text maxHeight={5}>{message?.description}</Text>
					</VStack>
					<Text>{message.date.toDate().toLocaleDateString()}</Text>
				</HStack>
			</Box>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content height={"100%"} width={"100%"} padding={"20px"}>
                    <ScrollView>
                        <Text fontSize={'xl'}>{message.title}</Text>
                        <Text>{message.description}</Text>
                    </ScrollView>
                </Modal.Content>
            </Modal>
		</Pressable>
	);
}

export default observer(SingleMessageView);

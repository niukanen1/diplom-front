import { Box, HStack, Heading, Modal, Pressable, Spacer, Text, VStack } from "native-base";
import { ReactNode, useState } from "react";
import { Dimensions } from "react-native";

export function DashboardCellView({ title, icon, page }: { title: string; icon: ReactNode; page: ReactNode }) {
	const [showModal, setShowModal] = useState(false);
	const screenHeight = Dimensions.get("window").height;
	return (
		<>
			<Pressable onPress={() => setShowModal(true)}  width={"170px"} >
				<Box backgroundColor={"green.600"} padding={"10px"} borderRadius={"10px"}height={'110px'} >
					<VStack alignItems={"center"}>
						<HStack>
							{icon}
							<Spacer />
						</HStack>

						<Spacer />
						<Heading alignSelf={'flex-start'} color={"white"}>{title}</Heading>
					</VStack>
				</Box>
			</Pressable>

			<Modal
				isOpen={showModal}
				onClose={() => {
					setShowModal(false);
				}}>
				<Modal.Content height={screenHeight} width={"100%"} paddingTop='40px'>
					<Modal.CloseButton />
					<Modal.Body>
                        {page}
                    </Modal.Body>
				</Modal.Content>
			</Modal>
		</>
	);
}

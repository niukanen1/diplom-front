import { Box, HStack, Heading, Modal, Pressable, Spacer, Text, VStack } from "native-base";
import { ReactNode, useState } from "react";
import { Dimensions } from "react-native";

export function DashboardCellView({ title, icon, page }: { title: string; icon: ReactNode; page: ReactNode }) {
	const [showModal, setShowModal] = useState(false);
	const screenHeight = Dimensions.get("window").height;
	const Icon = () => icon;
	return (
		<>
			<Pressable onPress={() => setShowModal(true)}>
				<Box backgroundColor={"green.600"} padding={"10px"} borderRadius={"10px"}>
					<VStack alignItems={"center"}>
						<HStack>
							{icon}
							<Spacer />
						</HStack>

						<Spacer />
						<Heading color={"white"}>{title}</Heading>
					</VStack>
				</Box>
			</Pressable>

			<Modal
				isOpen={showModal}
				onClose={() => {
					setShowModal(false);
				}}>
				<Modal.Content height={screenHeight - 200} width={"100%"} paddingTop='40px'>
					<Modal.CloseButton />
					<Modal.Body>
                        {page}
                    </Modal.Body>
				</Modal.Content>
			</Modal>
		</>
	);
}

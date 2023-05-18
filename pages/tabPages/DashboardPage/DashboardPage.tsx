import { Box, FlatList, Flex, HStack, Heading, Modal, Pressable, ScrollView, VStack } from "native-base";
import { data } from "./dashboardData";
import { DashboardCellView } from "../../../components/Dashboard/DashboardCellView";
import { useState } from "react";
import { Dimensions } from "react-native";

export function DashboardPage() {
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState<() => JSX.Element>();
	const screenHeight = Dimensions.get("window").height;
	return (
		<>

				<FlatList
					data={data}
					padding={"10px"}
					numColumns={2}
					renderItem={(item) => {
						return (
							<Pressable
								onPress={() => {
									// setShowModal(true);
									// setModalContent(item.item.page)
								}}>
								<DashboardCellView
									title={item.item.title}
									icon={item.item.icon}
									page={item.item.page}
								/>
							</Pressable>
						);
					}}
				/>
		</>
	);
}

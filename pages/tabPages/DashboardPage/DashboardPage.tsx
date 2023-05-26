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
                    ItemSeparatorComponent={() => ( 
                        <Box height={"10px"}></Box>  
                    )}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
					renderItem={(item) => {
						return (
							<Pressable>
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

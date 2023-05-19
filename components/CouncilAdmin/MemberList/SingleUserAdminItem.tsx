import { doc } from "firebase/firestore";
import { Actionsheet, Badge, Box, Button, HStack, Pressable, Spinner, Text, VStack, useToast } from "native-base";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../../Services/firebase/firebaseinit";
import { useEffect, useState } from "react";
import { user } from "../../../entities/user";
import { councilMember, status } from "../../../entities/council";
import { UpdateCouncilMemberData } from "../../../Services/firebase/queries/CouncilQueries";

export function SingleUserAdminItem({
	userUid,
	councilMemberData,
}: {
	userUid: string;
	councilMemberData: councilMember;
}) {
	const [userData, setUserData] = useState<user>();
	const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
	const [value, loading, error] = useDocument(doc(db, "users", userUid));
	const toast = useToast();
	useEffect(() => {
		setUserData(value?.data() as user);
	}, [value]);
	if (loading) return <Spinner size={50} color={"orange.500"} />;
	return (
		<>
			<Pressable
				onPress={() => {
					setShowActionSheet(true);
				}}>
				<Box paddingY={"10px"}>
					<HStack justifyContent={"space-between"}>
						<VStack>
							<Text fontWeight={"bold"}>{userData?.name}</Text>
							<Text>{userData?.email}</Text>
						</VStack>
						{councilMemberData.status == status.notActivated ? (
							<Badge colorScheme={"error"}>Не активирован</Badge>
						) : (
							<Badge colorScheme={"success"}>Активирован</Badge>
						)}
					</HStack>
				</Box>
			</Pressable>
			<Actionsheet
				isOpen={showActionSheet}
				onClose={() => {
					setShowActionSheet(false);
				}}>
				<Actionsheet.Content>
					{councilMemberData.status == status.notActivated ? (
						<>
							<Actionsheet.Item
								onPress={async () => {
									const updatedData = councilMemberData;
									updatedData.status = status.activated;
									try {
										await UpdateCouncilMemberData(updatedData);
										setShowActionSheet(false);
									} catch (err) {
										let error = err as Error;
										toast.show({
											colorScheme: "error",
											title: "Ошибка",
											description: error.message,
										});
										return;
									}
									toast.show({ colorScheme: "success", title: "Успешно активирован" });
								}}>
								Активировать
							</Actionsheet.Item>
						</>
					) : (
						<>
                            <Actionsheet.Item onPress={async () => {
									const updatedData = councilMemberData;
									updatedData.status = status.notActivated;
									try {
										await UpdateCouncilMemberData(updatedData);
										setShowActionSheet(false);
									} catch (err) {
										let error = err as Error;
										toast.show({
											colorScheme: "error",
											title: "Ошибка",
											description: error.message,
										});
										return;
									}
									toast.show({ colorScheme: "success", title: "Успешно активирован" });
								}}>
                                Деактивировать
                            </Actionsheet.Item>
                        </>
					)}
				</Actionsheet.Content>
			</Actionsheet>
		</>
	);
}

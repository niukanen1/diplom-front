import { Box, Button, Flex, Heading, Spacer, VStack, Text, Avatar, ScrollView } from "native-base";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../Services/firebase/firebaseinit";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { capitalizeFirstLetter } from "../../../Services/Helpers/capitalizeFirstLetter";
import { GroupListSelection, reqType } from "../DashboardPage/dashBoardPages/SchedulePage";
import { useAssets } from "expo-asset";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
import { images } from "../../../images";

const StackNavigator = createNativeStackNavigator();

export function ProfileNavigator() {
	return (
		<StackNavigator.Navigator>
			<StackNavigator.Screen name={"profile"} component={ProfilePageView} options={{ headerShown: false }} />
			<StackNavigator.Screen name={"Settings"}>{() => <Settings />}</StackNavigator.Screen>
		</StackNavigator.Navigator>
	);
}

function Settings() {
	const [groupId, setGroupId] = useState<string | undefined>(undefined);
	const [groupName, setGroupName] = useState<string | undefined>(undefined);

	const [teacherId, setTeacherId] = useState<string | undefined>(undefined);
	const [teacherName, setTeacherName] = useState<string | undefined>(undefined);

	const [roomId, setRoomId] = useState<string | undefined>(undefined);
	const [roomName, setRoomName] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (groupId && groupName) {
			AsyncStorage.setItem("group", JSON.stringify({ id: groupId, name: groupName })).catch((error: any) => {
				console.log("ERROR");
				console.log(error);
			});
		}
	}, [groupId, groupName]);

	useEffect(() => {
		if (teacherId && teacherName) {
			AsyncStorage.setItem("teacher", JSON.stringify({ id: teacherId, name: teacherName })).catch(
				(error: any) => {
					console.log("ERROR");
					console.log(error);
				}
			);
		}
	}, [teacherId, teacherName]);

	useEffect(() => {
		if (roomId && roomName) {
			AsyncStorage.setItem("room", JSON.stringify({ id: roomId, name: roomName })).catch((error: any) => {
				console.log("ERROR");
				console.log(error);
			});
		}
	}, [roomId, roomName]);

	return (
		<VStack
			marginTop={"10px"}
			marginX={"10px"}
			paddingY={"20px"}
			paddingX={"10px"}
			space={"20px"}
			backgroundColor={"white"}
			borderRadius={20}>
			<VStack space={"10px"}>
				<Heading>Выберете группу по умолчанию</Heading>
				<GroupListSelection type={reqType.group} setId={setGroupId} setNameMain={setGroupName} />
			</VStack>
			<VStack space={"10px"}>
				<Heading>Выберете учителя по умолчанию</Heading>
				<GroupListSelection type={reqType.teacher} setId={setTeacherId} setNameMain={setTeacherName} />
			</VStack>
			<VStack space={"10px"}>
				<Heading>Выберете кабинет по умолчанию</Heading>
				<GroupListSelection type={reqType.room} setId={setRoomId} setNameMain={setRoomName} />
			</VStack>
		</VStack>
	);
}

export function ProfilePageView({ navigation }: { navigation: any }) {
	const [signOut, loading, error] = useSignOut(auth);
	const currentUserEmail = auth.currentUser?.email;
	const avatarURI = Image.resolveAssetSource(images.avatar);
	return (
		<Flex justifyContent={"space-between"} h={"100%"}>
			<Flex>
				<Flex
					direction={"row"}
					alignItems='flex-start'
					padding={"20px"}
					paddingTop={"50px"}
					borderBottomRightRadius={"50px"}
					backgroundColor={"#1D8650"}>
					<Avatar
						borderColor={"#ffffff"}
						borderWidth={"6"}
						size='xl'
						source={{ uri: avatarURI.uri }} // Замените 'URL_аватарки' на URL вашей аватарки
					/>
					<Box paddingLeft={"15px"}>
						<Text color={"white"} fontSize={"26"} fontWeight={"600"}>
							{currentUserEmail}
						</Text>
						<Text color={"white"} fontSize={"18"} fontWeight={"400"}>
							{currentUserEmail ? capitalizeFirstLetter(currentUserEmail.split(".")[0]) : "-"}{" "}
							{currentUserEmail
								? capitalizeFirstLetter(currentUserEmail.split(".")[1].split("@")[0])
								: "-"}
						</Text>
					</Box>
				</Flex>
				<Box paddingX={'5px'}>
					<Flex
						width={"100%"}
						flexDirection={"row"}
						justifyContent={"space-between"}
						onTouchEnd={() => navigation.navigate("Settings")}
						backgroundColor={"white"}
						marginTop={2}
						padding={3}
						borderRadius={20}>
						<Text fontSize={16} fontWeight={500}>
							Настройки
						</Text>
						<AntDesign name='rightcircleo' size={24} color='black' />
					</Flex>
				</Box>
			</Flex>

			<Button
				marginBottom={"10px"}
				marginX={"5px"}
				backgroundColor={"red.500"}
				borderRadius={"40px"}
				onPress={async () => {
					await AsyncStorage.removeItem("tahvel-token");
					await AsyncStorage.removeItem("group");
					await AsyncStorage.removeItem("teacher");
					await AsyncStorage.removeItem("room");
					await AsyncStorage.removeItem("user").then(() => signOut());
				}}
				isLoading={loading}>
				Выйти
			</Button>
		</Flex>
	);
}

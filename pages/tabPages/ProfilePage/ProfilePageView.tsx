import {
    Box,
    Button,
    Flex,
    Heading,
    Spacer,
    VStack,
    Text,
    Avatar,
    ScrollView,
} from "native-base";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../Services/firebase/firebaseinit";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { capitalizeFirstLetter } from "../../../Services/Helpers/capitalizeFirstLetter";
import {
    GroupListSelection,
    reqType,
} from "../DashboardPage/dashBoardPages/SchedulePage";
import { useEffect, useState } from "react";

const StackNavigator = createNativeStackNavigator();

export function ProfileNavigator() {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name={"profile"}
                component={ProfilePageView}
                options={{ headerShown: false }}
            />
            <StackNavigator.Screen name={"Settings"}>
                {() => <Settings />}
            </StackNavigator.Screen>
        </StackNavigator.Navigator>
    );
}

function Settings() {
    const [groupId, setGroupId] = useState<string | undefined>(undefined);
    const [groupName, setGroupName] = useState<string | undefined>(undefined);

    const [teacherId, setTeacherId] = useState<string | undefined>(undefined);
    const [teacherName, setTeacherName] = useState<string | undefined>(
        undefined
    );

    const [roomId, setRoomId] = useState<string | undefined>(undefined);
    const [roomName, setRoomName] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (groupId) {
            AsyncStorage.setItem(
                "group",
                JSON.stringify({ id: groupId, name: groupName })
            ).catch((error: any) => {
                console.log(error);
            });
        }
    }, [groupId, groupName]);

    useEffect(() => {
        if (teacherId) {
            AsyncStorage.setItem(
                "teacher",
                JSON.stringify({ id: teacherId, name: teacherName })
            ).catch((error: any) => {
                console.log(error);
            });
        }
    }, [teacherId, teacherName]);

    useEffect(() => {
        if (roomId) {
            AsyncStorage.setItem(
                "room",
                JSON.stringify({ id: roomId, name: roomName })
            ).catch((error: any) => {
                console.log(error);
            });
        }
    }, [roomId, roomName]);

    return (
        <Box>
            <Heading>Choose default Group</Heading>
            <GroupListSelection
                type={reqType.group}
                setId={setGroupId}
                setNameMain={setGroupName}
            />
            <Heading>Choose default Teacher</Heading>
            <GroupListSelection
                type={reqType.teacher}
                setId={setTeacherId}
                setNameMain={setTeacherName}
            />
            <Heading>Choose default Room</Heading>
            <GroupListSelection
                type={reqType.room}
                setId={setRoomId}
                setNameMain={setRoomName}
            />
        </Box>
    );
}

export function ProfilePageView({ navigation }: { navigation: any }) {
    const [signOut, loading, error] = useSignOut(auth);
    const currentUserEmail = auth.currentUser?.email;
    return (
        <Flex justifyContent={"space-between"} h={"100%"}>
            <Flex
                direction={"row"}
                alignItems="flex-start"
                padding={"20px"}
                paddingTop={"50px"}
                borderBottomRightRadius={"50px"}
                backgroundColor={"#1D8650"}
            >
                <Avatar
                    borderColor={"#ffffff"}
                    borderWidth={"6"}
                    size="xl"
                    source={{ uri: "URL_аватарки" }} // Замените 'URL_аватарки' на URL вашей аватарки
                />
                <Box paddingLeft={"15px"}>
                    <Text color={"white"} fontSize={"26"} fontWeight={"600"}>
                        {currentUserEmail}
                    </Text>
                    <Text color={"white"} fontSize={"18"} fontWeight={"400"}>
                        {currentUserEmail
                            ? capitalizeFirstLetter(
                                  currentUserEmail.split(".")[0]
                              )
                            : "-"}{" "}
                        {currentUserEmail
                            ? capitalizeFirstLetter(
                                  currentUserEmail.split(".")[1].split("@")[0]
                              )
                            : "-"}
                    </Text>
                </Box>
            </Flex>

            <Button onPress={() => navigation.navigate("Settings")}>
                Settings
            </Button>

            <Button
                marginBottom={"10px"}
                backgroundColor={"red.500"}
                onPress={() => {
                    AsyncStorage.removeItem("user").then(() => signOut());
                }}
                isLoading={loading}
            >
                Выйти
            </Button>
        </Flex>
    );
}

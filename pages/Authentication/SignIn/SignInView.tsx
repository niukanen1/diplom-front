import {
    Alert,
    Box,
    Button,
    Center,
    FormControl,
    HStack,
    Heading,
    Input,
    Link,
    Text,
    VStack,
} from "native-base";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { SafeAreaView } from "react-native";
import { auth } from "../../../Services/firebase/firebaseinit";
import { getAuthError } from "../../../Services/ErrorHandlers/FirebaseErrors/authErrorHandler";
import { useNavigation } from "@react-navigation/native";
import getCurrentStudyYear from "../../../Services/tahvelApi/getCurrentStudyYear";
import getGroups from "../../../Services/tahvelApi/getGroups";
import getRooms from "../../../Services/tahvelApi/getRooms";
import getTeachers from "../../../Services/tahvelApi/getTeachers";
import getScheduleEvents from "../../../Services/tahvelApi/getScheduleEvents";
import Shape from "../../../components/Visual/Shape";

export function SignInView({ navigation }: any) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [signIn, _, loading, error] = useSignInWithEmailAndPassword(auth);
    (async () => {
        //console.log(await getCurrentStudyYear())
        //console.log(await getGroups("SPT"))
        //console.log(await getGroups())
        //console.log(await getRooms("Si"))
        //console.log(await getRooms())
        //console.log(await getTeachers("Lo"))
        //console.log(await getTeachers())
        //console.log(await getScheduleEvents("2023-05-15T00:00:00Z", "2023-05-21T00:00:00Z", "1606"))
        //console.log(await getScheduleEvents("2023-05-15T00:00:00Z", "2023-05-21T00:00:00Z", null, "4469"))
        //console.log(await getScheduleEvents("2023-05-15T00:00:00Z", "2023-05-21T00:00:00Z", null, null, "1842"))
        //console.log(await getScheduleEvents("2023-05-15T00:00:00Z", "2023-05-21T00:00:00Z"))
    })();
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
            <Shape
                color="#F15A22"
                svgPath="M14.8301 0H337V282.482C299.656 301.955 262.307 295.541 252.613 275.146C203.181 171.146 155.113 112.646 75.6128 162.146C1.28025 208.428 -16.6646 77.6804 14.8301 0Z"
                width={200}
                height={200}
                top={0}
                right={0}
            />
            <Box padding={"15px"}>
                <Heading size={"3xl"}>Войти</Heading>
            </Box>
            <Center>
                <VStack w={"90%"} space={"5"}>
                    {error ? (
                        <>
                            <Alert status="error">
                                <VStack
                                    w={"100%"}
                                    alignItems={"flex-start"}
                                    textAlign={"left"}
                                >
                                    <HStack alignItems={"center"} space={"2"}>
                                        <Alert.Icon />
                                        <Heading>Ошибка</Heading>
                                    </HStack>
                                    <Text marginLeft={"6"}>
                                        {getAuthError(error)}
                                    </Text>
                                    <Text marginLeft={"6"}>{error.code}</Text>
                                </VStack>
                            </Alert>
                        </>
                    ) : (
                        <></>
                    )}
                    <VStack>
                        <FormControl isRequired>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input
                                size={"2xl"}
                                keyboardType="email-address"
                                autoCapitalize={"none"}
                                autoCorrect={false}
                                type="text"
                                placeholder="Email"
                                onChangeText={(newEmail) => {
                                    setEmail(newEmail);
                                }}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormControl.Label>Пароль</FormControl.Label>
                            <Input
                                size={"2xl"}
                                type="password"
                                placeholder="Пароль"
                                onChangeText={(pass) => {
                                    setPassword(pass);
                                }}
                            />
                        </FormControl>
                    </VStack>
                    <Button
                        backgroundColor={"orange.500"}
                        size={"lg"}
                        isLoading={loading}
                        onPress={() => {
                            signIn(email, password);
                        }}
                    >
                        Войти
                    </Button>
                    <Center>
                        <HStack space={"3"}>
                            <Text>Нет аккаунта?</Text>
                            <Text
                                onPress={() => {
                                    navigation.navigate("SignUp");
                                }}
                                color={"orange.500"}
                            >
                                Зарегистрироваться
                            </Text>
                        </HStack>
                    </Center>
                </VStack>
            </Center>
        </SafeAreaView>
    );
}

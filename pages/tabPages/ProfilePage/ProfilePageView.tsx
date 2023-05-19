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

const StackNavigator = createNativeStackNavigator();

export function ProfileNavigator() { 
    return ( 
        <StackNavigator.Navigator>
            <StackNavigator.Screen name={"profile"} component={ProfilePageView} options={{headerShown: false}} /> 
            <StackNavigator.Screen name={"groupSettings"} component={() => ( <Box>Hello</Box>)} /> 
        </StackNavigator.Navigator>
    )
}
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ProfilePageView({navigation} : {navigation: any}) {
    const [signOut, loading, error] = useSignOut(auth);
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
                        Your email
                    </Text>
                    <Text color={"white"} fontSize={"18"} fontWeight={"400"}>
                        Full name
                    </Text>
                </Box>
            </Flex>

            <Button onPress={() => navigation.navigate("groupSettings")}>Settings</Button>
            
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

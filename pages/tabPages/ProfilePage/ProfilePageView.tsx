import {
    Box,
    Button,
    Flex,
    Heading,
    Spacer,
    VStack,
    Text,
    Avatar,
} from "native-base";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../Services/firebase/firebaseinit";

export function ProfilePageView() {
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
            <Button
                marginBottom={"10px"}
                backgroundColor={"red.500"}
                onPress={() => {
                    signOut();
                }}
                isLoading={loading}
            >
                Выйти
            </Button>
        </Flex>
    );
}

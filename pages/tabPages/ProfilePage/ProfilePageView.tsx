import { Box, Button, Flex, Heading, Spacer, VStack, Text, Avatar } from "native-base";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../Services/firebase/firebaseinit";

export function ProfilePageView() { 
    const [signOut, loading, error] = useSignOut(auth);
    return ( 
        <Flex justifyContent={'space-between'} h={'100%'}>
            <Flex alignItems="center" padding={"25px"} borderBottomRightRadius={"50px"} height={"100px"}>
                <Avatar
                    size="lg"
                    source={{ uri: 'URL_аватарки' }} // Замените 'URL_аватарки' на URL вашей аватарки
                />
                <Box backgroundColor={"#1D8650"} >
                    <Text color={"white"}>Your email</Text>
                    <Text color={"white"}>Full name</Text>
                </Box>
            </Flex>
            <Button backgroundColor={'red.500'} onPress={() => {signOut()}} isLoading={loading}>Выйти</Button>
        </Flex>
    )
}
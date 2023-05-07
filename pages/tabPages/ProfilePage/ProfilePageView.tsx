import { Box, Button, Flex, Heading, Spacer, VStack } from "native-base";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../Services/firebase/firebaseinit";

export function ProfilePageView() { 
    const [signOut, loading, error] = useSignOut(auth);
    return ( 
        <Flex justifyContent={'space-between'} h={'100%'} padding={'5px'}>
            <Button backgroundColor={'red.500'} onPress={() => {signOut()}} isLoading={loading}>Выйти</Button>
        </Flex>
    )
}
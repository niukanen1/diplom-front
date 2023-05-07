import { Alert, Box, Button, Center, FormControl, HStack, Heading, Input, Link, Text, VStack } from "native-base";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { SafeAreaView } from "react-native";
import { auth } from "../../../Services/firebase/firebaseinit";
import { getAuthError } from "../../../Services/ErrorHandlers/FirebaseErrors/authErrorHandler";
import { useNavigation } from "@react-navigation/native";

export function SignInView({navigation}: any) {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [signIn, _, loading, error] = useSignInWithEmailAndPassword(auth);
	return (
		<SafeAreaView>
			<Box padding={"15px"}>
				<Heading size={"3xl"}>Войти</Heading>
			</Box>
			<Center>
				<VStack w={"90%"} space={"5"}>
					{error ? (
						<>
							<Alert status='error'>
								<VStack w={"100%"} alignItems={"flex-start"} textAlign={"left"}>
									<HStack alignItems={"center"} space={"2"}>
										<Alert.Icon />
										<Heading>Ошибка</Heading>
									</HStack>
									<Text marginLeft={"6"}>{getAuthError(error)}</Text>
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
								keyboardType='email-address'
								autoCapitalize={"none"}
								autoCorrect={false}
								type='text'
								placeholder='Email'
                                onChangeText={newEmail => { 
                                    setEmail(newEmail)
                                }}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormControl.Label>Пароль</FormControl.Label>
							<Input size={"2xl"} type='password' placeholder='Пароль' onChangeText={pass => { 
                                setPassword(pass)
                            }} />
						</FormControl>
					</VStack>
					<Button
						backgroundColor={"orange.500"}
						size={"lg"}
						isLoading={loading}
						onPress={() => {
							signIn(email, password);
						}}>
						Войти
					</Button>
					<Center>
						<HStack space={"3"}>
							<Text>Нет аккаунта?</Text>
							<Text onPress={() => { 
                                navigation.navigate("SignUp")
                            }} color={"orange.500"}>Зарегистрироваться</Text>
						</HStack>
					</Center>
				</VStack>
			</Center>
		</SafeAreaView>
	);
}

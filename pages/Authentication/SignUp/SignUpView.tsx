import { Alert, Box, Center, Text, FormControl, Heading, Input, VStack, HStack, Button, Slide } from "native-base";
import { useEffect, useState } from "react";
import { SignUpDataType } from "../../../entities/forms";
import { SafeAreaView } from "react-native";
import { getAuthError } from "../../../Services/ErrorHandlers/FirebaseErrors/authErrorHandler";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../Services/firebase/firebaseinit";

export default function SignUpView({ navigation }: any) {
	const [signUpData, setSignUpData] = useState<SignUpDataType>({
		email: "",
		password: "",
		passwordConfirmation: "",
	});
	const [signUp, _, loading, error] = useCreateUserWithEmailAndPassword(auth);
	const [passwordsNotMatching, setPasswordNotMatching] = useState(false);

	useEffect(() => {
		if (signUpData.password != signUpData.passwordConfirmation) {
			setPasswordNotMatching(true);
		} else {
			setPasswordNotMatching(false);
		}
	}, [signUpData]);
	return (
		<SafeAreaView>
			<Box padding={"15px"}>
				<Heading size={"3xl"}>Добро пожаловать</Heading>
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
								onChangeText={(newEmail) => {
									setSignUpData({ ...signUpData, email: newEmail });
								}}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormControl.Label>Пароль</FormControl.Label>
							<Input
								size={"2xl"}
								type='password'
								placeholder='Пароль'
								onChangeText={(pass) => {
									setSignUpData({ ...signUpData, password: pass });
								}}
							/>
						</FormControl>
						<FormControl isRequired isInvalid={passwordsNotMatching} >
							<FormControl.Label>Подтверждение</FormControl.Label>
							<Input
								size={"2xl"}
								type='password'
								placeholder='Подтвердите пароль'
								onChangeText={(pass) => {
									setSignUpData({ ...signUpData, passwordConfirmation: pass });
								}}
							/>
                            <FormControl.ErrorMessage>
                                Пароли не совпадают
                            </FormControl.ErrorMessage>
						</FormControl>
					</VStack>
					<Button
						backgroundColor={"orange.500"}
						size={"lg"}
						isLoading={loading}
						onPress={() => {
							signUp(signUpData.email, signUpData.password);
						}}>
						Зарегистрироваться
					</Button>
					<Center>
						<HStack space={"3"}>
							<Text>Уже есть аккаунт?</Text>
							<Text
								onPress={() => {
									navigation.goBack();
								}}
								color={"orange.500"}>
								Войти
							</Text>
						</HStack>
					</Center>
				</VStack>
			</Center>
		</SafeAreaView>
	);
}

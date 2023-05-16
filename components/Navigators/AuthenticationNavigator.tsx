import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInView } from "../../pages/Authentication/SignIn/SignInView";
import SignUpView from "../../pages/Authentication/SignUp/SignUpView";

const Stack = createNativeStackNavigator();

export function AuthenticationNavigator() {
	return (
		<>
			<Stack.Navigator
				screenOptions={{ headerShown: false, gestureDirection: "vertical", gestureEnabled: false }}>
				<Stack.Screen name='SignIn' component={SignInView} />
				<Stack.Screen name='SignUp' component={SignUpView} />
			</Stack.Navigator>
		</>
	);
}

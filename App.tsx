import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePageView from "./pages/tabPages/HomePage/HomePageView";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Services/firebase/firebaseinit";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInView } from "./pages/Authentication/SignIn/SignInView";
import SignUpView from "./pages/Authentication/SignUp/SignUpView";
import { ProfilePageView } from "./pages/tabPages/ProfilePage/ProfilePageView";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {
	const [user, loading, error] = useAuthState(auth);

	return (
		<NativeBaseProvider>
			<NavigationContainer>
				{user ? (
					<>
						<Tab.Navigator>
							<Tab.Screen name='Home' component={HomePageView} options={{title: "Главная"}}/>
							<Tab.Screen name='Profile' component={ProfilePageView} options={{title: "Профиль"}}/>
						</Tab.Navigator>
					</>
				) : (
					<>
                        <Stack.Navigator screenOptions={{headerShown: false, gestureDirection: 'vertical', gestureEnabled: false}}>
                            <Stack.Screen name="SignIn" component={SignInView}/>
                            <Stack.Screen name="SignUp" component={SignUpView}/>
                        </Stack.Navigator>
                    </>
				)}
			</NavigationContainer>
            <StatusBar style='auto' />
		</NativeBaseProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

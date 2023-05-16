import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Services/firebase/firebaseinit";
import { AuthenticationNavigator } from "./components/Navigators/AuthenticationNavigator";
import { AppMainFlowTabNavigator } from "./components/Navigators/AppMainFlowTabNavigator";


export default function App() {
	const [user, loading, error] = useAuthState(auth);
	return (
		<NativeBaseProvider>
			<NavigationContainer>
				{user ? (
                    <AppMainFlowTabNavigator />
				) : (
					<AuthenticationNavigator/>
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

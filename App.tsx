import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Services/firebase/firebaseinit";
import { AuthenticationNavigator } from "./components/Navigators/AuthenticationNavigator";
import { AppMainFlowTabNavigator } from "./components/Navigators/AppMainFlowTabNavigator";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function App() {
	const [user, loading, error] = useAuthState(auth);
	return (
		<QueryClientProvider client={queryClient}>
			<NativeBaseProvider>
				<NavigationContainer>
					{user ? <AppMainFlowTabNavigator /> : <AuthenticationNavigator />}
				</NavigationContainer>
				<StatusBar style='auto' />
			</NativeBaseProvider>
		</QueryClientProvider>
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

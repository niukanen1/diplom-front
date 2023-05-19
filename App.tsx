import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./Services/firebase/firebaseinit";
import { AuthenticationNavigator } from "./components/Navigators/AuthenticationNavigator";
import AppMainFlowTabNavigator from "./components/Navigators/AppMainFlowTabNavigator";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import AppStore from "./Stores/AppStore";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { adminData } from "./entities/council";

const queryClient = new QueryClient();

function App() {
	const [user, loading, error] = useAuthState(auth);
    const [value, isLoading, ERR] = useDocument(doc(db, 'admins', `${user?.uid}`));
    useEffect(() => { 
        if (value?.data()) { 
            AppStore.setAdminData(value.data() as adminData)
        } else { 
            AppStore.deleteAdminData();
        }
    }, [value])
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

export default observer(App);

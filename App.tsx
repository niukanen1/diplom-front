import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePageView from "./pages/tabPages/HomePage/HomePageView";

const Tab = createBottomTabNavigator(); 

export default function App() {
	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<Tab.Navigator> 
                    <Tab.Screen name="Home" component={HomePageView}/>
                </Tab.Navigator>
                <StatusBar style='auto' />
			</NavigationContainer>
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

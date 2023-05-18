import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePageView from "../../pages/tabPages/HomePage/HomePageView";
import { ProfilePageView } from "../../pages/tabPages/ProfilePage/ProfilePageView";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
export function AppMainFlowTabNavigator() {
	return (
		<>
			<Tab.Navigator>
				<Tab.Screen
					name='Home'
					component={HomePageView}
					options={{
						title: "Главная",
						tabBarIcon: ({ focused, color, size }) => <Ionicons name='home' size={size} color={color} />,
					}}
				/>
				<Tab.Screen
					name='Profile'
					component={ProfilePageView}
					options={{
                        headerShown: false,
						title: "Профиль",
						tabBarIcon: ({ focused, color, size }) => <Ionicons name='person' size={size} color={color} />,
					}}
				/>
			</Tab.Navigator>
		</>
	);
}

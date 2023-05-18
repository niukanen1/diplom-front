import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePageView from "../../pages/tabPages/HomePage/HomePageView";
import { ProfilePageView } from "../../pages/tabPages/ProfilePage/ProfilePageView";
import { Ionicons } from "@expo/vector-icons";
import { DashboardPage } from "../../pages/tabPages/DashboardPage/DashboardPage";

const Tab = createBottomTabNavigator();
export function AppMainFlowTabNavigator() {
	return (
		<>
			<Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'orange' }}>
				<Tab.Screen
					name='Home'
					component={HomePageView}
					options={{
						title: "Главная",
						tabBarIcon: ({ focused, color, size }) => <Ionicons name='home' size={size} color={color} />,
					}}
				/>
                <Tab.Screen
					name='Dashboard'
					component={DashboardPage}
					options={{
						title: "Доска",
						tabBarIcon: ({ focused, color, size }) => <Ionicons name='grid' size={size} color={color} />,
					}}
				/>
				<Tab.Screen
					name='Profile'
					component={ProfilePageView}
					options={{
						title: "Профиль",
						tabBarIcon: ({ focused, color, size }) => <Ionicons name='person' size={size} color={color} />,
					}}
				/>
				
			</Tab.Navigator>
		</>
	);
}

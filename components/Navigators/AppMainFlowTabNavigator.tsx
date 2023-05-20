import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePageView from "../../pages/tabPages/HomePage/HomePageView";
import { ProfileNavigator, ProfilePageView } from "../../pages/tabPages/ProfilePage/ProfilePageView";
import { Ionicons } from "@expo/vector-icons";
import { DashboardPage } from "../../pages/tabPages/DashboardPage/DashboardPage";
import AppStore from "../../Stores/AppStore";
import { observer } from "mobx-react-lite";
import CouncilAdminPage from "../../pages/tabPages/CouncilAdminPage/CouncilAdminPage";

const Tab = createBottomTabNavigator();
function AppMainFlowTabNavigator() {
	return (
		<>
			<Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'orange' }}>
				<Tab.Screen
					name='Home'
					component={HomePageView}
					options={{
                        headerShown: false,
						title: "Главная",
						tabBarIcon: ({ focused, color, size }) => <Ionicons name='home' size={size} color={color} />,
					}}
				/>
                {AppStore.adminData ? <Tab.Screen 
                    name="CouncilAdmin"
                    component={CouncilAdminPage}
                    options={{
                        title: "Администраивная панель совета", 
                        tabBarIcon: ({focused, color, size}) => <Ionicons name="journal" size={size} color={color}/>
                    }}
                /> : <></>}
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
					component={ProfileNavigator}
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
export default observer(AppMainFlowTabNavigator)
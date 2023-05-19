import { SchedulePage } from "./dashBoardPages/SchedulePage";
import { dashboardCell } from "../../../entities/dashboard";
import { Ionicons } from "@expo/vector-icons";
import CouncilMembersPage from "./dashBoardPages/CouncilMembersPage";


export const data: dashboardCell[] = [
    {
        id: Date.now().toString(), 
        title: "Расписание", 
        page: <SchedulePage />,
        icon: <Ionicons name="grid" size={60} color={'white'}/>
    },
    { 
        id: Date.now().toString(), 
        title: "Учас совета", 
        page: <CouncilMembersPage />, 
        icon: <Ionicons name="people" size={60} color={'white'}/>
    }
]; 
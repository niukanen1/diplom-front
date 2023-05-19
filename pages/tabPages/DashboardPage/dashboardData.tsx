import { SchedulePage, reqType } from './dashBoardPages/SchedulePage';
import { dashboardCell } from "../../../entities/dashboard";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import CouncilMembersPage from "./dashBoardPages/CouncilMembersPage";


export const data: dashboardCell[] = [
    {
        id: Date.now().toString() + "group", 
        title: "Расписание", 
        page: <SchedulePage type={reqType.group}/>,
        icon: <Ionicons name="grid" size={60} color={'white'}/>
    },
    {
        id: Date.now().toString() + "teacher", 
        title: "Учитель", 
        page: <SchedulePage type={reqType.teacher}/>,
        icon: <FontAwesome5 name="chalkboard-teacher" size={60} color="white" />
    },
    {
        id: Date.now().toString() + "room", 
        title: "Кабинет", 
        page: <SchedulePage type={reqType.room}/>,
        icon: <MaterialIcons name="meeting-room" size={60} color={'white'}/>
    },
    { 
        id: Date.now().toString(), 
        title: "Учас совета", 
        page: <CouncilMembersPage />, 
        icon: <Ionicons name="people" size={60} color={'white'}/>
    }
]; 
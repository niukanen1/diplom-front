import { SchedulePage } from "./dashBoardPages/SchedulePage";
import { dashboardCell } from "../../../entities/dashboard";
import { Ionicons } from "@expo/vector-icons";


export const data: dashboardCell[] = [
    {
        id: Date.now().toString(), 
        title: "Расписание", 
        page: <SchedulePage />,
        icon: <Ionicons name="grid" size={60} color={'white'}/>
    },
]; 
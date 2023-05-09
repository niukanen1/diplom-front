import { Role } from "./roles";

export type user = { 
    uid: string; 
    role: Role;
    group: string; 
    councilId: string | undefined; 
}
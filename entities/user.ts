import { Role } from "./roles";

export type user = { 
    name: string, 
    email: string, 
    uid: string; 
    role: Role;
    group: string; 
    councilId: string | undefined; 
}
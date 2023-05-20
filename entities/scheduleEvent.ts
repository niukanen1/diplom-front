import { room } from "./room";

export interface scheduleEvent {
    id: number;
    journalId: number;
    subjectStudyPeriodId: number | null;
    nameEt: string;
    nameEn: string;
    date: string;
    timeStart: string;
    timeEnd: string;
    hasStarted: boolean;
    teachers: teacher[];
    rooms: room[];
    studentGroups: studentGroup[];
    subgroups: any[];
    students: any[];
    addInfo: string | null;
    singleEvent: boolean;
    publicEvent: number;
    timetableId: number;
    showStudyMaterials: boolean;
    capacityType: string;
    isPersonal: any | null;
    person: any | null;
    isJuhanEvent: boolean;
    isExam: boolean;
    isOngoing: any | null;
    includesEventStudents: boolean;
    changed: string;
    canEdit: any | null;
    canDelete: any | null;
    nameRu: string;
}

interface teacher {
    id: number;
    name: string;
}

interface studentGroup {
    id: number;
    code: string;
}

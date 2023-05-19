export enum status { 
    notActivated = "notActivated", 
    activated = "activated"
}
export type council = { 
    id: string; 
    adminUid: string; 
    title: string; 
    votings: voting[]
}
export type councilMember = { 
    userUid: string, 
    status: status,
    councilId: string,
}
export type adminData = { 
    uid: string,
    councilId: string
}

export type voting = { 
    id: string;
    counciluid: string; 
    strictedToOneCouncil: boolean; 
    choices: choice[]; 
    votes: vote[];
}

export type choice = { 
    id: string; 
    title: string; 
    description: string; 
}

export type vote = { 
    userUid: string; 
    choiceId: string; 
}
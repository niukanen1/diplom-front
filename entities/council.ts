export type council = { 
    id: string; 
    adminUid: string; 
    title: string; 
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
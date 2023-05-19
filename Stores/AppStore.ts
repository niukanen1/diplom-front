import { adminData, status } from "../entities/council";
import { user } from "../entities/user";
import { makeAutoObservable } from 'mobx'

class AppStore { 
    userData: user | undefined = undefined;
    currentCouncilId: string | undefined = undefined;  
    currentCouncilStatus: status | undefined = undefined; 
    adminData: adminData | undefined = undefined
    constructor() { 
        makeAutoObservable(this)
    }
    setAdminData(data: adminData) { 
        this.adminData = data; 
    }
    deleteAdminData() { 
        this.adminData = undefined
    }
    setCurrentCouncilStatus(status: status) { 
        this.currentCouncilStatus = status; 
    }
    setCurrentCouncilId(id: string) { 
        this.currentCouncilId = id; 
    }
    deleteCurrentCouncilId() { 
        this.currentCouncilId = undefined; 
    }
    
    setUserData(data: user) { 
        this.userData = data;
    }
    deleteUserDate() { 
        this.userData = undefined;
    }

}

export default new AppStore(); 
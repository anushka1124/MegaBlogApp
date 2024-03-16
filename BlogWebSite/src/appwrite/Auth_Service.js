import {Client, Account, ID} from 'appwrite';
import environmentImports from '../environmentImports/environmentImports';

export class Auth_Service{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(environmentImports.appwriteUrl)
            .setProject(environmentImports.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if(userAccount) {
                return this.login({email, password})
            }else {
                return userAccount;
            }
        }catch(error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password)
        }catch(error){
            throw error;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        }catch(error){
            console.log("Appwrite servies :: getCurrentUser :: error", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        }catch(error){
            console.log("Appwrite servies :: getCurrentUser :: error", error);
        }
        return null;
    }

}

const authService = new Auth_Service();

export default authService;
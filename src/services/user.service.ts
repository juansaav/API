import { UserDA } from "../da"; 
import { IUser, IUserInputDTO } from "../interfaces/IUser"; 

export class UserService {

    constructor(private userda: UserDA) { }
   
    public async GetUser(email: string) {
        try {
            const data = await this.userda.GetUser(email);
            return data;
        } catch (error) {
            throw error;
        }
    } 

    public async CreateUser(newUser: IUserInputDTO) {
        try {
            const data = await this.userda.CreateUser(newUser);
            return data;
        } catch (error) {
            throw error;
        }
    }  
}
import { IUser, IUserInputDTO } from "../interfaces/IUser"; 
import { db } from "../da/dbconnection"; 

export class UserDA { 

    public async GetUser(email: string) { 
        var user = await db.user.findUnique({
          where: {
            email: email,
          },
        })
        return user;
    }

    public async CreateUser(newUser: IUserInputDTO) {
        const user = await db.user.create({
          data: newUser       
        })
    }
 
}
import { IUser, IUserInputDTO } from "../interfaces/IUser"; 
import { db } from "../da/dbconnection"; 

export class UserDA { 

    public async GetUser(email: string): Promise<IUser>  { 
        var user = await db.user.findUnique({
          where: {
            email: email,
          },
        })
        return user;
    }

    public async CreateUser(newUser: IUser): Promise<IUser>   {
        const user = await db.user.create({
          data: newUser       
        })
        return user;
    }
 
}
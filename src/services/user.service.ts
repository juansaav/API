import { UserDA } from "../da"; 
import { IUser, IUserInputDTO } from "../interfaces/IUser"; 
import { SessionService } from '../services'; 
import jwt from 'jsonwebtoken'; 
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

export class UserService {

    constructor(private userda: UserDA) { }
   
    // Get User by email
    public async GetUser(email: string) {
        try {
            const data = await this.userda.GetUser(email);
            return data;
        } catch (error) {
            throw error;
        }
    } 

    // Sign up
    public async CreateUser(userInputDTO: IUserInputDTO) : Promise<{ user: IUser; token: string }>   {

        const sessionService = new SessionService(this.userda);
        
        try {
              console.log('Sign up service ');

              //Check email already used
              var exists = this.GetUser(userInputDTO.email);

              if ( !exists ) {

                  // Hash pwd using salt. This is used to better secure the pwd
                  const salt = randomBytes(32);
                  const hashedPassword = await argon2.hash(userInputDTO.password, { salt });

                  // Create user
                  const user = await this.userda.CreateUser({
                    email: userInputDTO.email,
                    firstname: userInputDTO.firstname,
                    lastname: userInputDTO.lastname,
                    salt: salt.toString('hex'),
                    password: hashedPassword,
                  });
 
                  // Generate token
                  const token = sessionService.generateToken(uret);

                  if (!user) {
                    throw new Error('User cannot be created');
                  } 
 
                  // Delete sensible data
                  Reflect.deleteProperty(user, 'password');
                  Reflect.deleteProperty(user, 'salt');

                  // Return user and token  
                  return { user, token };
        
              } else {  
                // Email already in use.         
                throw new Error('Email already in use.');
              }

          } catch (e) {
              console.log(e);
              throw e;
        }
      }
    }  
}
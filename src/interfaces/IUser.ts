import { IMovie } from "./IMovie"; 

export interface IUser {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  salt?: string;
  movies?: IMovie[];
}

export interface IUserInputDTO {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

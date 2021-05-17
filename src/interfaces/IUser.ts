import { IMovie } from "./IMovie"; 

export interface IUser {
  id?: number;
  email: string;
  firstname: string;
  lastname: string;
  password?: string;
  salt?: string;
  movies?: IMovie[];
}

export interface IUserInputDTO {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

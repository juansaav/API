import { IMovie } from "./IMovie"; 

export interface IUser {
  _id?: number;
  email: string;
  firstname: string;
  lastname: string;
  password?: string;
  salt?: string;
  favourite_movies?: IMovie[];
}

export interface IUserInputDTO {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

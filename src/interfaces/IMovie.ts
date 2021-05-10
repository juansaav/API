import { IUser } from "./IUser"; 
export interface IMovie {
  _id: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  overview: string; 
  popularity: number; 
  poster_path: string; 
  release_date: string; 
  title: string; 
  vote_average: number; 
  vote_count: number; 
  user_favourite: IUser[];
}  



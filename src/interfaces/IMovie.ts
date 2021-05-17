import { IUser } from "./IUser"; 
export interface IMovie {
  id: number;
  adult: boolean;
  backdrop_path: string; 
  original_language: string;
  original_title: string;
  overview: string; 
  popularity: number; 
  poster_path: string; 
  release_date: string; 
  title: string; 
  video: boolean; 
  vote_average: number; 
  vote_count: number;  
  suggestionScoreforToday: number;
  addedAt: string;
}  

export interface IMovieInputDTO { 
  id: number;
  adult: boolean;
  backdrop_path: string; 
  original_language: string;
  original_title: string;
  overview: string; 
  popularity: number; 
  poster_path: string; 
  release_date: string; 
  title: string; 
  video: boolean; 
  vote_average: number; 
  vote_count: number;   
  suggestionScoreforToday: number;
}  
 

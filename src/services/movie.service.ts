import { MovieDA } from "../da"; 
import { IMovie, IMovieInputDTO } from "../interfaces/IMovie"; 
import config from '../config'; 
import * as request from "request-promise-native";

export class MovieService {

    constructor(private movieda: MovieDA) { }
   
    public async GetAllMovies() {
        try {
            const data = await this.movieda.GetAllMovies();
            return data;
        } catch (error) {
            throw error;
        }
    } 

    public async InsertMovies(movies : [IMovieInputDTO]) {
        for (var newM of movies) {
            this.movieda.CreateMovie(newM);
        } 
    }   


    public async ImportMovies() {
        // Import movies
        console.log("Importing movies from themoviedb.org...")
        
        const baseUrl = process.env.THEMOVIEDB_URL;
        const queryString = '?api_key=' + config.THEMOVIEDB_KEY;  
        var options = {
            uri: baseUrl + queryString,
        };

        const resp = <string> await request.get(options);
        const movies = JSON.parse(resp).results; 

        this.InsertMovies(movies);
        console.log("Finished importing.")
    }   
}
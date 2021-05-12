import { ConfigurationDA, MovieDA } from "../da";   
import { IUser, IUserInputDTO, IMovieInputDTO, IConfigurationInputDTO } from "../interfaces/index";  
import { MovieService } from '../services/index';  
import config from '../config'; 
import * as request from "request-promise-native";
 
let MOVIES_MIGRATION_KEY = "movies_imported"; 

export class ConfigurationService {

    constructor(private configda: ConfigurationDA,private movieda: MovieDA) { } 
   
    public async importMovies() {
        try {
            
            const data = await this.configda.GetConfiguration(MOVIES_MIGRATION_KEY);
            const movieService = new MovieService(this.movieda);

            if ( !data ) {
              
                // Movies not imported, import them  
                console.log("Importing movies from themoviedb.org...")
                
                const baseUrl = process.env.THEMOVIEDB_URL;
                const queryString = '?api_key=' + config.THEMOVIEDB_KEY;  
                var options = {
                    uri: baseUrl + queryString,
                };

                const resp = <string> await request.get(options);
                const movies = JSON.parse(resp).results; 
 
                movieService.InsertMovies(movies);
                console.log("Finished importing.")

                // Movies imported insert config
                const insert: IConfigurationInputDTO = {
                    key: MOVIES_MIGRATION_KEY, 
                    value: "" + new Date()
                }; 
                this.configda.CreateConfiguration(insert); 

            } else {
                console.log("Movies already imported on " + data.value + ".")
            }
        } catch (error) {
            console.log("Error importing movies: " + error)
            throw error;
        }
    }  
}
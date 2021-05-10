import { ConfigurationDA } from "../da"; 
import { MovieDA } from "../da"; 
import { IConfigurationInputDTO } from "../interfaces/IConfiguration"; 
import { IUser, IUserInputDTO } from "../interfaces/IUser"; 
import { IMovieInputDTO, IMovieImport } from "../interfaces/IMovie"; 
import * as request from "request-promise-native";
import dotenv from 'dotenv';

dotenv.config(); 

let MOVIES_MIGRATION_KEY = "movies_imported"; 

export class ConfigurationService {

    constructor(private configda: ConfigurationDA,private movieda: MovieDA) { } 
   
    public async importMovies() {
        try {
            const data = await this.configda.GetConfiguration(MOVIES_MIGRATION_KEY);
            if ( !data ) {
              
                // Movies not imported, import them  
                
                const baseUrl = process.env.THEMOVIEDB_URL;
                const queryString = '?api_key=' + process.env.THEMOVIEDB_KEY;  
                var options = {
                    uri: baseUrl + queryString,
                };

                const resp = <string> await request.get(options);
                const movies = JSON.parse(resp).results; 

                // Create movies TODO move to Movies Service

                for (var newM of movies) {
                    this.movieda.CreateMovie(newM);
                } 
                console.log("Finished inserting.")


                // Movies imported insertconfig

                const insert: IConfigurationInputDTO = {
                    key: MOVIES_MIGRATION_KEY, 
                    value: "Imported " + new Date()
                }; 
                this.configda.CreateConfiguration(insert); 

            } else {
                console.log("Already imported")
            }
        } catch (error) {
            throw error;
        }
    }  
}
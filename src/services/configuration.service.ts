import { ConfigurationDA } from "../da"; 
import { IConfigurationInputDTO } from "../interfaces/IConfiguration"; 
import { IUser, IUserInputDTO } from "../interfaces/IUser"; 
import * as request from "request-promise-native";
import dotenv from 'dotenv';

dotenv.config(); 

let MOVIES_MIGRATION_KEY = "movies_imported"; 

export class ConfigurationService {

    constructor(private configda: ConfigurationDA) { }
   
    public async importMovies() {
        try {
            const data = await this.configda.GetConfiguration(MOVIES_MIGRATION_KEY);
            console.log(MOVIES_MIGRATION_KEY)
            console.log(data)
            if ( !data ) {
              
                // Data not imported  
                const baseUrl = process.env.THEMOVIEDB_URL;
                const queryString = '?api_key=' + process.env.THEMOVIEDB_KEY;  
                var options = {
                    uri: baseUrl + queryString,
                };

                const data = await request.get(options);
                console.log(data) 
                data.products.forEach( (element) => {
                    element.product_desc = element.product_desc.substring(0,10);
                });

                // Movies imported config

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
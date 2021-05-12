
// Imports

import express from 'express';
import dotenv from 'dotenv';
import config from './config'; 
import { UserDA, ConfigurationDA, MovieDA } from './DA/index'; 
import { UserService, ConfigurationService, MovieService } from './services/index'; 
import { MovieRouter, UserRouter } from "./routes/index";

// Initial configuration

dotenv.config(); 

const app = express();
const router = express.Router();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router);


// Define Routers

UserRouter(router, new UserService(new UserDA()));
MovieRouter(router, new MovieService(new MovieDA()));

// Start app

app.listen(config.PORT, function() { 
	
   console.log("Server is running on port " + config.PORT);

   // Import movies if required
   let configService = new ConfigurationService(new ConfigurationDA(), new MovieDA());
   configService.importMovies();

});

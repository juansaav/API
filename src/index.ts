import express from 'express';
import dotenv from 'dotenv';

import { UserDA } from './DA/index';
import { UserService } from './services/index';
import { UserRouter } from "./routes/index";

import { ConfigurationDA } from './DA/index';
import { ConfigurationService } from './services/index';

import { MovieDA } from './DA/index';
import { MovieService } from './services/index';
import { MovieRouter } from "./routes/index";

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

app.listen(process.env.PORT, function() { 
	
   console.log("Server is running on port " + process.env.PORT);

   // Import movies if required

   let configService = new ConfigurationService(new ConfigurationDA(), new MovieDA());
   configService.importMovies();

});

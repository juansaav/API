import express from 'express';
import dotenv from 'dotenv';

import { UserDA } from './DA/index';
import { UserService } from './services/index';
import { UserRouter } from "./routes/index";

import { ConfigurationDA } from './DA/index';
import { ConfigurationService } from './services/index';

// Initial configuration

dotenv.config(); 
const app = express();
const router = express.Router();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router);


// Define Routers

UserRouter(router, new UserService(new UserDA()));

// Start app

app.listen(process.env.PORT, function() { 
	
   console.log("Server is running on port " + process.env.PORT);

   // Import movies if neccesary
   let configService = new ConfigurationService(new ConfigurationDA());
   configService.importMovies();

});

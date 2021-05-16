import { UserService } from '../../services';
import { Router, Response, Request } from 'express';
import middlewares from '../middlewares';
import { body, validationResult } from 'express-validator'; 

const route = Router()

export const UserRouter = (router: Router, service: UserService): void => {
    
    router.use('/user', route);

    // Create user 
    route.post('/', 

      // Validations 
      // email must be an email
      body('email').isEmail(),
      // password must be at least 5 chars long 
      body('password').isLength({ min: 5 }),
      // firstname not empty
      body('firstname').notEmpty(),
      // lastname not empty
      body('lastname').notEmpty(),

      async (req: Request, res: Response) => {
        try {
            // Check validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) { 
              return res.status(400).json({ errors: errors.array() });
            }

            // Call service
            const newUser = req.body;
            const data = await service.CreateUser(newUser);
            res.status(200).send(data);
        }
        catch (err) { 
            console.log(err.message);            
            res.status(500).send(err.message)
        }
    })

    // Add favourite movie
    route.post('/:userId/movie/:movieId', middlewares.isAuth,

        async (req: Request, res: Response) => {
            try { 

                // Call service
                const { userId } = req.params;
                const { movieId } = req.params;
                const data = await service.AddFavouriteMovie(+userId, +movieId);
                res.status(200).send(data);
            }
            catch (err) {   
                console.log(err.message);          
                res.status(500).send(err.message)
            }
        })
     
        // Get user favourite movies
        route.get('/:id/movie', middlewares.isAuth, async (req: Request, res: Response) => {
            try {
                const userId = req.params.id;
                const data = await service.GetFavouriteMovies(+userId);
                res.status(200).send(data);
            }
            catch (err) {      
                console.log(err.message);       
                res.status(500).send(err.message)
            }
        })
}
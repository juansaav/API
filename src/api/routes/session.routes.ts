import { SessionService } from '../../services';
import { Router, Response, Request } from 'express';
import middlewares from '../middlewares';
import { body, validationResult, param } from 'express-validator';

const route = Router()

export const SessionRouter = (router: Router, service: SessionService): void => {

    router.use('/session', route);

    // Login
    route.post('/', 

        // Validations //      
        // email is not empty
        body('email').notEmpty(),
        // password is not empty
        body('password').notEmpty(), 

        async (req: Request, res: Response) => {
        try {
            // Check validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) { 
              return res.status(400).json({ errors: errors.array() });
            }

            // Call service
            const { email, password } = req.body;
            const data = await service.SignIn(email, password);
            res.status(200).send(data);
        }
        catch (err) {
            console.log(err.message);             
            res.status(500).send(err.message)
        }
    })

    // Logout
    route.delete('/:id',middlewares.isAuth, async (req: Request, res: Response) => {
        try { 
            res.status(200).end();
        }
        catch (err) {         
            console.log(err.message);    
            res.status(500).send(err.message)
        }
    })
}
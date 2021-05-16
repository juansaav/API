import { MovieService } from '../../services';
import { Router, Response, Request } from 'express';
import middlewares from '../middlewares';

const route = Router()

export const MovieRouter = (router: Router, service: MovieService): void => {
 
    router.use('/movie', route);

    // Return all moveis
    route.get('/', middlewares.isAuth, async (req: Request, res: Response) => {
        try { 
            const data = await service.GetAllMovies();
            res.status(200).send(data);
        }
        catch (err) { 
            console.log(err.message);            
            res.status(500).send(err.message)
        }
    })
}
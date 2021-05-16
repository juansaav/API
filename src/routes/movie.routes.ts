import { MovieService } from '../services';
import { Router, Response, Request } from 'express';

const route = Router()

export const MovieRouter = (router: Router, service: MovieService): void => {
 
    router.use('/movie', route);

    route.get('/', async (req: Request, res: Response) => {
        try { 
            const data = await service.GetAllMovies();
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err })
        }
    })
}
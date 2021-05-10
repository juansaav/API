import { MovieService } from '../services';
import { Router, Response, Request } from 'express';



export const MovieRouter = (router: Router, service: MovieService): void => {
 
    router.get('/movie', async (req: Request, res: Response) => {
        try { 
            const data = await service.GetAllMovies();
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err })
        }
    })
}
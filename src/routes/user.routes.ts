import { UserService } from '../services';
import { Router, Response, Request } from 'express';

const route = Router()

export const UserRouter = (router: Router, service: UserService): void => {
    
    router.use('/user', route);

    // Get user
    route.get('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = await service.GetUser(id);
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err })
        }
    })

    // Create user
    route.post('/', async (req: Request, res: Response) => {
        try {
            const newUser = req.body;
            const data = await service.CreateUser(newUser);
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err })
        }
    })

    // Add favourite movie
    route.post('/:userId/movie', async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const { movieId } = req.body;
            const data = await service.AddFavouriteMovie(+userId, movieId);
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err })
        }
    })
 
    // Get user favourite movies
    route.get('/:id/movie', async (req: Request, res: Response) => {
        try {
            console.log("Get favourite movies")
            const userId = req.params.id;
            const data = await service.GetFavouriteMovies(+userId);
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err })
        }
    })
}
import { UserService } from '../../services';
import { Router, Response, Request } from 'express';
import middlewares from '../middlewares';

const route = Router()

export const UserRouter = (router: Router, service: UserService): void => {
    
    router.use('/user', route);

    // TODO delete this method Get user by email
    route.get('/:email', async (req: Request, res: Response) => {
        try {
            const { email } = req.params;
            const data = await service.GetUser(email);
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
    route.post('/:userId/movie', middlewares.isAuth, async (req: Request, res: Response) => {
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
    route.get('/:id/movie', middlewares.isAuth, async (req: Request, res: Response) => {
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
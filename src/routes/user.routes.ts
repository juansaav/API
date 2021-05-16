import { UserService } from '../services';
import { Router, Response, Request } from 'express';



export const UserRouter = (router: Router, service: UserService): void => {
 
    // Get user
    router.get('/user/:id', async (req: Request, res: Response) => {
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
    router.post('/user', async (req: Request, res: Response) => {
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
    router.post('/user/:userId/movie', async (req: Request, res: Response) => {
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
    router.get('/user/:id/movie', async (req: Request, res: Response) => {
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
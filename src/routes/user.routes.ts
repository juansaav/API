import { UserService } from '../services';
import { Router, Response, Request } from 'express';



export const UserRouter = (router: Router, service: UserService): void => {
 
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
}
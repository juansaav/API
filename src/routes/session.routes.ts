import { SessionService } from '../services';
import { Router, Response, Request } from 'express';

const route = Router()

export const SessionRouter = (router: Router, service: SessionService): void => {

    router.use('/session', route);

    // Login
    route.post('/', async (req: Request, res: Response) => {
        try {
            console.log("Login " + req.body);
            const { email, password } = req.body;
            console.log(email + password);
            const data = await service.SignIn(email, password);
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err })
        }
    })

    // Logout
    route.delete('/:id', async (req: Request, res: Response) => {
        try { 
            console.log("Logout session " + req.params.id);
            res.status(200).end();
        }
        catch (err) {
            res.status(500).send({ "err": err })
        }
    })
}
import { SessionService } from '../services';
import { Router, Response, Request } from 'express';



export const SessionRouter = (router: Router, service: SessionService): void => {

    // Login
    router.post('/session', async (req: Request, res: Response) => {
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
    router.delete('/session/:id', async (req: Request, res: Response) => {
        try { 
            console.log("Logout session " + req.params.id);
            res.status(200).end();
        }
        catch (err) {
            res.status(500).send({ "err": err })
        }
    })
}
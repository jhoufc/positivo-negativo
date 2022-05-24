import {NextFunction, Request, Response} from 'express';
import {verify} from 'jsonwebtoken'
import {config} from '../../config/config'
interface PayLoad{
    id: string;
}
export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers.authorization;

    if(!authToken) return res.status(401).end();

    const [, token] = authToken.split(' ');

    try {
        const {id } = verify(token, config().jwtKey) as PayLoad;

        req.user_id = id;
        return next();
    } catch (err) {
        return res.status(401).json({error: "Unauthorized"}).end();
    }
    
}
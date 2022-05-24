import {json, Request, Response} from 'express';
import {UserService} from '../../services/user/UserService'

const userService = new UserService();

class UserController{
    async create(req: Request, res: Response){
        const {name, user, password} = req.body;
        if (!name || !user || !password) return res.status(400).send({ error: 'Preencha os campos obrigatórios !' });
               
        //const UserService = new CreateUserService();

        const ret = await userService.create({name, user, password});
        
        return res.status(201).json(ret);
    }

    async auth(req: Request, res: Response){
        const {user, password} = req.body;
        if(!user || !password) return res.status(400).send({error: 'Preencha os campos obrigatórios'})

        //const User

        const ret = await userService.auth({user, password});

        return res.status(200).json(ret);
    }

    async updatePassword(req: Request, res: Response){
        const {oldPassword, newPassword} = req.body;
        const user_id = req.user_id;
        if(!user_id) throw new Error("Ops, Algo deu errado");

        const ret = await userService.updatePassword({oldPassword, newPassword, user_id})
        return res.json(ret);

    }

    async me (req: Request, res: Response){
        const user_id = req.user_id;

        if(!user_id) throw new Error("Ops, Algo deu errado");

        const user = await userService.me({user_id});
        return res.json(user);
    }
}

export { UserController }
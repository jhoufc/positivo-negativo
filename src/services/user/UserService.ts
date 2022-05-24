//#region INTERFACES
interface CreateRequest{
    name: string;
    user: string;
    password: string;
}
interface AuthRequest{
    user: string;
    password: string;
}
interface UpdatePasswordRequest{
    oldPassword: string;
    newPassword: string;
    user_id: string;
}
interface UserDetailsRequest{
    user_id: string;
}
//#endregion

import User from '../../models/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { config } from '../../../config/config'

//UTIL
const createToken = (userLogin: string) => {
    return jwt.sign({ id: userLogin }, config().jwtKey, { expiresIn: "1D" });
}

class UserService{    
    async create({name, user, password}: CreateRequest){
        
        if (await User.findOne({ user })) throw new Error("Usuário já cadastrado");

        const userCreated = await User.create({name,user,password});

        userCreated.password = undefined;
        return {user: userCreated}
    }

    async auth({user, password}: AuthRequest){
        if(!await User.findOne({user})) throw new Error("Dados inválidos")
  
        const ret = await User.findOne({ user }).select('+password');       

        const pass = await bcrypt.compare(password, ret.password);

        if (!pass) throw new Error("Dados inválidos");

        ret.password = undefined;

        return { user: ret, token: createToken(ret.id)};   
    }
    
    async updatePassword({oldPassword, newPassword, user_id}: UpdatePasswordRequest){
        if(oldPassword === newPassword) throw new Error("As senhas são iguais");
        
        const user = await User.findById(user_id).select("+password");
        
        if(!user) throw new Error("Ops, Algo deu errado");
        
        const pass = await bcrypt.compare(oldPassword, user.password);

        if(!pass) throw new Error("Senha inválida .");

        user.password = await bcrypt.hash(newPassword, 10);
        const filtro = { id: user_id };        
        const ret = await User.updateOne(filtro, user);

        if (!ret) throw new Error("Ops, Algo deu errado");

        user.password = undefined
        
        return { user: user };
    }
    
    async me (user_id: UserDetailsRequest){
        if(!user_id) throw new Error("Ops, Algo deu errado")
        const user = await User.findById(user_id);

        if(!user) throw new Error("Ops, Algo deu errado !")

        return {user: user}
    }
    
}

export {UserService}
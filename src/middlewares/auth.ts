import jwt from'jsonwebtoken';
import {config} from '../../config/config'
import {Request, Response, NextFunction} from 'express'


const auth = (req, res, next) => {
    const header = req.headers.auth;

    if (!header) throw new Error("Token nao enviado");

    console.log(header)

    jwt.verify(header, config().jwtKey, (err, decoded) => {
        if (err) return res.send({ error: "token invalido" })
        res.locals.auth_data = decoded;
        return next();
    });
}

export {auth};
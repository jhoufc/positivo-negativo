import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import {router} from './routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import {config} from "../config/config";
const port = process.env.PORT || 3333;

const app = express();
app.use(express.json());
app.use(router);
app.use(cors());
//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));

//#region CONEXÃO BANCO DE DADOS

const options = {useNewUrlParser: true}


mongoose.connect(config().bdString, () => {options})


mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com banco de dados: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Desconectado do banco de dados.');
});


mongoose.connection.on('connected', () => {
    console.log('Conexão realizada com sucesso !');
});
//#endregion

//#region MIDWARE TRATAMENTO DE ERROS NAS ROTAS
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});
//#endregion

app.listen(port, () => console.log('server up !'));


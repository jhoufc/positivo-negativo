const env = process.env.NODE_ENV || 'dev';
import 'dotenv/config'

const config  = () => {
    //return {bdString: "mongodb+srv://deoz_user:BBuebn7jYjOraTv1@cluster0.7lcvj.mongodb.net/positivoNegativo?retryWrites=true&w=majority", jwtKey: "1q2w3e4r"}
    return {bdString: process.env.DATABASE_URL, jwtKey: process.env.JWT_SECRET}
}
 export {config};